import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function Profile() {
    const [profileData, setProfileData] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(()=> {
        async function fetchProfileData(){
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get('http://localhost:3000/660/private-content',
                    {headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }})
                setProfileData(result.data)
                console.log(profileData);
                console.log(result);
            } catch (e) {
                console.error(e)
            }
        }
        fetchProfileData();
    }, []);


  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong>{user.username}</p>
        <p><strong>Email:</strong>{user.email}</p>
      </section>
      <section>
        <h2>{profileData.title}</h2>
        <p>{profileData.content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;