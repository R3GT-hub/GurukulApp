import React, { useState } from 'react';

export default function ContactAdmin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div>
      <h1>Contact Admin</h1>
      <form action="https://getform.io/f/pbnvqzqb" method="POST">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            cols={100}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
