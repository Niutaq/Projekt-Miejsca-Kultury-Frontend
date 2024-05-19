import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(formRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 })
      .to(formRef.current, { scale: 1.02, duration: 0.5, yoyo: true, repeat: 1 })
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/send-reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Email został wysłany.");
      } else {
        setMessage("Wystąpił błąd. Spróbuj ponownie.");
      }
    } catch (error) {
      setMessage("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  const handleInvalid = (event) => {
    event.target.setCustomValidity('Proszę wprowadzić poprawny adres email');
  };

  const handleInput = (event) => {
    event.target.setCustomValidity('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2>Zmiana hasła</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={handleInvalid}
          onInput={handleInput}
          required
          style={{ padding: '10px', marginBottom: '10px' }}
          placeholder="Wprowadź swój email"
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Wyślij email
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;