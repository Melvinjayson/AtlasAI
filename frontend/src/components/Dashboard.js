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

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 3, height: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>Recent Activity</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
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
      {activities.map((activity) => (
        <React.Fragment key={item}>
          <ListItem sx={{
            '&:hover': {
              bgcolor: 'action.hover',
              borderRadius: 1
            }
          }}>
            <ListItemText
              primary={activity.type}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    {activity.description}
                  </Typography>
                  <br />
                  <Typography component="span" variant="caption" color="text.secondary">
                    {new Date(activity.timestamp).toLocaleString()}
                  </Typography>
                </React.Fragment>
              }
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