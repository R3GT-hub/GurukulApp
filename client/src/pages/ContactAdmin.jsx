import React, { useState } from "react";
import "./Form.css"

export default function ContactAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <form id="contact" action="https://getform.io/f/pbnvqzqb" method="POST">
        <h1>Contact Admin</h1>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Your name"
            type="text"
            tabindex="1"
            required
            autofocus
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Your email address"
            type="email"
            tabindex="2"
            id="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autofocus
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message:</label>
          <textarea
            placeholder="Type your message here...."
            tabindex="5"
            id="message"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            cols={100}
            required
          ></textarea>
        </fieldset>
        <fieldset>
          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Send Message
          </button>
        </fieldset>
      </form>
    </div>
  );
}
