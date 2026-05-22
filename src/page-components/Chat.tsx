"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectContact, sendMessage } from "@/store/slices/chatSlice";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { Avatar } from "@/components/custom-ui/Avatar";
import { Button } from "@/components/custom-ui/Button";
import { navigationItems, bottomTabs } from "@/config/navigation";

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, conversations, selectedContactId } = useAppSelector(
    (state) => state.chat,
  );
  const [message, setMessage] = useState("");

  const selectedContact = contacts.find((c) => c.id === selectedContactId);
  const messages = selectedContactId
    ? conversations[selectedContactId] || []
    : [];

  const handleSend = () => {
    if (!message.trim() || !selectedContactId) return;
    dispatch(sendMessage({ contactId: selectedContactId, text: message }));
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-[#f6f4ff] overflow-hidden">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-16 lg:pb-0 p-4 md:p-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          <div
            className={`bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg shadow-sm overflow-hidden ${selectedContact ? "hidden lg:flex" : "flex"} flex-col`}
          >
            <div className="p-5 border-b border-[#d9d4e8]">
              <h1 className="text-2xl font-bold text-[#1f2430]">Messages</h1>
              <p className="text-sm text-[#777681] mt-2">
                Manage customer conversations and respond quickly.
              </p>
              <div className="mt-4 relative">
                <svg
                  className="w-4 h-4 text-[#777681] absolute left-3 top-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  placeholder="Search conversation"
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#d9d4e8] bg-white text-sm text-[#4b5563] focus:outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/15"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {contacts.map((contact) => {
                const isActive = selectedContactId === contact.id;
                return (
                  <button
                    key={contact.id}
                    onClick={() => dispatch(selectContact(contact.id))}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isActive
                        ? "bg-[#ece8ff] border-[#cfc7f5]"
                        : "bg-white border-[#d9d4e8] hover:bg-[#f8f8fa]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={contact.avatar}
                        size="md"
                        online={contact.online}
                        alt={contact.name}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-[#111827] truncate">
                            {contact.name}
                          </p>
                          <p className="text-xs text-[#777681]">
                            {contact.time}
                          </p>
                        </div>
                        <p className="text-xs text-[#777681] truncate mt-1">
                          {contact.preview}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg shadow-sm overflow-hidden ${!selectedContact ? "hidden lg:flex" : "flex"} flex-col min-h-0`}
          >
            {selectedContact ? (
              <>
                <div className="p-5 border-b border-[#d9d4e8] flex items-center gap-3 bg-white/80">
                  <button
                    className="lg:hidden text-[#6b668f] hover:text-[#4f46e5] text-lg"
                    onClick={() => dispatch(selectContact(""))}
                  >
                    ←
                  </button>
                  <Avatar
                    src={selectedContact.avatar}
                    size="lg"
                    online={selectedContact.online}
                    alt={selectedContact.name}
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-[#1f2430] truncate">
                      {selectedContact.name}
                    </h2>
                    <p className="text-xs text-[#777681] mt-1">
                      {selectedContact.online ? "Online" : "Offline"} · Customer
                      support conversation
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-sm border border-[#d9d4e8] bg-white text-[#6b668f] hover:text-[#4f46e5]">
                    ⋮
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f8f8fa]">
                  {messages.length > 0 ? (
                    messages.map((msg) => {
                      const isOutbound = msg.type === "outbound";
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isOutbound ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] ${isOutbound ? "items-end" : "items-start"} flex flex-col`}
                          >
                            <div
                              className={`px-4 py-3 rounded-lg text-sm leading-6 ${
                                isOutbound
                                  ? "bg-[#4f46e5] text-white"
                                  : "bg-white border border-[#d9d4e8] text-[#1f2430]"
                              }`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[11px] text-[#777681] mt-1 px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center text-[#777681] text-sm">
                      No messages yet.
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-[#d9d4e8] bg-white">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-sm border border-[#d9d4e8] bg-[#fbf7ff] text-sm text-[#4b5563] focus:outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/15"
                    />
                    <Button onClick={handleSend} disabled={!message.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#777681] text-sm">
                Select a conversation to start messaging.
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
