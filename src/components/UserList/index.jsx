import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import models from '../../modelData/models'; 
import { List, ListItem, ListItemText } from '@mui/material';
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = models.userListModel();
    setUsers(userList);
  }, []);

  return (
    <div>
      <List>
        {users.map((user) => (
          <ListItem 
            key={user._id}
            component={Link}
            to={`/users/${user._id}`}
            button
          >
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;

