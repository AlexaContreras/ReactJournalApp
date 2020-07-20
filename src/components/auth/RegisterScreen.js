import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [formRegisterValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formRegisterValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length <= 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other'
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <div className='auth__box-image-container'>
        <img
          src='https://alphabetmedia.com.mx/wp-content/uploads/2020/02/agencia-de-diseno-web-en-mexico.png'
          alt='img-container'
        ></img>
      </div>
      <div className='auth__boxes-container-div'>
        <div className='auth__box-container'>
          <h3 className='auth__title'>Sign up</h3>
          <form onSubmit={handleRegister}>
            <input
              className='auth__input'
              type='text'
              placeholder='Name'
              name='name'
              autoComplete='off'
              onChange={handleInputChange}
              value={name}
            />

            {msgError === 'Name is required' && (
              <p className='auth__alert-error'>{msgError}</p>
            )}

            <input
              className='auth__input'
              type='text'
              placeholder='email'
              name='email'
              autoComplete='off'
              onChange={handleInputChange}
              value={email}
            />

            {msgError === 'Email is not valid' && (
              <p className='auth__alert-error'>{msgError}</p>
            )}

            <input
              className='auth__input'
              type='password'
              placeholder='Password'
              name='password'
              autoComplete='off'
              onChange={handleInputChange}
              value={password}
            />
            <input
              className='auth__input'
              type='password'
              placeholder='Confirm password'
              name='password2'
              autoComplete='off'
              onChange={handleInputChange}
              value={password2}
            />

            {msgError ===
              'Password should be at least 6 characters and match each other' && (
              <p className='auth__alert-error'>{msgError}</p>
            )}

            <button
              className='btn btn-primary btn-block mt-3 mb-3'
              type='submit'
            >
              Sign up
            </button>
          </form>
        </div>
        <div className='auth__box-container mt-5'>
          <div className='auth__box-sign-up-sign-in '>
            <p>You have an account?</p>
            <Link className='link' to='/auth/login'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
