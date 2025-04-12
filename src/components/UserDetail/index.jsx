import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import models from '../../modelData/models';
import { Typography, Card, CardContent, Button } from '@mui/material';
import "./styles.css";

function UserDetail() {
  const { userId } = useParams(); // Lấy userId từ URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = models.userModel(userId);
    setUser(foundUser);
  }, [userId]);

  if (!user) return <Typography>Loading user info...</Typography>;

  return (
    <Card sx={{ maxWidth: 600, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
        <Typography variant="body1"><strong>Occupation:</strong> {user.occupation}</Typography>
        <Typography variant="body1"><strong>Description:</strong> {user.description}</Typography>

        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to={`/photos/${user._id}`} 
          sx={{ marginTop: 2 }}
        >
          Xem ảnh của {user.first_name}
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
