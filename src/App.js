import "./App.css";
import Chats from "./components/Chats";
import ShowChats from "./components/ShowChats";

function App() {
  return (
    <div className="w-screen h-screen bg-red-100">
      <Chats />
      <ShowChats />
    </div>
  );
}

export default App;
