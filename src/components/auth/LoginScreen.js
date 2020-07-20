import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  startLoginEmailPassword,
  startGoogleLogin,
  startFacebookLogin,
} from '../../actions/auth';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password.length < 5) {
      dispatch(setError('Password should be at least 6 characters'));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  const { msgError } = useSelector((state) => state.ui);

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const handleFacebookLogin = () => {
    dispatch(startFacebookLogin());
  };

  return (
    <>
      <div className='auth__box-image-container'>
        <img
          src='https://drivingclick.com/wp-content/uploads/2018/03/manejo-de-redes-sociales.png'
          alt='img-container'
        ></img>
      </div>
      <div className='auth__boxes-container-div'>
        <div className='auth__box-container'>
          <h3 className='auth__title'>JournalApp</h3>
          <form
            onSubmit={handleLogin}
            className='animate__animated animate__fadeIn animate__faster'
          >
            <input
              className='auth__input'
              type='text'
              placeholder='email'
              name='email'
              autoComplete='off'
              value={email}
              onChange={handleInputChange}
            />
            {msgError === 'Email is not valid' && (
              <p className='auth__alert-error'>{msgError}</p>
            )}
            <input
              className='auth__input'
              type='password'
              placeholder='password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            {msgError === 'Password should be at least 6 characters' && (
              <p className='auth__alert-error'>{msgError}</p>
            )}
            <button
              className='btn btn-primary btn-block'
              type='submit'
              disabled={loading}
            >
              Sign in
            </button>

            <div className='auth__social-networks'>
              <div className='google-btn mb-6' onClick={handleGoogleLogin}>
                <div className='google-icon-wrapper mr-2'>
                  <i className='fa fa-google' aria-hidden='true'></i>
                </div>
                <div className=''>
                  <p>Connect with google</p>
                </div>
              </div>
              <div className='facebook-btn  mt-6' onClick={handleFacebookLogin}>
                <div className='facebook-icon-wrapper mr-2'>
                  <i className='fa fa-facebook-square' aria-hidden='true'></i>
                </div>
                <div className=''>
                  <p>Connect with facebook</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='auth__box-container mt-5'>
          <div className='auth__box-sign-up-sign-in '>
            <p>You do not have an account?</p>
            <Link className='link' to='/auth/register'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
