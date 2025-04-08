import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaEyeSlash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

import style from './Login.module.css';
import Loading from '../Loading/Loading.jsx';
import loadingGif from '../../assets/giphy.gif';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const login = sessionStorage.getItem("login")
    if (login) {
      navigate("/home")
    }
  })

  async function translateText ({text, targetLanguage}) {
    const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
  }

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        const data = await new Promise((resolve, reject) => {
          fetch('https://expense-control-backend-8rmh.onrender.com/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_email: email,
              ds_password: password
            })
          })
            .then((response) => {
              if (!response.ok) {
                response.json().then(data => {
                  const details = data.detail;
                  const errorMessages = Array.isArray(details)
                    ? details.map(item => item.msg).join(', ')
                    : details;
                  translateText({text: errorMessages, targetLanguage: 'pt'}).then(translatedText => {
                    reject(translatedText); 
                  }).catch(error => {
                    reject('Erro ao traduzir a mensagem: ' + error);
                  });
                });
              } else {
                response.json().then(data => { 
                  sessionStorage.setItem("login", data.id);
                  resolve(data);
                });
              }
            })
            .catch((error) => {
              reject('Erro na requisição: ' + error.message);
            });
        });

        navigate("/home");
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error); 
      }

    } else {
      setErrorMessage('Preencha todos os campos, por favor.');
    }
  };

  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      handleLogin()
    }
  });

  const register = () => {
    navigate("/register")
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (isLoading) {
    return (
      <Loading img={loadingGif}/>
    )
  } else {
    return (
      <div className={style.background}>
        <div className={style.loginContainer}>
          <h2>Financial Control</h2>
            <>
              <div className={style.inputContainer}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FaEnvelope className={style.icon} />
              </div>
              <div className={style.inputContainer}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={togglePasswordVisibility} className={style.eyeIcon}>
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <p className={errorMessage ? style.error : style.hiddenError}>{errorMessage}</p>
              <button onClick={handleLogin}>Login</button>
              <p onClick={register} className={style.register}>Não tem uma conta? Cadastre-se</p>
            </>
        </div>
      </div>
    )
  }
}

export default Login;
