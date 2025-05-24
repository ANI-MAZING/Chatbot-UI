
import { useState, useEffect, useRef } from "react";
import { Message, User } from "../types/chat";
import { currentUser } from "../data/users";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { getChat } from "../data/chats";

interface ChatWindowProps {
  selectedContact: User | null;
}

const ChatWindow = ({ selectedContact }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages when selected contact changes
  useEffect(() => {
    if (selectedContact) {
      const chat = getChat(selectedContact.id);
      if (chat) {
        setMessages(chat.messages);
      }
    }
  }, [selectedContact]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedContact) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        text: inputValue.trim(),
        timestamp: "just now",
      };

      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedContact) {
    return (
      <div className="flex items-center justify-center h-full bg-chat-darker text-gray-400">
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-chat-darker">
      {/* Chat header */}
      <div className="flex items-center p-3 border-b border-chat-border bg-chat-dark">
        <Avatar className="h-10 w-10 mr-3">
          <img src={selectedContact.avatar} alt={selectedContact.name} />
        </Avatar>
        <div className="flex-1">
          <h2 className="font-medium text-white">{selectedContact.name}</h2>
          <p className="text-xs text-gray-400">
            {selectedContact.status || "Online"}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">

          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-chat-hover">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-chat-hover">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSentByMe = message.senderId === currentUser.id;

          return (
            <div
              key={message.id}
              className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
            >
              {!isSentByMe && (
                <Avatar className="h-8 w-8 mr-2 self-end">
                  <img src={selectedContact.avatar} alt={selectedContact.name} />
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isSentByMe
                    ? "bg-chat-sent text-white rounded-tr-none"
                    : "bg-chat-message text-white rounded-tl-none"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${isSentByMe ? "text-blue-200" : "text-gray-300"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className="p-3 border-t border-chat-border flex items-end gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            className="border-none bg-chat-message rounded-2xl text-white min-h-[42px] px-4 py-2 focus-visible:ring-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex gap-1">

          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-chat-message hover:bg-chat-hover text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c-1.4 0-2 .6-2 2 0 1.4.6 2 2 2 1.4 0 2-.6 2-2 0-1.4-.6-2-2-2z"></path>
              <path d="M12 9c-1.4 0-2 .6-2 2 0 1.4.6 2 2 2 1.4 0 2-.6 2-2 0-1.4-.6-2-2-2z"></path>
              <path d="M12 16c-1.4 0-2 .6-2 2 0 1.4.6 2 2 2 1.4 0 2-.6 2-2 0-1.4-.6-2-2-2z"></path>
            </svg>
          </button>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim()} 
            className="w-10 h-10 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
