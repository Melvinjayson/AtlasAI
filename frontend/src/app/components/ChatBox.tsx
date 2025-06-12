"use client";

import { useState, useRef, useEffect } from "react";
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
  Button,
  Collapse,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ReplyIcon from "@mui/icons-material/Reply";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  parentId?: string | undefined;
  replies?: Message[];
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: input,
      sender: "user",
      timestamp: new Date(),
      parentId: replyTo,
      replies: [],
    };

    if (replyTo) {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const findAndAddReply = (msgs: Message[]) => {
          for (let msg of msgs) {
            if (msg.id === replyTo) {
              msg.replies = [...(msg.replies || []), newMessage];
              return true;
            }
            if (msg.replies && findAndAddReply(msg.replies)) {
              return true;
            }
          }
          return false;
        };
        findAndAddReply(updatedMessages);
        return updatedMessages;
      });
      setReplyTo(undefined);
    } else {
      setMessages(prev => [...prev, newMessage]);
    }
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text: "I'm Atlas AI, your intelligent assistant. How can I help you today?\n```python\nprint('Hello from Atlas!')\n```",
        sender: "ai",
        timestamp: new Date(),
        parentId: replyTo ? replyTo : newMessage.id,
        replies: [],
      };
      
      if (replyTo) {
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const findAndAddReply = (msgs: Message[]) => {
            for (let msg of msgs) {
              if (msg.id === replyTo) {
                msg.replies = [...(msg.replies || []), aiResponse];
                return true;
              }
              if (msg.replies && findAndAddReply(msg.replies)) {
                return true;
              }
            }
            return false;
          };
          findAndAddReply(updatedMessages);
          return updatedMessages;
        });
      } else {
        setMessages(prev => [...prev, aiResponse]);
      }
    }, 1000);
  };

  const toggleThread = (messageId: string) => {
    setExpandedThreads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const renderMessage = (message: Message, isReply = false) => (
    <Box key={message.id} sx={{ ml: isReply ? 4 : 0, mb: 1 }}>
      <ListItem
        sx={{
          flexDirection: message.sender === "user" ? "row-reverse" : "row",
          alignItems: "flex-start",
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
        <Box sx={{ maxWidth: "80%" }}>
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
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.text}
            </ReactMarkdown>
          </Paper>
          <Box sx={{ mt: 1, display: "flex", gap: 1, justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => setReplyTo(message.id)}
              sx={{ textTransform: "none" }}
            >
              Reply
            </Button>
            {message.replies && message.replies.length > 0 && (
              <Button
                size="small"
                startIcon={expandedThreads.has(message.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => toggleThread(message.id)}
                sx={{ textTransform: "none" }}
              >
                {message.replies.length} {message.replies.length === 1 ? "reply" : "replies"}
              </Button>
            )}
          </Box>
        </Box>
      </ListItem>
      {message.replies && message.replies.length > 0 && (
        <Collapse in={expandedThreads.has(message.id)}>
          {message.replies.map(reply => renderMessage(reply, true))}
        </Collapse>
      )}
    </Box>
  );

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
        Chat with Atlas AI {replyTo && "(Replying)"}
      </Typography>
      
      <List sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
        {messages.filter(m => !m.parentId).map(message => renderMessage(message))}
        <div ref={messagesEndRef} />
      </List>

      <Box sx={{ display: "flex", gap: 1 }}>
        {replyTo && (
          <Button
            size="small"
            onClick={() => setReplyTo(undefined)}
            sx={{ alignSelf: "center" }}
          >
            Cancel Reply
          </Button>
        )}
        <TextField
          fullWidth
          variant="outlined"
          placeholder={replyTo ? "Type your reply..." : "Type your message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          size="small"
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{ bgcolor: "primary.main", color: "common.white", "&:hover": { bgcolor: "primary.dark" } }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}