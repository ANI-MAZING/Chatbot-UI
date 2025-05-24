
import { useState } from "react";
import { contacts } from "../data/users";
import { User } from "../types/chat";
import { Avatar } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ContactListProps {
  onSelectContact: (contact: User) => void;
  selectedContactId: string | null;
}

const ContactList = ({ onSelectContact, selectedContactId }: ContactListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-chat-dark">
      <div className="p-3 flex items-center gap-2 bg-chat-darker">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8 bg-chat-dark border-0 focus-visible:ring-0 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded bg-chat-dark hover:bg-chat-hover">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-3 hover:bg-chat-hover cursor-pointer ${
              selectedContactId === contact.id ? "bg-chat-hover" : ""
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <img src={contact.avatar} alt={contact.name} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{contact.name}</p>
              <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
