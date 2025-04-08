import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import fireapp from '../../fireapp';

const LoginPopup = ({setShowLogin}) => {

    const [user, setUser] = useState(null);
    const auth = getAuth(fireapp);

    const {url, setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            setUser(user);
            handleSendTokenToBackend(user);
            onGoogleLogin(user);
          })
          .catch((error) => {
            console.error('Google login error:', error.message);
          });
      };
    
      const handleSendTokenToBackend = (user) => {
        user.getIdToken()
          .then((idToken) => {
            fetch('https://darjeelingkitchenbe.onrender.com/verifyToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: idToken }),
            })
            .then(response => response.json())
            .then(dat => console.log('✅ Backend verified:', dat.decodedToken.name,dat.decodedToken.email))
            .catch(error => console.error('❌ Error:', error));
          })
          .catch(error => console.error('❌ Error getting ID token:', error));
      };


    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event) => {
        event.preventDefault();
        let newUrl=url;
        if(currState==="Login"){
            newUrl +="/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    
    }

    const onGoogleLogin = async(user) => {
        
        const loginUrl=url+"/api/user/login";
        const signupUrl = url+"/api/user/register";
        
        const registerData={
            email:user.email,
            name:user.displayName,
            password:process.env.GOOGLE_USER_PWD
        }

        const response = await axios.post(loginUrl,registerData);
        console.log(response);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else if (response.data.message==="User Doesn't exist"){
            console.log("user data",user.displayName, user.email);
            console.log(signupUrl);

            const responseSignup = await axios.post(signupUrl,registerData);
            console.log(responseSignup.data.success);

            if(responseSignup.data.success){
                setToken(responseSignup.data.token);
                localStorage.setItem("token",responseSignup.data.token);
                setShowLogin(false);
            }
            else{
                alert(responseSignup.data.message);
            }
        }
        
    
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
            <div className="login-popup-input">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-container">
                <img src={assets.google_login_button} alt="Login with Google" onClick={handleGoogleLogin}/>
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"?
            <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")} >Login here</span></p>
            }   
            </form>
        </div>
    )
}

export default LoginPopup
