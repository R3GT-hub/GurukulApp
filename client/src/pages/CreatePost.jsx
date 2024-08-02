import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import "./Form.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [website, setWebsite] = useState("");
  const [redirect, setRedirect] = useState(false);
  const filepathRef = useRef("");

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
      filepathRef.current = newUrl;
      console.log("this is file path: ", filepathRef.current);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  async function createNewPost(ev) {
    ev.preventDefault();

    await uploadImage();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("website", website);
    data.set("cloudpath", filepathRef.current);

    console.log(filepathRef.current);

    const response = await fetch("https://gurukul-server.onrender.com/post", {
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
    <div className="form-container">
      <form id="contact" onSubmit={createNewPost} className="form-card">
        <h2>Post a new Opportunity</h2>
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
          placeholder="Website Link"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <ReactQuill value={content} onChange={(newVal) => setContent(newVal)} />
        <button className="createpostbutton" type="submit">Create Post</button>
      </form>
    </div>
  );
}
