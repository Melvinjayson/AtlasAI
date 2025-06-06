"use client";

import { useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { theme } from "./theme-config";
import DashboardLayout from "./components/DashboardLayout";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ClerkProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header handleDrawerToggle={handleDrawerToggle} />
            <DashboardLayout>{children}</DashboardLayout>
          </Box>
        </Box>
      </ThemeProvider>
    </ClerkProvider>
  );
}