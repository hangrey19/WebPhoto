import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import models from '../../modelData/models';
import { Typography, Card, CardContent, CardMedia, Divider } from '@mui/material';
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const userPhotos = models.photoOfUserModel(userId);
    setPhotos(userPhotos);
  }, [userId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); // Format dễ đọc: "dd/mm/yyyy, hh:mm:ss"
  };

  if (photos.length === 0) {
    return <Typography>No post yet.</Typography>;
  }

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginTop: 3 }}>
          <CardMedia
            component="img"
            height="400"
            image={`/images/${photo.file_name}`}
            alt="User photo"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              🕒 {formatDate(photo.date_time)}
            </Typography>

            {/* Hiển thị comment nếu có */}
            {photo.comments && photo.comments.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1">💬 Comment:</Typography>
                {photo.comments.map((comment) => (
                  <div key={comment._id} style={{ marginBottom: '10px' }}>
                    <Typography variant="body2">
                      <Link to={`/users/${comment.user._id}`}>
                        <strong>{comment.user.first_name} {comment.user.last_name}</strong>
                      </Link> - 🕓 {formatDate(comment.date_time)}
                    </Typography>
                    <Typography variant="body2">{comment.comment}</Typography>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
