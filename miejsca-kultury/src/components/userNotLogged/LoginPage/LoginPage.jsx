import React, { useState } from "react";
import './LoginSingup.css'

import user_icon from '../Icons/person.png'
import email_icon from '../Icons/email.png'
import password_icon from '../Icons/password.png'

const LoginSignup = () => {

    const[action,setAction]=useState("Rejestracja");

    return(
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
    
            <div className="inputs">
                {action==="Logowanie"?<div></div>:<div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Imie" />
                </div>}

                {action==="Logowanie"?<div></div>:<div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Nazwisko" />
                </div>}
                
                
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" />
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Hasło" />
                </div>

                {action==="Logowanie"?<div></div>:<div className="input">
                    <img src={password_icon} alt="" />
                    <input type="text" placeholder="Powtorz hasło" />
                </div>}

            </div>
            
            {action==="Rejestracja"?<div></div>:<div className="forgot-password">Zapomniałeś hasła? <span>Kilknij tutaj</span></div>}

            <div className="submit-container">
                <div className={action==="Logowanie"?"submit gray":"submit"} onClick={()=>{setAction("Rejestracja")}}>Zarejerestruj się</div>
                <div className={action==="Rejestracja"?"submit gray":"submit"} onClick={()=>{setAction("Logowanie")}}>Zaloguj się</div>
            </div>
        </div>
    )
}

export default LoginSignup