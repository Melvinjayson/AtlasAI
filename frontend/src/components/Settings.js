import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Slider,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({
    modelTemperature: 0.7,
    maxTokens: 2000,
    enableMemory: true,
    apiEndpoint: 'http://localhost:8000',
    memoryRetention: 30,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings({ ...settings, [name]: value });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setSettings({ ...settings, [name]: newValue });
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/settings', settings);
      setSnackbar({
        open: true,
        message: 'Settings saved successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving settings',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Model Configuration
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Temperature</Typography>
              <Slider
                value={settings.modelTemperature}
                onChange={handleSliderChange('modelTemperature')}
                min={0}
                max={1}
                step={0.1}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Max Tokens</Typography>
              <Slider
                value={settings.maxTokens}
                onChange={handleSliderChange('maxTokens')}
                min={100}
                max={4000}
                step={100}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Memory Settings
            </Typography>
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableMemory}
                    onChange={handleChange('enableMemory')}
                    color="primary"
                  />
                }
                label="Enable Memory"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Memory Retention (days)</Typography>
              <Slider
                value={settings.memoryRetention}
                onChange={handleSliderChange('memoryRetention')}
                min={1}
                max={90}
                marks
                valueLabelDisplay="auto"
                disabled={!settings.enableMemory}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              API Configuration
            </Typography>
            <TextField
              fullWidth
              label="API Endpoint"
              value={settings.apiEndpoint}
              onChange={handleChange('apiEndpoint')}
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="large"
              >
                Save Settings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;