import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';

function CommentSection({ comments, compact = false }) {
  return (
    <List>
      {comments.map((comment, index) => (
        <Box key={index} sx={{ mb: 2 }}> {/* Add margin bottom for spacing */}
          <ListItem
            alignItems="flex-start"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle gray background
              borderRadius: '4px', // Optional: adds rounded corners
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Slightly darker on hover
              },
            }}
          >
            <ListItemAvatar>
              <Avatar alt={comment.author} src={comment.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    {comment.author}
                  </Typography>
                  {!compact && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {` - ${comment.projectName} - ${comment.taskName}`}
                    </Typography>
                  )}
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {compact ? comment.text.substring(0, 50) + '...' : comment.text}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {` - ${new Date(comment.date).toLocaleString()}`}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Box>
      ))}
    </List>
  );
}

export default CommentSection;
