export interface Attachment {
  id: string;
  file: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

export interface Message {
  id: number;
  content: string;
  created_at: string;
  author: {
    id: number;
    username: string;
    avatar?: string;
    role?: {
      name: string;
    };
  };
  attachments?: Attachment[];
  isRead?: boolean;
}

export interface MessageProps {
  message: Message;
  isSelf: boolean;
}

export interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  onEmojiClick: (emojiData: any) => void;
  handleFileUpload: (file: File) => Promise<void>;
}

export interface MessageHeaderProps {
  title: string;
  username: string;
  avatar?: string;
}
