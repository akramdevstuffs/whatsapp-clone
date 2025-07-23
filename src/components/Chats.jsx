import { useEffect, useState } from "react";
import addMessagePng from "./../assets/add_message.png";
import orderChatsBy from "./../assets/order_by.png";
import searchChats from "./../assets/search.png";
import defaultProfilePic from "./../assets/defaultProfilePic.png";
import { getSavedContacts, getUserProfile, saveContact, searchUsers } from "../api/UserApi";
import { useNavigate } from "react-router-dom";


const Heading = ()=>{
    return (
        <div className="flex justify-between items-center p-4 ">
            <h2 className="text-xl font-bold ">Chats</h2>
            <div className="flex gap-2">
                <div className="rounded-sm size-8 hover:bg-sky-700 flex justify-center items-center cursor-pointer"><img src={addMessagePng} className="size-6" alt="New Chat" draggable="false"></img></div>

                <div className="rounded-sm size-8 hover:bg-sky-700 flex justify-center items-center cursor-pointer "><img src={orderChatsBy} draggable="false" className="size-6" alt="Filter chats by"></img></div>
            </div>
        </div>
    );
}

const SearchBar = ()=>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleUserSelect = (uid) => {
        getUserProfile(uid).then((profile) => {
            saveContact(profile);
        });
            setUsers([]); // Clear search results after selection
            setSearchQuery(""); // Clear search input
            navigate(`/chat/${uid}`);
    };

    useEffect(() => {
        if (searchQuery) {
            searchUsers(searchQuery).then(setUsers).catch(console.error);
        }
    }, [searchQuery]);

    
    return (
        <div className="relative p-2">
            <input type="text" 
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);}}
            className="w-full pl-10 pr-4 py-2 border truncate hover:shadow-[0_0_5px_rgba(0,191,255,0.8)]" placeholder="Search or start a new chat" />
            <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
            <img src={searchChats} className="size-4" alt="" />
            </div>
            {users.length >0 && 
            <div className="absolute z-10 bg-white border shadow-lg w-full mt-1 rounded-lg max-h-60 overflow-auto">
                {users.map((user) => (
                    <div key={user.id} 
                        onClick={()=>handleUserSelect(user.id)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <img src={user.profilePic ? user.profilePic : defaultProfilePic} alt={user.displayName} className="rounded-full size-8" />
                        <span>{user.displayName}</span>
                    </div>
                ))}
                </div>
            }
        </div>
    );
}

const Chat = ({uid,profilePic, name,recentChat,lastSeen})=>{
    const navigate = useNavigate();
    const handleChatClick = () => {
        navigate(`/chat/${uid}`);
    };
    return (
        <div 
        onClick={()=>handleChatClick()}
        className="flex justify-between m-2 p-2 cursor-pointer hover:bg-gray-300 rounded-lg">
            <div className="flex gap-2">
            <img src={profilePic} className="rounded-full size-12" alt="" draggable="false"/>
            <div>
                <p>{name}</p>
                <p className="text-gray-800 text-sm">{recentChat}</p>
            </div>
            </div>
            <p>{lastSeen}</p>
        </div>
    );
};

const Chats = ({priority})=>{
    const [chatList, setChatList] = useState([
        {id:1, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:2, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
        {id:3, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:4, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
        {id:5, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:6, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
        {id:7, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:8, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
        {id:9, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:10, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
        {id:11, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:12, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
        {id:13, name:"Akram Khan", recentChat:"Hello nice to meet you", lastSeen:"9:54 pm"},
        {id:14, name:"Ahmad Khan", recentChat:"", lastSeen:"9:54 pm"},
    ])
    useEffect(() => {
        getSavedContacts().then((contacts) => {
            console.log("Fetched contacts:", contacts);
            const formattedContacts = contacts.map(contact => ({
                id: contact.id,
                name: contact.displayName,
                recentChat: contact.recentChat || "No recent messages",
                lastSeen: contact.lastSeen || "N/A",
                profilePic: contact.profilePic || defaultProfilePic
            }));
            setChatList(formattedContacts);
        }).catch((error) => {
            console.error("Error fetching contacts:", error);
        });
    }, []);
    return (<div className={`w-screen fixed h-screen ${priority===2 ? "invisible md:visible" : "w-screen"} md:w-[25%] bg-blue-100 border-r border-gray-300 flex flex-col select-none`}>
        <Heading/>
        <SearchBar/>
        <div className="overflow-auto h-full transparent-scrollbar">
        {chatList.map((val)=>
        <Chat
            key={val.id}
            uid={val.id}
            profilePic={(val.profilePic)?val.profilePic:defaultProfilePic}
            name={val.name}
            recentChat={val.recentChat}
            lastSeen={val.lastSeen}
        />)}

        </div>

    </div>);
}

export default Chats;