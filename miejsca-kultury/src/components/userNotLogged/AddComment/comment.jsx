import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddComment() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const dataToSend = {
    placeId: token,
    message: comment,
  };

  const submitComment = async () => {
    if (!comment.trim()) {
      alert('Komentarz nie może być pusty');
      return;
    }

    const placeId = "...";

    try {
      const response = await fetch('http://localhost:5000/api/comments/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ placeId, comment })
      });

      const responseStatus = response.status;
      if (responseStatus === 401) {
        toast.error('Nie można wykonać takiej operacji');
        return;
      }

      const res = await response.json();
      if (response.ok) {
        toast.success(`${res.message}`);
        setComments((prevComments) => [...prevComments, comment]);
        setComment('');
      } else {
        Object.entries(res.errors).forEach(([key, value]) => {
          toast.error(value.join(', '));
        });
      }
    } catch (error) {
      toast.error('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

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
                {comment}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AddComment;

