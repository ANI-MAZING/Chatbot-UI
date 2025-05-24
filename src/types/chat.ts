
export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: string;
  lastMessage?: string;
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
}
