import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const MetricCard = ({ title, value, description, progress }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" gutterBottom>
      {value}
    </Typography>
    {progress && (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    )}
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {description}
    </Typography>
  </Paper>
);

const RecentActivity = () => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" color="primary" gutterBottom>
      Recent Activity
    </Typography>
    <List>
      {/* This would be populated with real data from your backend */}
      {[1, 2, 3].map((item) => (
        <React.Fragment key={item}>
          <ListItem>
            <ListItemText
              primary={`Query #${item}`}
              secondary={`Sample interaction ${item}`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Queries"
            value="1,234"
            description="Total number of queries processed"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Response Time"
            value="0.8s"
            description="Average response time"
            progress={80}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Accuracy"
            value="95%"
            description="Response accuracy rate"
            progress={95}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Users"
            value="42"
            description="Users currently online"
          />
        </Grid>
        <Grid item xs={12}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;