import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import models from '../../modelData/models';
import "./styles.css";

function TopBar() {
  const [context, setContext] = useState('');
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const path = location.pathname;
    const userId = params.userId;
  
    if (path.startsWith('/users/') && !path.startsWith('/photos/')) {
      const user = models.userModel(userId);
      if (user) {
        setContext(`User: ${user.first_name} ${user.last_name}`);
      } else {
        setContext('User not found');
      }
    } else if (path.startsWith('/photos/')) {
      const user = models.userModel(userId);
      if (user) {
        setContext(`Photos of ${user.first_name} ${user.last_name}`);
      } else {
        setContext('User not found');
      }
    } else if (path === '/users') {
      setContext('User List');
    } else {
      setContext('');
    }
  }, [location.pathname, params.userId]);
  

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Han</Typography>
        <Typography variant="h6">{context}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
