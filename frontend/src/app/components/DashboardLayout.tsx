"use client";

import { Box, Paper, Grid, useTheme, alpha } from "@mui/material";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        backgroundImage: `radial-gradient(${alpha(
          theme.palette.primary.main,
          0.1
        )} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1400,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: `0 0 20px ${alpha(theme.palette.common.black, 0.05)}`,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              p: { xs: 2, md: 4 },
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 100%)`,
            }}
          >
            {children}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}