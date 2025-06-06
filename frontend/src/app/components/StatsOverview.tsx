"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  alpha,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  Message as MessageIcon,
  Timer as TimerIcon,
  Star as StarIcon,
} from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  progress?: number;
}

function StatCard({ title, value, change, icon, progress }: StatCardProps) {
  const theme = useTheme();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount((prev) => Math.min(prev + stepValue, value));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        backdropFilter: "blur(6px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ my: 1 }}>
              {count.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TrendingUpIcon
                sx={{
                  color:
                    change >= 0
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                  transform: change >= 0 ? "none" : "rotate(180deg)",
                }}
              />
              <Typography
                variant="body2"
                color={change >= 0 ? "success.main" : "error.main"}
              >
                {Math.abs(change)}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                ml: "auto",
              }}
            >
              {icon}
            </Box>
          </Grid>
        </Grid>

        {progress !== undefined && (
          <Box sx={{ mt: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  bgcolor: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default function StatsOverview() {
  const stats = [
    {
      title: "Total Conversations",
      value: 2847,
      change: 12,
      icon: <MessageIcon />,
      progress: 75,
    },
    {
      title: "Average Response Time",
      value: 1.5,
      change: -8,
      icon: <TimerIcon />,
      progress: 65,
    },
    {
      title: "User Satisfaction",
      value: 98,
      change: 5,
      icon: <StarIcon />,
      progress: 98,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid key={stat.title} item xs={12} md={4}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
}