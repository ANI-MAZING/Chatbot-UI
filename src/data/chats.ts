
import { Chat, Message } from "../types/chat";
import { contacts } from "./users";

const createChatHistory = (userId: string): Message[] => {
  if (userId === "user2") { // Maria Nelson
    return [
      {
        id: "msg1",
        senderId: "user2",
        text: "Hi, my package was supposed to arrive yesterday but I haven't received it yet. Can you help?",
        timestamp: "50 minutes ago",
      },
      {
        id: "msg2",
        senderId: "user1",
        text: "Hello! I'm sorry to hear that your package hasn't arrived. Let me check the status for you. Could you please share your order ID?",
        timestamp: "49 minutes ago",
      },
      {
        id: "msg3",
        senderId: "user2",
        text: "Yes, it's #ORD57293.",
        timestamp: "49 minutes ago",
      },
      {
        id: "msg4",
        senderId: "user1",
        text: "Thank you! I’ve checked the tracking details, and it looks like your package was delayed due to weather conditions. It’s currently out for delivery and should arrive by 8 PM today. We apologize for the inconvenience!",
        timestamp: "49 minutes ago",
      },
      {
        id: "msg5",
        senderId: "user2",
        text: "OK Great! Thank you for the update. I appreciate your help.",
        timestamp: "49 minutes ago",
      },

    ];
  } else {
    return [
      {
        id: `${userId}-msg1`,
        senderId: userId,
        text: "Hey, I accidentally subscribed to the Premium plan. Can I cancel it and get a refund?",
        timestamp: "1 day ago",
      },
      {
        id: `${userId}-msg2`,
        senderId: "user1",
        text: "Hi there! I can help with that. Just to confirm, would you like to cancel the subscription immediately and request a refund for the latest charge?",
        timestamp: "1 day ago",
      },
      {
        id: `${userId}-msg3`,
        senderId: userId,
        text: "Yes, please. I didn’t mean to activate it.",
        timestamp: "1 day ago",
      },
      {
        id: `${userId}-msg4`,
        senderId: "user1",
        text: "Got it! I’ve processed the cancellation and initiated a refund. You should see the amount credited to your account within 3–5 business days. Let us know if you need anything else!",
        timestamp: "30 minutes ago",
      }
    ];
  }
};

export const chats: Chat[] = contacts.map(contact => ({
  id: `chat-${contact.id}`,
  participants: [contact],
  messages: createChatHistory(contact.id)
}));

export const getChat = (userId: string): Chat | undefined => {
  return chats.find(chat => chat.participants.some(p => p.id === userId));
};
