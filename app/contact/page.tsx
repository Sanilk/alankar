"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simple validation
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    console.log("Form submitted:", form);

    // simulate success
    setSubmitted(true);

    // reset form
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-12">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT - INFO */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Get in touch
          </h2>

          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Whether you have a question about
            products, orders, or anything else, our team is ready to help.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📧 support@yourstore.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Kerala, India</p>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm">
              Message sent successfully!
            </p>
          )}

        </form>
      </div>
    </main>
  );
}