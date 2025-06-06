"use client";

import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  AutoAwesome as AutoAwesomeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        backdropFilter: "blur(6px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
        {description}
      </Typography>
    </Card>
  );
}

export default function WelcomeSection() {
  const theme = useTheme();

  const features = [
    {
      icon: <AutoAwesomeIcon />,
      title: "Smart Conversations",
      description:
        "Experience natural and context-aware conversations powered by advanced AI technology.",
    },
    {
      icon: <SpeedIcon />,
      title: "Real-time Responses",
      description:
        "Get instant answers to your questions with our lightning-fast response system.",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure & Private",
      description:
        "Your conversations are protected with enterprise-grade security and encryption.",
    },
    {
      icon: <PsychologyIcon />,
      title: "Continuous Learning",
      description:
        "Our AI system learns and adapts to provide increasingly accurate and relevant responses.",
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 800,
          mx: "auto",
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          Welcome to Atlas AI
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Experience the future of AI-powered conversations with our advanced
          natural language processing system.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            },
          }}
        >
          Start Chatting
        </Button>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid key={feature.title} item xs={12} sm={6} md={3}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}