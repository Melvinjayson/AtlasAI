"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  IconButton,
  Typography,
  Avatar,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatInterface() {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I'm processing your request and will respond shortly.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "calc(100vh - 250px)",
        display: "flex",
        flexDirection: "column",
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        backdropFilter: "blur(6px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              gap: 2,
              maxWidth: "80%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Avatar
              sx={{
                bgcolor:
                  msg.sender === "user"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
              }}
            >
              {msg.sender === "user" ? "M" : "AI"}
            </Avatar>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor:
                  msg.sender === "user"
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.text.primary,
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                {msg.timestamp.toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
        ))}
        {isTyping && (
          <Box sx={{ display: "flex", gap: 2, maxWidth: "80%" }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>AI</Avatar>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CircularProgress size={20} />
              <Typography variant="body2">Atlas AI is typing...</Typography>
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: alpha(theme.palette.primary.main, 0.03),
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={!message.trim() || isTyping}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
              "&.Mui-disabled": {
                bgcolor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.common.white,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}