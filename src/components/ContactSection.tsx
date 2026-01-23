import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import type { FormState } from "@/types";

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="relative py-20 px-4 md:px-16 lg:px-24 xl:px-40 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-cyan-500/20 to-teal-400/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-sky-400/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-4">
        Get in Touch
      </h2>
      <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-teal-400 mx-auto rounded-full mb-6"></div>
      <p className="text-sm md:text-base text-gray-200 text-center max-w-xl mx-auto">
        Have questions or want to collaborate? Fill out the form below and we'll
        get back to you as soon as possible.
      </p>

      {/* Form container */}
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="bg-transparent rounded-2xl p-8 md:p-10 relative overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-400/20 to-teal-400/20 rounded-bl-full z-0"></div>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex flex-col gap-6"
          >
            {/* Name */}
            <div className="relative group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
                <User className="w-4 h-4 text-cyan-400" />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-600 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-transparent text-white placeholder-gray-400 hover:border-gray-400 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
                <Mail className="w-4 h-4 text-teal-400" />
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full border border-gray-600 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-transparent text-white placeholder-gray-400 hover:border-gray-400 transition-all"
                required
              />
            </div>

            {/* Message */}
            <div className="relative group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                Your Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                rows={6}
                className="w-full border border-gray-600 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-transparent text-white placeholder-gray-400 resize-none hover:border-gray-400 transition-all"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                isSubmitted
                  ? "bg-linear-to-r from-green-500 to-emerald-500 shadow-green-200/50"
                  : "bg-linear-to-r from-cyan-400 to-teal-400 hover:from-sky-400 hover:to-blue-500 shadow-cyan-200/50"
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="flex flex-colitems-center justify-center gap-4 mt-8">
          <div className="bg-transparent rounded-xl p-4 border border-gray-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg text-center">
            <Mail className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-200">Email Us</p>
            <p className="text-xs text-gray-400 mt-1">support@webora.com</p>
          </div>

          <div className="bg-transparent rounded-xl p-4 border border-gray-600 hover:border-sky-400 transition-all duration-300 hover:shadow-lg text-center">
            <CheckCircle2 className="w-6 h-6 text-sky-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-200">Response Time</p>
            <p className="text-xs text-gray-400 mt-1">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
