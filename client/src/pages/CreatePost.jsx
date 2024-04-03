import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [website, setWebsite] = useState("");
  const [redirect, setRedirect] = useState(false);
  const filepathRef = useRef(""); // Using useRef instead of useState for filepath

  async function uploadImage() {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gurukul");
    data.append("cloud_name", "dcqqcovdd");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcqqcovdd/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imageData = await response.json();
      console.log(imageData.url);
      const newUrl = imageData.url;
      filepathRef.current = newUrl; // Update the filepath using useRef
      console.log("this is file path: ", filepathRef.current);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  async function createNewPost(ev) {
    ev.preventDefault();

    // Upload the image first
    await uploadImage();

    // Use the uploaded image URL as cloudpath in the form data directly
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("website",website);
    data.set("cloudpath", filepathRef.current); // Use the updated filepath from useRef

    console.log(filepathRef.current); // Log the updated filepath after it should have been updated

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="text"
        placeholder="website link"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <ReactQuill value={content} onChange={(newVal) => setContent(newVal)} />
      <button type="submit">Create Post</button>
    </form>
  );
}
