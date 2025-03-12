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
      navigate("/home/principal")
    }
  })

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);
      setErrorMessage('');
      
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("login", true)
        navigate("/home")
      }, 2000);

    } else {
      setErrorMessage('Por favor, preencha todos os campos.');
    }
  };

  const cadastro = () => {
    navigate("/cadastro")
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
          <h2>Controle Financeiro</h2>
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
              <p className={errorMessage ? style.erro : style.erroEscondido}>{errorMessage}</p>
              <button onClick={handleLogin}>Entrar</button>
              <p onClick={cadastro} className={style.cadastro}>Não tem uma conta? Cadastre-se</p>
            </>
        </div>
      </div>
    )
  }
}

export default Login;
