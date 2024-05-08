import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import FirstStanok from './pages/FirstStanok/FirstStanok';
import {RequireAuth} from './hoc/RequireAuth';
import LoginPage from './pages/LoginPage';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false); // Состояние для управления ошибками аутентификации
  const history = useNavigate();

  useEffect(() => {
    check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
        history(-1);
    }).catch(err => {
      setError(true); // Обработка ошибки аутентификации
      history('/login'); // Редирект на страницу логина
  }).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      } />
      <Route path="/first" element={
        <RequireAuth>
          <FirstStanok />
        </RequireAuth>
      } />
      <Route path='*' element={
        <RequireAuth>
          <Navigate to="/" replace />
        </RequireAuth>
      } />
      </Routes>
    </>

  );
});

export default App;
