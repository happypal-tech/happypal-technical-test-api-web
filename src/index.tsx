import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { apolloClient } from '@graphql/client';

import { AuthProvider } from '@hooks/auth/auth.hooks';

import './index.scss';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <Router>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </Router>
  </StrictMode>,
  document.getElementById('app-root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
