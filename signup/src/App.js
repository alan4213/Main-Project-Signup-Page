import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ethers,BrowserProvider} from "ethers";
import './App.css';


const AccountCreationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [account, setAccount] = useState('');
  const [url, setUrl] = useState('');
  const [Aboutme, setAboutme] = useState('');
  const [imageURL, setImageURL] = useState('');
  const[name,setName]=useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);


  useEffect(() => {
    if (isButtonClicked && isMetamaskConnected) {
      // Fetch user data from API and update state
      axios
        .get('http://localhost:3000/')
        .then(response => {
          setUsername(response.data.name.formatted);
          setEmail(response.data.emails[0].value);
          setContact(response.data.ims[0].value);
          setAccount(response.data.accounts[0].username);
          setUrl(response.data.urls[0].value);
          setAboutme(response.data.aboutMe);
          setImageURL(response.data.thumbnailUrl);
          setName(response.data.displayName);
          
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [isButtonClicked, isMetamaskConnected]);
  async function connect(){
  const provider = new ethers.BrowserProvider(window.ethereum);
// Prompt user for account connections
await provider.send("eth_requestAccounts", []);
setIsMetamaskConnected(true);}




  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleContactChange = e => {
    setContact(e.target.value);
  };
  const handleAccountChange = e => {
    setAccount(e.target.value);
  };
  const handleUrlChange = e => {
    setUrl(e.target.value);
  };
  const handleAboutme = e => {
    setAboutme(e.target.value);
   
  };
 
  

  const handleSubmit = e => {
    e.preventDefault();
    
    setIsButtonClicked(true);
   
    setUsername('');
    setEmail('');
    setContact('');
    setAccount('');
    setUrl('');
    setAboutme('');
  };
  //document.getElementById("display").innerHTML=setName;

  return (
    <div>
      <h1 className='text-center p-4 text-white text-2xl'>Create a New Account</h1>
      
      
      <form onSubmit={handleSubmit}>
      <div className="profile-icon">
      <img src={imageURL} alt="Profile" id="image"/>
      
        
</div>
   <h2 className="text-white" style={{ textAlign: 'center',marginTop:5,fontSize: "20px",marginBottom:-15,fontWeight: 'bold'  }}>{name}</h2>
        <label className='mt-5 text-white' htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label className='text-white' htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label className='text-white' htmlFor="contact">Contacts:</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={handleContactChange}
        />
        <label className='text-white' htmlFor="account">Accounts:</label>
        <input
          type="text"
          id="account"
          value={account}
          onChange={handleAccountChange}
        /><label className='text-white' htmlFor="url">Urls:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={handleUrlChange}
        /><label className='text-white' htmlFor="Aboutme">About me:</label>
        <input
          type="textbox"
          id="Aboutme"
          value={Aboutme}
          onChange={handleAboutme}
        />
         

        <button className='bg-[#1DB954] text-white' type="submit" id="nft" onClick={connect}>
          Sign up Using NFT
        </button>
      </form>
  <style>{`
       body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #0d0d0d;
        margin-top: 10px;
      }
      h1{
        margin-bottom:-50px;
        font-weight: bold;
      }
      form {
        display: flex;
        flex-direction: column;
        width : 500px;
        background-color: #fff;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
        background-color: #2a2a2a;
      }
      
      label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
      }
      
      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }
      
      button {
        padding: 10px 20px;
        border: 2px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }
      button:hover {
        color: black;
      }
      
      .profile-icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #e9e9e9;
        display: flex;
        justify-content: center;
        margin: auto;
        overflow: hidden;
        padding: 10px;
        margin-top: 10px;
      }
      
      .profile-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
        
      `}</style>
</div>
);
};

export default AccountCreationPage;