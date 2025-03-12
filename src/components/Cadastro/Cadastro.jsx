import React, { useEffect, useState } from 'react';
import { FaRegEnvelope, FaRegEyeSlash, FaRegEye, FaRegUserCircle, FaRegFile} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

import style from './Cadastro.module.css';
import Loading from '../Loading/Loading.jsx';
import loadingGif from '../../assets/giphy.gif';

function Cadastro() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState("");
  const [dtNascimento, setDtNascimento] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const login = sessionStorage.getItem("login")
    if (login) {
      navigate("/home")
    }
  })

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let soma = 0, resto;
  
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpf.charAt(10));
  }

  const handleCadastro = () => {
    if (email && password && nome && sobrenome && cpf && dtNascimento && confirmPassword) {
      
      // verificação e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        // verificação cpf
        if (validarCPF(cpf) === true) {
          setIsLoading(true);
          setErrorMessage('');
          
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("login", true)
            navigate("/home/principal")
          }, 2000);
        } else {
          setErrorMessage('Cpf inválido!');
        }
      } else {
        setErrorMessage('E-mail inválido!');
      }

    } else {
      setErrorMessage('Por favor, preencha todos os campos.');
    }
  };

  const login = () => {
    navigate("/")
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  if (isLoading) {
    return (
      <Loading img={loadingGif}/>
    )
  } else {
    return (
      <div className={style.background}>
        <div className={style.loginContainer}>
          <h2>Crie sua conta!</h2>
              <div className={style.container}>
                  <div className={style.inputContainer}>
                    <input
                      type="text"
                      placeholder="Nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <FaRegUserCircle className={style.icon} />
                  </div>
                  <div className={style.inputContainer}>
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      value={sobrenome}
                      onChange={(e) => setSobrenome(e.target.value)}
                    />
                    <FaRegUserCircle className={style.icon} />
                  </div>
              </div>
              <div className={style.container}>
                  <div className={style.inputContainer}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaRegEnvelope className={style.icon} />
                  </div>
              </div>
              <div className={style.container}>
                  <div className={style.inputContainer}>
                    <input
                      type="text"
                      placeholder="Cpf"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                    <FaRegFile className={style.icon} />
                  </div>
                  <div className={style.inputContainer}>
                    <input
                      type="date"
                      placeholder="Data de Nascimento"
                      value={dtNascimento}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDtNascimento(e.target.value)}
                    />
                  </div>
              </div>
              <div className={style.container}>
                  <div className={style.inputContainer}>
                      <input
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />
                      <span onClick={togglePasswordVisibility} className={style.eyeIcon}>
                      {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                      </span>
                  </div>
                  <div className={style.inputContainer}>
                      <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirmação da Senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span onClick={toggleConfirmPasswordVisibility} className={style.eyeIcon}>
                      {confirmPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                      </span>
                  </div>
              </div>
              
              <p className={errorMessage ? style.erro : style.erroEscondido}>{errorMessage}</p>
              <button onClick={handleCadastro}>Cadastrar</button>
              <p onClick={login} className={style.cadastro}>Já tem uma conta? Faça o login</p>
        </div>
      </div>
    )
  }
}

export default Cadastro;
