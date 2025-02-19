import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_yq4d5go",
        "template_e9acm6j",
        form.current,
        "t6dk9o9DwtTJXAcw5"
      )
      .then(
        (result) => {
          form.current.reset();
          setIsSending(false);
        },
        (error) => {
          setIsSending(false);
        }
      );
  };

  return (
    <section id="contact" className="flex p-8  text-white border-t-2">
      <div className="w-1/2 pl-4">
        <h2 className="text-2xl font-bold mb-4">
          Feel free to send me a message!
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4 text-white">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full p-2 border border-gray-700 rounded bg-gray-700 placeholder-white"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-2 border border-gray-700 rounded bg-gray-700 placeholder-white"
          />
          <textarea
            placeholder="Message"
            name="message"
            className="w-full p-2 border border-gray-700 rounded bg-gray-700 placeholder-white h-32"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md">
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
