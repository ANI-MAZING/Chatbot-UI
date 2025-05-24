
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/chat";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ProfileSidebarProps {
  contact: User;
}

const ProfileSidebar = ({ contact }: ProfileSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    sharedPhotos: false,
    sharedFiles: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-full h-full bg-chat-dark border-l border-chat-border flex flex-col">
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Avatar className="h-24 w-24 mb-4">
          <img src={contact.avatar} alt={contact.name} className="object-cover" />
        </Avatar>
        <h2 className="text-xl font-semibold text-white">{contact.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{contact.status}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4">

        <div className="mb-4">
          <div 
            className="flex justify-between items-center py-2 cursor-pointer"
            onClick={() => toggleSection('sharedPhotos')}
          >
            <h3 className="text-sm font-medium text-white">Shared photos</h3>
            {expandedSections.sharedPhotos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.sharedPhotos && (
            <div className="pl-2 py-2 space-y-2 text-sm text-gray-400">
              <p>No shared files</p>
            </div>
          )}
          <Separator className="my-2 bg-chat-border" />
        </div>

        <div className="mb-4">
          <div 
            className="flex justify-between items-center py-2 cursor-pointer"
            onClick={() => toggleSection('sharedFiles')}
          >
            <h3 className="text-sm font-medium text-white">Shared files</h3>
            {expandedSections.sharedFiles ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.sharedFiles && (
            <div className="pl-2 py-2 space-y-2 text-sm text-gray-400">
              <p>No shared files</p>
            </div>
          )}
        </div>
      </div>


      <div className="p-3 border-t border-chat-border h-auto flex flex-col items-end gap-2">
        <div className="flex-1 w-full relative">
          <Input
            placeholder="Ask Chatbot"
            className="border-none bg-chat-message rounded-2xl text-white h-14 px-4 py-3 text-base focus-visible:ring-0 placeholder:text-gray-400"
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
            className="w-10 h-10 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>


      <div className="p-4 border-t border-chat-border">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white" variant="destructive">
          Block User
        </Button>
        <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
