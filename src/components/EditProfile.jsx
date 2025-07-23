import { useRef, useState } from "react";
import defaultProfilePic from "../assets/defaultProfilePic.png";
import { updateUserProfile } from "../api/UserApi";


export default function EditProfile() {
    const [displayName, setDisplayName] = useState("");
    const [about, setAbout] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState(defaultProfilePic);
    const profilePicRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            displayName: displayName,
            about: about,
            profilePicture: (imageFile) ? URL.createObjectURL(imageFile):null,
        };
        updateUserProfile(profileData);
    }

  return (
    <div className="w-screen h-screen flex items-center justify-center gap-4 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-8 text-center">Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
        <div className="relative mb-6 w-48 h-48">
            <img src={image} alt="Profile Pic" className="rounded-full mx-auto mb-4 w-48 h-48" />
            <div className="absolute top-0 z-10 flex justify-center items-center w-48 h-48 rounded-full cursor-pointer hover:bg-gray-500/50 transition-colors">
                <img alt="Change profile picture" src="https://img.icons8.com/ios-filled/50/000000/camera.png" className="size-6" />
                <input type="file" accept="image/*" ref={profilePicRef} onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
        </div>
        </div>
        <input type="text" className="w-full mb-4 p-2 border rounded" placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
         required/>
        <textarea rows="3" className="w-full mb-4 p-2 border rounded" placeholder="About Yourself" 
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            Submit
        </button>
      </form>
      </div>
    </div>
  );
};