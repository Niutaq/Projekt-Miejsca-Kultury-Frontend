import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function ViewComment({ postId, onError, onSuccess }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comment/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const res = await response.json();

        if (response.ok) {
          setComments(res);
        } else {
          Object.entries(res.errors).forEach(([key, value]) => {
            onError(value.join(', '));
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Object.entries(error).forEach(([key, value]) => {
          onError(value.join(', '));
          });
      }
    };

    fetchComments();
  }, [postId, onError]);

  const deleteComment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/comment/delete-comment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId: id })
      });

      const res = await response.json();

      if (response.ok) {
        onSuccess(res.message);
        setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
      } else {
        Object.entries(res.errors).forEach(([key, value]) => {
          onError(value.join(', '));
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateComment = async (id, newMessage) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/comment/update-comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId: id, newMessage: newMessage })
      });

      const res = await response.json();

      if (response.ok) {
        onSuccess(res.message);
        setComments((prevComments) => prevComments.map(comment => comment.id === id ? { ...comment, message: newMessage } : comment));
      }  else {
        Object.entries(res.errors).forEach(([key, value]) => {
          onError(value.join(', '));
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="comment-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="comment-box" style={{ marginTop: '20px', width: '100%', maxWidth: '600px', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
        <h3>Komentarze:</h3>
        {comments.length === 0 ? (
          <p>Brak komentarzy</p>
        ) : (
          <ul style={{ padding: '0', margin: '0', width: '100%' }}>
            {comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: '10px', listStyleType: 'none', padding: '5px', backgroundColor: '#fff', borderRadius: '3px', wordWrap: 'break-word' }}>
                <p>{comment.message}</p>
                <p><strong>{comment.name} {comment.surname}</strong></p>
                <p>{new Date(comment.dateAdded).toLocaleString()}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteComment(comment.id)}
                    style={{ marginRight: '5px' }}
                  >
                    Usuń
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const newMessage = prompt('Edytuj komentarz:', comment.message);
                      if (newMessage) {
                        updateComment(comment.id, newMessage);
                      }
                    }}
                  >
                    Edytuj
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ViewComment;



