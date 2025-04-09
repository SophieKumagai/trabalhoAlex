import React, { useEffect, useState } from 'react';
import { FaRegEnvelope, FaRegEyeSlash, FaRegEye, FaRegUserCircle, FaRegFile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

import style from './Signup.module.css';
import Loading from '../Loading/Loading.jsx';
import loadingGif from '../../assets/giphy.gif';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const login = sessionStorage.getItem("login");
    if (login) {
      navigate("/home/main");
    }
  }, [navigate]);

  function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0, remainder;

    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;

    return remainder === parseInt(cpf.charAt(10));
  }

  async function translateText ({text, targetLanguage}) {
    const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
  }

  const handleSignup = async () => {
    if (email && password && firstName && lastName && cpf && birthDate && confirmPassword) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        // CPF validation
        if (validateCPF(cpf)) {

          if (password.length < 8 || confirmPassword.length < 8) {
            setErrorMessage('A senha deve ter pelo menos 8 caracteres!');
            return;
          }

          if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem!');
            return;
          }

          setIsLoading(true);
          setErrorMessage('');

          try {
            const data = await new Promise((resolve, reject) => {
              fetch('https://expense-control-backend-8rmh.onrender.com/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id_email: email,
                  id_cpf: cpf,
                  nm_first_name: firstName,
                  nm_last_name: lastName,
                  dt_birthdate: birthDate,
                  ds_password: password
                })
              })
                .then(async (response) => {
                  if (!response.ok) {
                    response.json().then(data => {
                      const details = data.detail;
                      const errorMessages = Array.isArray(details)
                        ? details.map(item => item.msg).join(', ')
                        : details;
                      translateText({text: errorMessages, targetLanguage: 'pt'}).then(translatedText => {
                        reject(translatedText);
                      }).catch(error => {
                        reject('Erro ao traduzir a mensagem: ' + error.message);
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

            navigate("/home/main");
          } catch (error) {
            setIsLoading(false);
            setErrorMessage(error); 
          }
        } else {
          setErrorMessage('CPF inválido!');
        }
      } else {
        setErrorMessage('E-mail inválido!');
      }
    } else {
      setErrorMessage('Preencha todos os campos, por favor.');
    }
  };

  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      handleSignup()
    }
  });

  const login = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  if (isLoading) {
    return (
      <Loading img={loadingGif} />
    );
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FaRegUserCircle className={style.icon} />
            </div>
            <div className={style.inputContainer}>
              <input
                type="text"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <FaRegFile className={style.icon} />
            </div>
            <div className={style.inputContainer}>
              <input
                type="date"
                placeholder="Data de nascimento"
                value={birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setBirthDate(e.target.value)}
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
          
          <p className={errorMessage ? style.error : style.hiddenError}>{errorMessage}</p>
          <button onClick={handleSignup}>Cadastrar</button>
          <p onClick={login} className={style.login}>Já tem uma conta? Faça o login</p>
        </div>
      </div>
    );
  }
}

export default Signup;
