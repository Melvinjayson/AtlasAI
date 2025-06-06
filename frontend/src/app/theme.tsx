"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme-config";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}