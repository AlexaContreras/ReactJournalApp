import React, { useEffect, useState } from 'react';
import { AuthRouter } from './AuthRouter';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setLogged(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setLogged(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setLogged]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isLogged={isLogged}
            path='/auth'
            component={AuthRouter}
          />
          <PrivateRoute
            isLogged={isLogged}
            exact
            path='/'
            component={JournalScreen}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
