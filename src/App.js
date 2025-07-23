import "./App.css";
import Chats from "./components/Chats";
import ShowChats from "./components/ShowChats";
import EditProfile from "./components/EditProfile";
import useAuth from "./hooks/useAuth";
import LoginPage from "./components/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HomePage = ({ priority = 1 }) => {
  return (
    <div className="w-screen h-screen">
      <Chats priority={priority} />
      <ShowChats priority={priority} />
    </div>
  );
};
const router = createBrowserRouter([
  { path: "/", element: <HomePage priority={1} /> },
  { path: "/chat", element: <HomePage priority={1} /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/chat/:uid", element: <HomePage priority={2} /> },
]);

function App() {
  const { user, checking, hasProfile } = useAuth();

  if (checking) return <div>Loading...</div>;

  if (!user) return <LoginPage />;

  if (!hasProfile) return <EditProfile />;

  return (
    <RouterProvider router={router}>
      <HomePage />
    </RouterProvider>
  );
}

export default App;
