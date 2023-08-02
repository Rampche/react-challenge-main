import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
//* todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
//* todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
//* todo - Desabilite o botão de Login equanto você está executando o login.
//* todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
//* todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginIsValid, setLoginIsValid] = useState(true);

  const handleEmail = (event) => {
    event.preventDefault();
    let newEmailData = event.target.value;
    setEmail(newEmailData);
    if ((email != '') & newEmailData.includes('@')) {
      setIsEmailValid(true);
    }
  };

  const handlePassword = (event) => {
    event.preventDefault();
    let newPasswordData = event.target.value;
    setPassword(newPasswordData);
    if (
      (isEmailValid === true) &
      (newPasswordData != '') &
      (newPasswordData.length >= 6)
    ) {
      setIsDisabled(false);
    }
  };

  const handleLogin = async () => {
    setIsDisabled(true);
    try {
      await login({ email: email, password: password });
      setLoginIsValid(true);
      alert('Login succeed!!!');
    } catch (error) {
      setLoginIsValid(false);
      setIsDisabled(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        <div className="errorMessage">
          {!loginIsValid && <p>e-mail or password wrong.</p>}
        </div>
        <div className="row">
          <label htmlFor={'email'}>Email</label>
          <input
            id={'email'}
            type={'email'}
            autoComplete="off"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="row">
          <label htmlFor={'password'}>Password</label>
          <input
            id={'password'}
            type={'password'}
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div className="button">
          <button disabled={isDisabled} onClick={() => handleLogin()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
