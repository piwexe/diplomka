import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Alert, message } from 'antd';
import '../styles/LoginPage.css';
import {login} from "../http/userAPI"
import {observer} from "mobx-react-lite";
import { Context } from "../index";

const LoginPage = observer(() => {
    const {user} = useContext(Context)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const onFinish = async () => {
      try {
          setLoading(true);
          let data;
          data = await login(email, password);
          user.setUser(user)
          user.setIsAuth(true)
          history('/');
      } catch (e) {
          setErrorMessage(e.response.data.message);
          setTimeout(() => {
            setErrorMessage('');
          }, 4000);
      }
      finally {
          setLoading(false);
      }
    }

  return (
    <div className="login-page">
      <Form
        form={form}
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input 
            placeholder="Username"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password 
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              style={{ marginTop: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
});

export default LoginPage