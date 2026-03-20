import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MessageCircle, User, Inbox } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import type { ChatMessage } from "../components/ChatWidget";

interface ChatClient {
  email: string;
  name: string;
}

export default function AdminSupport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState<ChatClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<ChatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/403");
    }
  }, [user, navigate]);

  useEffect(() => {
    const raw = localStorage.getItem("lumina_chat_list") || "[]";
    setClients(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (!selectedClient) {
      setMessages([]);
      return;
    }
    const key = `lumina_chat_${selectedClient.email}`;
    const saved = localStorage.getItem(key);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [selectedClient]);

  useEffect(() => {
    if (!selectedClient) return;
    const interval = setInterval(() => {
      const key = `lumina_chat_${selectedClient.email}`;
      const saved = localStorage.getItem(key);
      if (saved) setMessages(JSON.parse(saved));
      const raw = localStorage.getItem("lumina_chat_list") || "[]";
      setClients(JSON.parse(raw));
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendReply = () => {
    if (!input.trim() || !selectedClient || !user) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "studio",
      timestamp: Date.now(),
      senderName: user.name,
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(`lumina_chat_${selectedClient.email}`, JSON.stringify(updated));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("ro-RO", { day: "numeric", month: "short" });

  const getLastMessage = (email: string): ChatMessage | null => {
    const saved = localStorage.getItem(`lumina_chat_${email}`);
    if (!saved) return null;
    const msgs = JSON.parse(saved) as ChatMessage[];
    return msgs.length > 0 ? msgs[msgs.length - 1] : null;
  };

  const getUnreadCount = (email: string): number => {
    const saved = localStorage.getItem(`lumina_chat_${email}`);
    if (!saved) return 0;
    const msgs = JSON.parse(saved) as ChatMessage[];
    return msgs.filter((m) => m.sender === "client").length;
  };

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex h-screen bg-stone-950 text-stone-100">
      <div className="flex w-80 flex-col border-r border-stone-800 lg:w-96">
        <div className="flex items-center justify-between border-b border-stone-800 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => window.location.href = "/"} className="cursor-pointer text-stone-400 transition-colors hover:text-gold-400">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="font-serif text-lg font-semibold text-stone-100">Suport Chat</h1>
              <p className="text-[11px] text-stone-500">{clients.length} conversatii</p>
            </div>
          </div>
          <Inbox size={18} className="text-gold-400" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <MessageCircle size={32} className="text-stone-700 mb-3" />
              <p className="text-sm text-stone-500">Nicio conversatie inca</p>
              <p className="mt-1 text-xs text-stone-600">Mesajele clientilor vor aparea aici.</p>
            </div>
          ) : (
            clients.map((client) => {
              const lastMsg = getLastMessage(client.email);
              const unread = getUnreadCount(client.email);
              const isSelected = selectedClient?.email === client.email;

              return (
                <button
                  key={client.email}
                  onClick={() => setSelectedClient(client)}
                  className={`flex w-full cursor-pointer items-center gap-3 border-b border-stone-800/50 px-4 py-4 text-left transition-all sm:px-6 ${isSelected ? "bg-gold-400/5 border-l-2 border-l-gold-400" : "hover:bg-stone-900/50"}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs font-bold text-stone-300">
                    {getInitials(client.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-200 truncate">{client.name}</p>
                      {lastMsg && (
                        <span className="shrink-0 text-[10px] text-stone-600">{formatDate(lastMsg.timestamp)}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-stone-500 truncate">
                        {lastMsg ? (lastMsg.sender === "studio" ? "Tu: " : "") + lastMsg.text : "Niciun mesaj"}
                      </p>
                      {unread > 0 && (
                        <span className="shrink-0 ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-stone-950">{unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {selectedClient ? (
          <>
            <div className="flex items-center gap-3 border-b border-stone-800 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950">
                {getInitials(selectedClient.name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-100">{selectedClient.name}</p>
                <p className="text-xs text-stone-500">{selectedClient.email}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "studio" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[60%] rounded-lg px-4 py-3 ${msg.sender === "studio" ? "bg-gold-400 text-stone-950" : "border border-stone-800 bg-stone-900 text-stone-200"}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`mt-1 text-[10px] text-right ${msg.sender === "studio" ? "text-stone-950/50" : "text-stone-600"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-stone-800 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Scrie un raspuns..." className="flex-1 rounded-lg border border-stone-800 bg-stone-900/60 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50" />
                <button onClick={sendReply} disabled={!input.trim()} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${input.trim() ? "bg-gold-400 text-stone-950 cursor-pointer hover:bg-gold-500" : "bg-stone-800/60 text-stone-600 cursor-not-allowed"}`}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
            <User size={48} className="text-stone-800 mb-4" />
            <p className="text-lg font-medium text-stone-400">Selecteaza o conversatie</p>
            <p className="mt-2 text-sm text-stone-600">Alege un client din lista din stanga pentru a-i raspunde.</p>
          </div>
        )}
      </div>
    </div>
  );
}