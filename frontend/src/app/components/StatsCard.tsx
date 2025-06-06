"use client";

import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  progress?: number;
}

function StatItem({ icon, label, value, progress }: StatItemProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Box
          sx={{
            mr: 1,
            display: "flex",
            alignItems: "center",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      {progress !== undefined && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "background.default",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
            },
          }}
        />
      )}
    </Box>
  );
}

export default function StatsCard() {
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
      <Typography variant="h6" color="primary" gutterBottom>
        Activity Overview
      </Typography>

      <StatItem
        icon={<ChatIcon />}
        label="Total Conversations"
        value="28"
        progress={75}
      />

      <StatItem
        icon={<AccessTimeIcon />}
        label="Average Response Time"
        value="1.2s"
        progress={90}
      />

      <StatItem
        icon={<AutoGraphIcon />}
        label="Satisfaction Rate"
        value="95%"
        progress={95}
      />
    </Paper>
  );
}