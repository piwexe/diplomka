import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);

root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Context.Provider>
);

reportWebVitals(console.log);
 