"use client";

import React, { Suspense, useState } from "react";
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
    <div className="flex h-screen bg-ok-surface-page overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
              <Sidebar items={navigationItems} />
      </Suspense>

      <main className="flex-1 pb-16 lg:pb-0 p-4 md:p-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          <div
            className={`bg-ok-surface border border-ok-border rounded-lg shadow-sm overflow-hidden ${selectedContact ? "hidden lg:flex" : "flex"} flex-col`}
          >
            <div className="p-5 border-b border-ok-border">
              <h1 className="text-2xl font-bold text-ok-heading">Messages</h1>
              <p className="text-sm text-ok-text-muted mt-2">
                Manage customer conversations and respond quickly.
              </p>
              <div className="mt-4 relative">
                <svg
                  className="w-4 h-4 text-ok-text-muted absolute left-3 top-3"
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-ok-border bg-white text-sm text-ok-text focus:outline-none focus:border-ok-chart-bar focus:ring-2 focus:ring-ok-chart-bar/15"
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
                        ? "bg-ok-brand-subtle border-ok-border-brand"
                        : "bg-white border-ok-border hover:bg-ok-surface-alt"
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
                          <p className="text-sm font-semibold text-ok-heading truncate">
                            {contact.name}
                          </p>
                          <p className="text-xs text-ok-text-muted">
                            {contact.time}
                          </p>
                        </div>
                        <p className="text-xs text-ok-text-muted truncate mt-1">
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
            className={`bg-ok-surface border border-ok-border rounded-lg shadow-sm overflow-hidden ${!selectedContact ? "hidden lg:flex" : "flex"} flex-col min-h-0`}
          >
            {selectedContact ? (
              <>
                <div className="p-5 border-b border-ok-border flex items-center gap-3 bg-white/80">
                  <button
                    className="lg:hidden text-ok-text-muted hover:text-ok-chart-bar text-lg"
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
                    <h2 className="text-base font-bold text-ok-heading truncate">
                      {selectedContact.name}
                    </h2>
                    <p className="text-xs text-ok-text-muted mt-1">
                      {selectedContact.online ? "Online" : "Offline"} · Customer
                      support conversation
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-sm border border-ok-border bg-white text-ok-text-muted hover:text-ok-chart-bar">
                    ⋮
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ok-surface-alt">
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
                                  ? "bg-ok-chart-bar text-white"
                                  : "bg-white border border-ok-border text-ok-heading"
                              }`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[11px] text-ok-text-muted mt-1 px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center text-ok-text-muted text-sm">
                      No messages yet.
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-ok-border bg-white">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-sm border border-ok-border bg-ok-surface text-sm text-ok-text focus:outline-none focus:border-ok-chart-bar focus:ring-2 focus:ring-ok-chart-bar/15"
                    />
                    <Button onClick={handleSend} disabled={!message.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-ok-text-muted text-sm">
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
