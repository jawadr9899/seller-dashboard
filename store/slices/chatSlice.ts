import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DummyChats } from '@/dummy/chat';

interface Message {
  id: string;
  type: 'inbound' | 'outbound';
  text: string;
  timestamp: string;
  avatar?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  time: string;
  preview: string;
  online: boolean;
}

const { contacts, conversations } = DummyChats as { contacts: Contact[]; conversations: Record<string, Message[]> };

interface ChatState {
  contacts: Contact[];
  conversations: Record<string, Message[]>;
  selectedContactId: string | null;
}

const initialState: ChatState = {
  contacts,
  conversations,
  selectedContactId: contacts[0]?.id || null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<string>) => {
      state.selectedContactId = action.payload;
    },
    sendMessage: (state, action: PayloadAction<{ contactId: string; text: string }>) => {
      const { contactId, text } = action.payload;
      if (!state.conversations[contactId]) {
        state.conversations[contactId] = [];
      }
      state.conversations[contactId].push({
        id: Date.now().toString(),
        type: 'outbound',
        text,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      });
    },
  },
});

export const { selectContact, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
