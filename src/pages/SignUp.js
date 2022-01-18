import React, {useState} from 'react';
import axios from "axios";
import {Link, useHistory} from 'react-router-dom';

function SignUp() {
    const [ email, setEmail ] = useState('');
    const [ username,setUsername ] = useState('');
    const [ password, setPassword ] =useState('');
    const history = useHistory();

   async function handleSubmit(e){

       e.preventDefault();
       console.log(email, username, password);

        try {
            await axios.post('http://localhost:3000/register',
                {
                email: email,
                password: password,
                username: username,
            });
            history.push('/signin');
            // console.log(result);
            } catch(e) {
            console.error(e);
        }
   }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                Email:
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                />
            </label>

            <label htmlFor="username">
                Gebruikersnaam:
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label htmlFor="password">
                Wachtwoord:
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button
                type="submit"
                className="form-button"
            >
                Registratie
            </button>
        </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;