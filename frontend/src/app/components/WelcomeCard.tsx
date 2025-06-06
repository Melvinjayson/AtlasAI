import { Paper, Typography, Box, Button, Grid } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
      <Box
        sx={{
          mr: 2,
          display: "flex",
          alignItems: "center",
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export default function WelcomeCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Welcome to Atlas AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Your intelligent AI assistant powered by advanced language models
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ChatIcon />}
          sx={{ borderRadius: 2 }}
        >
          Start Chatting
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Feature
            icon={<ChatIcon />}
            title="Natural Conversations"
            description="Engage in fluid, context-aware conversations with advanced language understanding."
          />
        </Grid>
        <Grid item xs={12}>
          <Feature
            icon={<SchoolIcon />}
            title="Continuous Learning"
            description="Atlas AI learns and adapts to provide increasingly personalized assistance."
          />
        </Grid>
        <Grid item xs={12}>
          <Feature
            icon={<BuildIcon />}
            title="Versatile Tools"
            description="Access a wide range of tools and capabilities to help with various tasks."
          />
        </Grid>
      </Grid>
    </Paper>
  );
}