import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function ViewComment({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/fced6f57-f356-4875-bf61-b1b3acf219cb`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const res = await response.json();
        const message = JSON.stringify(res);
        const messageToDisplay = JSON.parse(message);

        if (response.ok) {
          setComments(res);
        } else {
          toast.error(`${messageToDisplay.title}`);
          Object.entries(res.errors).forEach(([key, value]) => {
            toast.error(value.join(', '));
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Object.entries(error).forEach(([key, value]) => {
            toast.error(value.join(', '));
          });
      }
    };

    fetchComments();
  }, [postId]);

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
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewComment;

