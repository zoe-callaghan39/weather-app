// import React, { useState } from 'react';

// function Signup({ onSignupSuccess }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');

//     try {
//       const response = await fetch('http://localhost:5000/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Signup failed');
//       }

//       setSuccessMsg('User created successfully! You can now log in.');
//       setName('');
//       setEmail('');
//       setPassword('');

//       if (onSignupSuccess) {
//         onSignupSuccess();
//       }
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError(err.message || 'Error occurred during signup');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

//       <form onSubmit={handleSignup}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <br />
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <br />
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <br />
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Sign up</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;
