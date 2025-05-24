
import { useState } from "react";
import ContactList from "../components/ContactList";
import ChatWindow from "../components/ChatWindow";
import ProfileSidebar from "../components/ProfileSidebar";
import { User } from "../types/chat";
import { currentUser } from "../data/users";
import { Avatar } from "@/components/ui/avatar";

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleSelectContact = (contact: User) => {
    setSelectedContact(contact);
    setShowProfile(false); // Close profile sidebar when changing contacts
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-chat-darker text-white">
      {/* Current user info */}
      <div className="flex flex-col w-72 border-r border-chat-border">
        <div className="p-3 flex items-center justify-between bg-chat-darker border-b border-chat-border">
          <div className="flex items-center">

            <p className="font-medium">YOUR INBOX</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-chat-hover rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>

          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          <ContactList 
            onSelectContact={handleSelectContact} 
            selectedContactId={selectedContact?.id || null} 
          />
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow selectedContact={selectedContact} />
      </div>

      {/* Profile sidebar - shown when a contact is selected and profile is toggled */}
      {selectedContact && showProfile && (
        <div className="w-72 border-l border-chat-border">
          <ProfileSidebar contact={selectedContact} />
        </div>
      )}

      {/* Toggle profile button - shown when a contact is selected */}
      {selectedContact && (
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-chat-message hover:bg-chat-hover z-10"
          onClick={toggleProfile}
        >
          {showProfile ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Index;
