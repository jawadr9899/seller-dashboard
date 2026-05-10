'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { selectContact, sendMessage } from '@/store/slices/chatSlice';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactRow } from '@/components/chat/ContactRow';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { Avatar } from '@/components/custom-ui/Avatar';

import { navigationItems, bottomTabs } from '@/config/navigation';





export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, conversations, selectedContactId } = useAppSelector((state) => state.chat);

  const selectedContact = contacts.find((c) => c.id === selectedContactId);
  const messages = selectedContactId ? conversations[selectedContactId] || [] : [];

  return (
    <div className="flex bg-gray-50">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0 flex">
        {/* Contact List - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-80 bg-white border-r border-gray-200 flex-col">
          <div className="p-4 border-b border-gray-200">
            <PageHeader title="Messages" />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">ACTIVE CONVERSATIONS</p>
              {contacts.map((contact) => (
                <ContactRow
                  key={contact.id}
                  {...contact}
                  active={selectedContactId === contact.id}
                  onClick={(id) => dispatch(selectContact(id))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={selectedContact.avatar} size="md" online={selectedContact.online} alt={selectedContact.name} />
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">{selectedContact.name}</h2>
                    <p className="text-xs text-gray-500">{selectedContact.online ? 'ONLINE' : 'OFFLINE'} · REGULAR CUSTOMER</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 text-xl">⋮</button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-white">
                {messages.length > 0 ? (
                  <div>
                    {messages.map((msg) => (
                      <ChatBubble
                        key={msg.id}
                        type={msg.type}
                        text={msg.text}
                        timestamp={msg.timestamp}
                        avatar={msg.type === 'inbound' ? selectedContact.avatar : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">No messages yet. Start a conversation!</p>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <MessageInput
                onSend={(text) => {
                  if (selectedContactId) {
                    dispatch(sendMessage({ contactId: selectedContactId, text }));
                  }
                }}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400">Select a contact to start chatting</p>
            </div>
          )}
        </div>

        {/* Mobile Contact List Overlay */}
        <div className="lg:hidden fixed inset-0 bg-black/50 pointer-events-none" />
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
