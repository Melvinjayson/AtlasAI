"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        text: "I'm Atlas AI, your intelligent assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Chat with Atlas AI
      </Typography>
      
      <List sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              flexDirection: message.sender === "user" ? "row-reverse" : "row",
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: message.sender === "user" ? "primary.main" : "secondary.main",
                }}
              >
                {message.sender === "user" ? <PersonIcon /> : <SmartToyIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    bgcolor:
                      message.sender === "user"
                        ? "primary.main"
                        : "background.default",
                    color:
                      message.sender === "user" ? "common.white" : "text.primary",
                    borderRadius: 2,
                    maxWidth: "80%",
                    display: "inline-block",
                  }}
                >
                  {message.text}
                </Paper>
              }
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          size="small"
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
          sx={{ bgcolor: "background.default" }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}