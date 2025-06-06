"use client";

import { useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import WelcomeSection from "./components/WelcomeSection";
import StatsOverview from "./components/StatsOverview";
import ChatInterface from "./components/ChatInterface";

export default function Home() {
  const theme = useTheme();
  const [showChat, setShowChat] = useState(false);

  return (
    <Box sx={{ py: 3 }}>
      {!showChat ? (
        <>
          <WelcomeSection />
          <Box sx={{ mt: 6 }}>
            <StatsOverview />
          </Box>
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <ChatInterface />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <StatsOverview />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}