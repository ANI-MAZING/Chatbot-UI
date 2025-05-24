
import { User } from "../types/chat";

export const currentUser: User = {
  id: "user1",
  name: "Aniruddh",
  avatar: "https://i.pravatar.cc/150?img=11",
};

export const contacts: User[] = [
  {
    id: "user2",
    name: "Angel White",
    avatar: "https://i.pravatar.cc/150?img=20",
    lastMessage: "NIKE",
    lastSeen: "2 min ago"
  },
  {
    id: "user3",
    name: "Tesha Sharma",
    avatar: "https://i.pravatar.cc/150?img=26",
    lastMessage: "NETFLIX",
    lastSeen: "5 min ago"
  },
];
