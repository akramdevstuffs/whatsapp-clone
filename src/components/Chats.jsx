import { useState } from "react";
import addMessagePng from "./../assets/add_message.png";
import orderChatsBy from "./../assets/order_by.png";
import searchChats from "./../assets/search.png";
import defaultProfilePic from "./../assets/defaultProfilePic.png";


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
    return (
        <div className="relative p-2">
            <input type="text" className="w-full pl-10 pr-4 py-2 border truncate rounded-full hover:shadow-[0_0_5px_rgba(0,191,255,0.8)]" placeholder="Search or start a new chat" />
            <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
            <img src={searchChats} className="size-4" alt="" />
            </div>
        </div>
    );
}

const Chat = ({profilePic, name,recentChat,lastSeen})=>{
    return (
        <div className="flex justify-between m-2 p-2 cursor-pointer hover:bg-gray-300 rounded-lg">
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

const Chats = ()=>{
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
    return (<div className="w-screen fixed h-screen md:w-[25%] bg-blue-100 border-r border-gray-300 flex flex-col select-none">
        <Heading/>
        <SearchBar/>
        <div className="overflow-auto h-full transparent-scrollbar">
        {chatList.map((val)=>
        <Chat
            key={val.id}
            profilePic={(val.profilePic)?val.profilePic:defaultProfilePic}
            name={val.name}
            recentChat={val.recentChat}
            lastSeen={val.lastSeen}
        />)}

        </div>

    </div>);
}

export default Chats;