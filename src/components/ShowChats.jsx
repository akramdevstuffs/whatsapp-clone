import defaultProfilePic from "./../assets/defaultProfilePic.png";
import searchIcon from "./../assets/search.png";
import sendMessageIcon from "./../assets/send_message.png";
import emojiIcon from "./../assets/emoji_icon.png";
import voiceIcon from "./../assets/voice_icon.png";
import attachFileIcon from "./../assets/attach_icon.png";
import { Children, useEffect, useRef, useState } from "react";

const Header = ({name, profilePic})=>{
    return (
        <div className="bg-blue-100 flex justify-between items-center p-4 text-gray-800 border-b border-gray-300">
            <div className="flex items-center gap-2">
                <img src={profilePic} className="size-8 cursor-pointer" alt="Profile"/>
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


const Chats = ({chatList})=>{
    return (
        <div className="flex flex-col flex-grow bg-yellow-100 overflow-y-auto transparent-scrollbar">
            <ChatBubble text="
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti maiores itaque amet esse expedita accusantium hic ad officiis quidem unde animi, temporibus aperiam laudantium laboriosam quasi dolorem, molestiae illum quo, quis laborum assumenda beatae? Laborum, tempore corrupti praesentium in impedit illum eum commodi ipsam voluptate non quod fuga! Officia ea aspernatur animi dolores ratione atque, sunt deserunt explicabo odit autem laborum ipsam fugit nesciunt aliquid quas debitis incidunt architecto, voluptatibus exercitationem accusamus? Non, iusto in voluptatum cumque placeat incidunt beatae! Quia obcaecati amet dolore, similique, iure pariatur rem minus quo vero velit, earum ad aliquam recusandae voluptate culpa quisquam fuga necessitatibus eaque molestias? Ipsum sit iusto sapiente libero voluptatibus error dolorum animi nobis, rerum similique aut corporis possimus? Officia vitae quos architecto aliquid tenetur cupiditate unde repudiandae cumque! Nesciunt, voluptatem vero laudantium dolor ea numquam perspiciatis tenetur tempora ullam delectus iure maxime, reprehenderit saepe laboriosam ipsam. Minus soluta nemo itaque impedit, doloribus quia fuga! Voluptas non sapiente est quod adipisci quas quibusdam similique nisi amet, omnis ipsa ullam fugiat neque illum dicta molestiae accusantium repellendus nulla. Maxime, explicabo in iste nam obcaecati quaerat rem quas repellat veritatis excepturi architecto quidem error quos qui sint fugit delectus molestias voluptatibus dignissimos porro, quibusdam praesentium rerum repellendus ipsam. Dicta itaque recusandae libero cum soluta magni. Labore repellendus dolore itaque debitis optio? Iusto, qui! Labore optio ipsa cumque repellat, error quaerat perferendis sint! Repellat nam voluptatibus sint necessitatibus harum magnam accusantium alias atque exercitationem enim. Laudantium sapiente omnis quidem fugit natus quasi blanditiis totam numquam vel impedit ipsa voluptate assumenda, quo voluptatum temporibus pariatur eligendi eaque. Exercitationem dolorum similique distinctio. Nisi quis officiis facilis, cupiditate soluta nemo similique amet maxime cumque molestias architecto veniam, ipsum perspiciatis quia eveniet sunt porro, quam quasi! Libero fugiat ad optio doloribus! Doloribus incidunt autem eveniet consequuntur cumque libero eos tenetur vitae commodi ea fuga eius laborum debitis facere praesentium, quis inventore impedit, quasi quibusdam nisi repellat. Esse unde quam quia perspiciatis quasi accusantium, alias culpa. Officia corporis perferendis voluptates eveniet suscipit sed, sint quo error corrupti animi nemo earum esse cupiditate sit delectus nobis ratione! Impedit beatae maxime, ipsam laborum rerum alias?
            " time="10:00 AM" isSender={true} />
            <ChatBubble text="
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus ab ipsa maxime repellendus. A animi quaerat sed doloribus dolor modi expedita aliquid numquam molestiae, magnam, quasi nihil dolorem molestias quo dolore amet vero architecto aperiam corrupti necessitatibus accusantium dignissimos quam unde quos! Labore sed adipisci recusandae ad illo. Quasi id non quibusdam porro facilis eligendi voluptates vitae, perspiciatis tenetur esse ullam beatae cupiditate fugiat velit cum nisi. Assumenda voluptatum, aut quibusdam facilis similique iste voluptatibus expedita provident optio aliquam minus nihil libero ullam, dolores illum sapiente quo. Doloremque quod rerum dolores. Voluptatem aliquam cumque, minus consequatur quae eaque consequuntur eum neque. Minus debitis libero voluptate, praesentium veniam maxime quasi modi tempore neque, voluptatem, a rem amet blanditiis voluptatum nulla doloremque nesciunt vitae repellendus eveniet! Corporis quis, esse maxime ut cupiditate quod illum illo vel harum architecto, ullam quibusdam? Accusamus atque, earum sequi laudantium magnam exercitationem facere, amet minima aut eveniet suscipit aspernatur animi, facilis ipsum ad saepe distinctio impedit beatae sit pariatur cupiditate inventore odio. Quis voluptates qui ipsum reprehenderit nemo, quam quaerat tempore ex eveniet deleniti asperiores excepturi minima totam, fugiat ipsam labore iste animi delectus velit nihil eius. Neque ex, pariatur consequuntur laborum natus, quos, quibusdam hic veniam illum consectetur numquam nihil. Aspernatur, unde! Officia reiciendis repellat alias similique natus voluptatem, labore distinctio suscipit. Suscipit quam at labore vero dolores cum officiis blanditiis itaque autem quibusdam optio ratione nulla eius nihil sequi, quod necessitatibus quasi aliquid quas tenetur pariatur doloremque unde perferendis iste. Reprehenderit, expedita magnam? Reiciendis eius, sint voluptas nobis sunt natus odio debitis minus at ipsa nemo. Praesentium illo ipsam consectetur aliquid ut unde veritatis itaque laudantium assumenda, cum, omnis, cupiditate corrupti nihil hic quae reiciendis dolore sit explicabo. Praesentium alias dolore sint incidunt dolor neque facere delectus debitis, numquam porro explicabo! Voluptatum debitis esse fugit repellat, mollitia unde natus dolorem nesciunt perferendis provident recusandae labore! Veritatis maxime, provident laborum iure id alias quas sed sequi eius libero, tenetur placeat laboriosam asperiores culpa ipsa sapiente illo sunt. Aliquid quo voluptatem similique! Doloremque minima aperiam amet quaerat deleniti excepturi totam!
            I'm good, thanks! How about you?" time="10:01 AM" isSender={false} />
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

const InputChat = ()=>{
    const textareaRef = useRef(null);

    const [textMessage, setTextMessage] = useState("");

    const handleInput = (e) => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to get the scrollHeight correctly
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
        setTextMessage(e.target.value);
    };

    return (
        <div className="flex items-end p-2 pb-3 bg-blue-100 border-t border-gray-300">
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
                text={textMessage}
            rows="1" type="text" className="max-h-48 p-2 bg-blue-100 w-full overflow-auto resize-none border-none focus:outline-none hide-scrollbar" placeholder="Type a message..." />

            </div>
            { textMessage.trim()!=="" ?
            <button className="ml-2 p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600">
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


const ShowChats = ()=>{
    return (<div    className="w-[0%] md:w-3/4 h-screen bg-blue-100 fixed right-0 flex flex-col overflow-hidden">
        <Header name={"Akram Khan"} profilePic={defaultProfilePic}/>
        <Chats chatList={[]}/>
        <InputChat/>
    </div>);
}

export default ShowChats;