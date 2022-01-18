import React, {useContext, useState} from 'react';
import { Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";


function SignIn() {
    const { login } = useContext(AuthContext); //{login} komt uit AuthContext
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] =useState('');

    async function handleSubmit(e){
        e.preventDefault()
        console.log(email);
        console.log(password);
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
            });
            console.log(result.data) //komt de accesToken uit
            login(result.data.accessToken); //geven we de accesToken aan de login
        } catch (e) {
            console.error(e);
            // console.log(e.response); //geeft in Backend (in Console) welke fout er precies is
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

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
              type="submit">
              Inloggen
          </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;