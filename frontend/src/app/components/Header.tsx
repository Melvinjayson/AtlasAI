"use client";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

export default function Header({ handleDrawerToggle }: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(6px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Tooltip title="Search">
            <IconButton
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                },
              }}
            >
              <Badge
                badgeContent={4}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    right: -3,
                    top: 3,
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              cursor: "pointer",
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.12),
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
              }}
            >
              M
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2">Melvin Ogbalu</Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}