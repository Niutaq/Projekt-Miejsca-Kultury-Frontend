import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Comment({ postId, onError, onSuccess }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log('PostId:', postId);
  }, [postId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    if (!comment.trim()) {
      alert('Komentarz nie może być pusty.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/comment/add-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ placeId: postId, message: comment })
      });
      console.log(postId);
      
      const res = await response.json();
      if (response.ok) {
        setComments((prevComments) => [...prevComments, { id: res.id, message: comment }]);
        setComment('');
        onSuccess(res.message);
      } else {
        Object.entries(res.errors).forEach(([key, value]) => {
          onError(res.errors);
        });
      }
    } catch (error) {
      console.error('Error:', error);
      onError({ general: ['Wystąpił błąd podczas dodawania komentarza.'] });
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <div className="comment-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="comment-input-container" style={{ marginTop: '10px' }}>
        <TextField
          className="comment-input"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Dodaj komentarz..."
          multiline
          rows={2}
          variant="outlined"
          style={{ backgroundColor: '#f0f0f0', width: '100%' }}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <Button
          className="submit-button"
          onClick={submitComment}
          variant="contained"
          color="primary"
        >
          Wyślij
        </Button>
      </div>

      <div className="comment-box" style={{ marginTop: '20px', width: '100%', maxWidth: '600px', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
        <h3>Komentarze:</h3>
        {comments.length === 0 ? (
          <p>Brak komentarzy</p>
        ) : (
          <ul style={{ padding: '0', margin: '0', width: '100%' }}>
            {comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: '10px', listStyleType: 'none', padding: '5px', backgroundColor: '#fff', borderRadius: '3px', wordWrap: 'break-word' }}>
                {comment.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Comment;


