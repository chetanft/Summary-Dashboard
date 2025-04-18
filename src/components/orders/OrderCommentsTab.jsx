import React from 'react';
import { Box, Typography, Avatar, Paper, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const CommentItem = ({ comment }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" color="text.secondary">
        {comment.time}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Avatar 
          sx={{ 
            bgcolor: '#FFC107', 
            width: 32, 
            height: 32, 
            fontSize: '0.875rem',
            mr: 1.5
          }}
        >
          {comment.user.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{comment.user}</Typography>
          <Typography variant="body2">{comment.comment}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const OrderCommentsTab = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Box>
        <Typography sx={{ mb: 3 }}>No comments yet</Typography>
        <CommentForm />
      </Box>
    );
  }

  return (
    <Box>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      <CommentForm />
    </Box>
  );
};

const CommentForm = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        placeholder="Add a comment..."
        multiline
        rows={3}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          endIcon={<SendIcon />}
          size="small"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default OrderCommentsTab;
