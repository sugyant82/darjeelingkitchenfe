import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import fireapp from '../../fireapp';

const LoginPopup = ({setShowLogin}) => {

    const auth = getAuth(fireapp);

    const {url, setToken, setUser} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);


    const handleGoogleLogin = () => {
        setLoadingGoogleLogin(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const use_r = result.user;
            handleSendTokenToBackend(use_r);
            onGoogleLogin(use_r);
          })
          .catch((error) => {
            console.error('Google login error:', error.message);
            alert("Google login failed. Please try again.");
          })
          .finally(() => {
            setLoadingGoogleLogin(false);
          });
      };
      
    
      const handleSendTokenToBackend = (use_r) => {
        use_r.getIdToken()
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
            setUser(null);
            localStorage.setItem("token",response.data.token);
            sessionStorage.setItem("user",null);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    
    }

    const onGoogleLogin = async(use_r) => {
        
        const loginUrl=url+"/api/user/login";
        const signupUrl = url+"/api/user/register";
        
        const registerData={
            email:use_r.email,
            name:use_r.displayName,
            password:"googleiam1234"
        }

        const response = await axios.post(loginUrl,registerData);
        console.log(response);
        if(response.data.success){
            setToken(response.data.token);
            setUser(use_r);
            localStorage.setItem("token",response.data.token);
            sessionStorage.setItem("user",JSON.stringify(use_r));
            setShowLogin(false);
        }
        else if (response.data.message==="User Doesn't exist"){
            console.log("user data",use_r.displayName, use_r.email);
            console.log(signupUrl);

            const responseSignup = await axios.post(signupUrl,registerData);
            console.log(responseSignup.data.success);

            if(responseSignup.data.success){
                setToken(responseSignup.data.token);
                setUser(use_r);
                localStorage.setItem("token",responseSignup.data.token);
                sessionStorage.setItem("user",JSON.stringify(use_r));
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
            <button type='submit' disabled={loadingGoogleLogin}>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-container">
                <img src={assets.google_login_button} alt="Login with Google" onClick={handleGoogleLogin}/>
                {loadingGoogleLogin && <div className="spinner"></div>}
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
