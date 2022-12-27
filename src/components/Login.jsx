import React from 'react'
import Api from '../api/Api'
import './Login.css'

export default function({onReceive}){
    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup()
        console.log('Result:', result)
        if(result) {
            onReceive(result.user)
        } else {
            alert("Erro!")
        }
    }
    return (
        <div className="login">
            <button onClick={handleFacebookLogin}>Logar com Facebook</button>
        </div>
    )
}