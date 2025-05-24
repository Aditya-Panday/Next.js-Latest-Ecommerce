"use client";

import { useState, useEffect } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/constants/utils";
import { useMobile } from "@/utils/hooks/use-mobile";

const Page = () => {
  const [selectedChat, setSelectedChat] = useState("1");
  const [messageInput, setMessageInput] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const isMobile = useMobile();

  // When a chat is selected on mobile, show the conversation
  useEffect(() => {
    if (isMobile && selectedChat) {
      setShowConversation(true);
    }
  }, [selectedChat, isMobile]);

  // When switching from desktop to mobile, reset the view to the chat list
  useEffect(() => {
    if (isMobile) {
      setShowConversation(!!selectedChat);
    } else {
      setShowConversation(false);
    }
  }, [isMobile, selectedChat]);

  const [conversations, setConversations] = useState({
    1: [
      {
        id: "1-1",
        content: "Hello, I have a question about my order #12345",
        sender: "customer",
        timestamp: "10:25 AM",
      },
      {
        id: "1-2",
        content:
          "Hi John, I'd be happy to help you with your order. What would you like to know?",
        sender: "user",
        timestamp: "10:27 AM",
      },
      {
        id: "1-3",
        content:
          "I ordered the product 3 days ago but haven't received any shipping confirmation yet.",
        sender: "customer",
        timestamp: "10:28 AM",
      },
      {
        id: "1-4",
        content: "When can I expect my order to be shipped?",
        sender: "customer",
        timestamp: "10:30 AM",
      },
    ],
    2: [
      {
        id: "2-1",
        content: "Hi, I placed an order yesterday. When will it be shipped?",
        sender: "customer",
        timestamp: "Yesterday",
      },
      {
        id: "2-2",
        content:
          "Hello Jane, your order is being processed and should ship within 24 hours. You'll receive a confirmation email with tracking information.",
        sender: "user",
        timestamp: "Yesterday",
      },
    ],
    3: [
      {
        id: "3-1",
        content:
          "I had an issue with my order but your team resolved it quickly.",
        sender: "customer",
        timestamp: "2 days ago",
      },
      {
        id: "3-2",
        content: "Thanks for your help!",
        sender: "customer",
        timestamp: "2 days ago",
      },
      {
        id: "3-3",
        content:
          "You're welcome, Mike! We're glad we could help. Don't hesitate to reach out if you need anything else.",
        sender: "user",
        timestamp: "2 days ago",
      },
    ],
    4: [
      {
        id: "4-1",
        content: "Hello, I'm interested in the leather jacket on your website.",
        sender: "customer",
        timestamp: "3 days ago",
      },
      {
        id: "4-2",
        content: "Is this product available in blue?",
        sender: "customer",
        timestamp: "3 days ago",
      },
    ],
    5: [
      {
        id: "5-1",
        content: "I'd like to return my purchase. It doesn't fit as expected.",
        sender: "customer",
        timestamp: "1 week ago",
      },
      {
        id: "5-2",
        content:
          "I'm sorry to hear that, David. I can help you with the return process. Please provide your order number and I'll guide you through the steps.",
        sender: "user",
        timestamp: "1 week ago",
      },
    ],
  });

  const chats = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I have a question about my order #12345",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "When will my order be shipped?",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for your help!",
      time: "2 days ago",
      unread: 0,
    },
    {
      id: "4",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Is this product available in blue?",
      time: "3 days ago",
      unread: 1,
    },
    {
      id: "5",
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'd like to return my purchase",
      time: "1 week ago",
      unread: 0,
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    // Create a new message
    const newMessage = {
      id: `${selectedChat}-${Date.now()}`,
      content: messageInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update conversations state
    setConversations((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    // Clear input after sending
    setMessageInput("");
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setShowConversation(true);
    }
  };

  const handleBackToList = () => {
    setShowConversation(false);
  };

  const currentChat = selectedChat
    ? chats.find((chat) => chat.id === selectedChat)
    : null;
  const currentMessages = selectedChat ? conversations[selectedChat] || [] : [];
  return (
    
      <div className="container mx-auto max-w-5xl py-6">
        <h1 className="text-2xl font-bold mb-6">Customer Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Left side - Chat list */}
          <div
            className={cn(
              "md:col-span-1 border rounded-lg overflow-hidden",
              isMobile && showConversation ? "hidden" : "block"
            )}
          >
            <div className="p-3 bg-muted/30">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-8" />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
              {chats.map((chat) => (
                <div key={chat.id}>
                  <button
                    className={cn(
                      "w-full flex items-start p-3 hover:bg-muted/50 transition-colors",
                      selectedChat === chat.id && "bg-muted/50"
                    )}
                    onClick={() => handleChatSelect(chat.id)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Right side - Chat conversation */}
          <div
            className={cn(
              "md:col-span-2 lg:col-span-3 border rounded-lg overflow-hidden flex flex-col",
              isMobile && !showConversation ? "hidden" : "block"
            )}
          >
            {selectedChat && currentChat ? (
              <>
                <div className="p-3 bg-muted/30 border-b">
                  <div className="flex items-center">
                    {isMobile && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-1"
                        onClick={handleBackToList}
                        aria-label="Back to chat list"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    )}
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={currentChat.avatar}
                        alt={currentChat.name}
                      />
                      <AvatarFallback>
                        {currentChat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{currentChat.name}</h3>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4 h-[calc(100vh-350px)]">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        <Card
                          className={cn(
                            "max-w-[80%] p-3",
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p>{message.content}</p>
                          <p
                            className={cn(
                              "text-xs mt-1",
                              message.sender === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {message.timestamp}
                          </p>
                        </Card>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {isMobile
                  ? "Select a conversation to start chatting"
                  : "Select a conversation from the left to start chatting"}
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Page;
