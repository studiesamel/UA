import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState (false);
  const [pseudo, setPseudo] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [trustedEmail, setTrustedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const trustedEmailError = document.querySelector('.trustedEmail.error');
    const passwordError = document.querySelector('.password.error');
    const secretAnswerError = document.querySelector('.secretAnswer.error');
    const questionError = document.querySelector('.question.error');
    const passwordConfirmError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error');

    passwordConfirmError.innerHTML = '';
    termsError.innerHTML = '';

    if (password !== controlPassword || !terms.checked) {
      if ( password !== controlPassword ) passwordConfirmError.innerHTML = "passwords doesn't match";
      if (!terms.checked) termsError.innerHTML = "please agree terms and conditions"
    } else {
     
      await axios (
        {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          trustedEmail,
          secretAnswer,
          secretQuestion,
          password
        }
      })
      .then((res) => {
        if (res.data.errors) {
          pseudoError.innerHTML= res.data.errors.pseudo;
          emailError.innerHTML= res.data.errors.email;
          trustedEmailError.innerHTML= res.data.errors.trustedEmail;
          passwordError.innerHTML= res.data.errors.password;
          secretAnswerError.innerHTML= res.data.errors.secretAnswer;
          questionError.innerHTML= res.data.errors.question;
        } else setFormSubmit (true);
      })
      .catch((err) => console.log(err));
    }

  };

  return (
    <>
    {formSubmit ? (
      <>
      <SignInForm/>
      <span></span>
      <h4 className="success">Enregistred succesfuly, please login.</h4>
      </>
    ) : (
      <form action='' onSubmit={handleRegister} id='sign-up-form'>
      <label htmlFor='pseudo'>Nom d'utilisateur</label>
      <br/>
      <input type='text' name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo}/>
      <div className='pseudo error'></div>
      <br/>
      <label htmlFor='email'>Email</label>
      <br/>
      <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
      <div className='email error'></div>
      <br/>
      <label htmlFor='password'>Mot de passe</label>
      <br/>
      <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
      <div className='password error'></div>
      <br/>
      <label htmlFor='password-conf'> Confirmation mot de passe</label>
      <br/>
      <input type='password' name='password' id='password-confirm' onChange={(e) => setControlPassword(e.target.value)} value={controlPassword}/>
      <div className='password-confirm error'></div>
      <br/>
      <h4 className="hint">Security section</h4>
      <br/>
      <label htmlFor='email'>Email de récupération</label>
      <br/>
      <input type='text' name='temail' id='temail' onChange={(e) => setTrustedEmail(e.target.value)} value={trustedEmail}/>
      <div className='trustedEmail error'></div>
      <br/>
      <label htmlFor='secretQuestion'>Question secrète</label>
      <br/>
      <input type='text' name='secretQuestion' id='secretQuestion' onChange={(e) => setSecretQuestion(e.target.value)} value={secretQuestion}/>
      <div className='secretQuestion error'></div>
      <br/>
      <label htmlFor='answer'>Réponse secrète</label>
      <br/>
      <input type='password' name='answer' id='secretAnswer' onChange={(e) => setSecretAnswer(e.target.value)} value={secretAnswer}/>
      <div className='secretAnswer error'></div>
      <br/>
      <input type='checkbox' id='terms' />
      <label htmlFor='terms'>J'ai lu et j'accepte
      <a href='/' target='_blank' rel='noopener noreferrer'> vos conditions</a>
      </label>
      <div className='terms error'></div>
      <input type='submit' value="Validate" />
    </form>
    )}
     </>
    
  );
};

export default SignUpForm;