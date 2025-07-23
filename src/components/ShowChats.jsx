import defaultProfilePic from "./../assets/defaultProfilePic.png";
import searchIcon from "./../assets/search.png";
import sendMessageIcon from "./../assets/send_message.png";
import emojiIcon from "./../assets/emoji_icon.png";
import voiceIcon from "./../assets/voice_icon.png";
import attachFileIcon from "./../assets/attach_icon.png";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useChatMessages } from "../hooks/useChats";
import { getUserProfile } from "../api/UserApi";
import { sendMessage } from "../api/ChatApi";

const Header = ({name, profilePic})=>{
    return (
        <div className="bg-blue-100 flex justify-between items-center p-4 text-gray-800 border-b border-gray-300">
            <div className="flex items-center gap-2">
                <img src={profilePic ? profilePic : defaultProfilePic} className="size-8 cursor-pointer" alt="Profile"/>
                <p className="cursor-pointer">{name}</p>
            </div>
            <div className="flex justify-center items-center rounded-lg hover:bg-sky-700 p-2 cursor-pointer">
                <img className="size-4" src={searchIcon} alt="Search"/>
            </div>
        </div>
    );
}

const ChatBubble = ({text, time, isSender})=>{
    return (
        <div className={`flex ${isSender ? "justify-end" : "justify-start"} p-2 `}>
            <div className={` max-w-[75%] p-2 rounded-lg ${isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                <p className="break-words whitespace-pre-wrap">{text}</p>
                <span className="text-xs text-gray-800 float-right">{time}</span>
            </div>
        </div>
    );
};


const Chats = ({uid})=>{
    const { messages, loadMore, loadingMore, hasMore } = useChatMessages(uid);
    const handleScroll = (e) => {
    if (e.target.scrollTop < 100 && !loadingMore && hasMore) {
      loadMore();
    }
    };
    if(messages.length){
        console.log("Messages loaded:", messages);
    }

    return (
        <div className="flex flex-col-reverse flex-grow bg-yellow-100 overflow-y-auto transparent-scrollbar" onScroll={handleScroll}>
            {messages.map((msg, index) => (
                <ChatBubble text={msg.message} 
                key={msg.id}
                timestamp = {msg.timestamp}
                isSender={msg.sender !== uid}
                />))}
        </div>
    );
};

const DropUpMenu = ({imgSource, imgAlt,children})=>{
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
            <div className="relative inline-block text-left" ref={menuRef}>
                <button onClick={()=>setOpen((prev)=>!prev)} className="flex items-center gap-2 p-2 mr-2 hover:bg-sky-700 rounded-lg cursor-pointer">
                    <img src={imgSource} className="size-5 " alt={imgAlt} />
                </button>
            {open && (
                <div className="absolute bottom-full mb-5  origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    {children}
                </div>
            )}
            </div>
    );
}

const InputChat = ({uid})=>{
    const textareaRef = useRef(null);

    const [textMessage, setTextMessage] = useState("");

    const handleInput = (e) => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to get the scrollHeight correctly
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
        setTextMessage(e.target.value);
    };

    const handleSendMessage = () =>{
        if(textMessage.trim() !== "") {
            // Here you would send the message
            console.log("Sending message:", textMessage, "to user:", uid);
            sendMessage(textMessage, uid).catch((error) => {
                console.error("Error sending message:", error)});
            console.log("Sending message:", textMessage);
            setTextMessage(""); // Clear the input after sending
            textareaRef.current.style.height = 'auto'; // Reset height after sending
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default Enter key behavior
            if (textMessage.trim() !== "") {
                handleSendMessage();
            }
        }
    }

    return (
        <div 
        className="flex items-end p-2 pb-3 bg-blue-100 border-t border-gray-300">
            <DropUpMenu imgSource={emojiIcon} imgAlt="Emoji">

                <div className="py-1 w-40">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Emoji
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    GIFs
                    </button>
                </div>
            </DropUpMenu>
            <DropUpMenu imgSource={attachFileIcon} imgAlt="Attach File">

                <div className="py-1 w-40">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Photos & vidoes
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Camera
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ">
                    Document
                    </button>
                </div>
            </DropUpMenu>

            <div className="max-h-48 flex-grow">
            <textarea 
                ref={textareaRef}
                onInput={handleInput}
                value={textMessage}
                onKeyDown={handleKeyDown}
            rows="1" type="text" className="max-h-48 p-2 bg-blue-100 w-full overflow-auto resize-none border-none focus:outline-none hide-scrollbar" placeholder="Type a message..." />

            </div>
            { textMessage.trim()!=="" ?
            <button className="ml-2 p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSendMessage}
            >
                <img src={sendMessageIcon} alt="Send" className="size-5" />
            </button>
            :
            <div className="flex items-center p-2 ml-2 hover:bg-sky-700 rounded-lg cursor-pointer">
                <img src={voiceIcon} className="size-6 " alt="Voice" />
            </div>
            }
        </div>
    );
}


const ShowChats = ({priority})=>{
    const uid = useParams().uid;
    const [profileData, setProfileData] = useState({displayName: "Loading...", profilePic: defaultProfilePic});
    useEffect(() => {
        if (uid) {
            getUserProfile(uid).then((profile) => {
                setProfileData(profile);
            }).catch((error) => {
                console.error("Error fetching user profile:", error);
            });
        }
    }, [uid]);
    if(!uid){
        return (
            <div className={`${priority===2 ? "w-screen" : "w-0"} md:w-3/4 h-screen bg-blue-100 fixed right-0 flex flex-col overflow-hidden`}>
                <Header name={"Select a chat"} profilePic={defaultProfilePic}/>
                <Chats />
                <InputChat/>
            </div>
        );
    }
    return (<div    className={`${priority===2 ? "w-screen" : "w-0"} md:w-3/4 h-screen bg-blue-100 fixed right-0 flex flex-col overflow-hidden`}>
        <Header name={profileData.displayName} profilePic={profileData.profilePic}/>
        <Chats uid={uid}/>
        <InputChat uid={uid}/>
    </div>);
}

export default ShowChats;