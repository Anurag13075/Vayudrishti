"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  CheckCheck,
  Shield,
  Sparkles,
  Phone,
  Video,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Bot,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m-1",
    sender: "bot",
    text: "Namaste! 🌿 I am your **VayuDrishti 24/7 Air Sentinel**. I deliver real-time bio-telemetry alerts, school assembly clearances, and clean-commute routing straight to your phone.\n\nHow can I help protect your lungs today?",
    time: "10:00 AM",
  },
];

const SUGGESTED_QUERIES = [
  "🫁 How do I test my lungs (SpiroVision)?",
  "🏃 Can I jog outside right now?",
  "🏫 School assembly status for tomorrow?",
  "🗺️ Cleanest route from Noida to CP?",
  "⌚ How do I connect my smartwatch?",
  "📍 What is the AQI in Delhi?",
];

export default function WhatsAppBotSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [realPhone, setRealPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          from: realPhone.trim() || undefined,
        }),
      });

      const data = await res.json();
      setTimeout(() => {
        setIsTyping(false);
        let replyText = data.reply || "I am currently monitoring atmospheric inversion. Please ask again shortly.";
        if (data.outboundDispatch?.success) {
          replyText += `\n\n🟢 *[Real Device Sent]* Dispatched to ${realPhone} via ${data.outboundDispatch.provider}`;
        }
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 700);
    } catch (e) {
      setTimeout(() => {
        setIsTyping(false);
        const fallbackMsg: Message = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "⚠️ Ground inversion layer active. For safety, avoid high-intensity outdoor cardio until 09:00 AM.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl border border-white/20 font-semibold text-xs transition-all"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white" />
            {unreadCount > 0 && !isOpen && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline font-sans">WhatsApp Air Sentinel</span>
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        </motion.button>
      </div>

      {/* WhatsApp Modal / Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#efeae2] rounded-2xl shadow-2xl overflow-hidden border border-neutral-300 flex flex-col font-sans"
            style={{
              backgroundImage: "radial-gradient(#e0dcd5 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            {/* WhatsApp Emerald Header */}
            <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-400">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-sm leading-tight">
                    <span>VayuDrishti Bot</span>
                    <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-normal">
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-200">Online • 24/7 Respiratory Defense</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/80">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            <div className="bg-[#e2f7cb] border-b border-[#c2e29e] px-3 py-1.5 text-[11px] text-[#2b5314] flex items-center justify-between">
              <span className="flex items-center gap-1">
                🔒 Live Webhook &bull; Twilio &amp; Meta Cloud Ready
              </span>
              <button
                onClick={() => setShowPhoneInput(!showPhoneInput)}
                className="text-[10px] font-semibold underline flex items-center gap-0.5 hover:text-black cursor-pointer"
              >
                {showPhoneInput ? "Hide Phone" : "📱 Real Phone Sync"}
              </button>
            </div>

            {/* Optional Real Phone Number Input Bar */}
            {showPhoneInput && (
              <div className="bg-[#f7f5f0] border-b border-neutral-300 px-3 py-2 text-xs flex items-center gap-2">
                <span className="text-[10px] font-semibold text-[#575752] shrink-0">Your WhatsApp:</span>
                <input
                  type="text"
                  value={realPhone}
                  onChange={(e) => setRealPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="flex-1 bg-white border border-neutral-300 rounded px-2 py-1 text-xs text-[#111b21] placeholder-neutral-400 font-mono"
                />
              </div>
            )}

            {/* Messages Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed shadow-xs whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-[#d9fdd3] text-[#111b21] rounded-tr-none"
                        : "bg-white text-[#111b21] rounded-tl-none border border-neutral-200/60"
                    }`}
                  >
                    {m.text}
                    <div
                      className={`text-[9px] mt-1 text-right flex items-center justify-end gap-1 ${
                        m.sender === "user" ? "text-emerald-700" : "text-neutral-400"
                      }`}
                    >
                      <span>{m.time}</span>
                      {m.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-2 rounded-lg rounded-tl-none w-20 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-neutral-100/90 border-t border-neutral-200/80 overflow-x-auto flex gap-1.5 no-scrollbar">
              {SUGGESTED_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="shrink-0 text-[10px] bg-white border border-neutral-300 text-neutral-700 hover:text-emerald-700 hover:border-emerald-500 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="bg-[#f0f2f5] p-2.5 flex items-center gap-2 border-t border-neutral-200"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Air Sentinel on WhatsApp..."
                className="flex-1 bg-white border border-neutral-300 focus:border-[#25D366] focus:outline-none rounded-full px-4 py-2 text-xs text-[#111b21] placeholder-neutral-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
