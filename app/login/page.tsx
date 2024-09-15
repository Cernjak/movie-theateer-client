'use client';

import Form from '../components/common/Form/Form';
import Input from '../components/common/Input/Input';
import { useUser } from '../core/context/user.context';
import { isEmail } from '../core/helpers';
import useInput from '../core/hooks/useInput';

const Login = () => {
  const { login } = useUser();
  const email = useInput({
    validation: isEmail,
  });
  const password = useInput({
    validation: (e) => {
      return e.trim().length > 4;
    },
  });

  const handleSubmit = () => {
    login({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <section className="login">
      <div className="wrap">
        <div className="login__container">
          <h1 className="h1">Login</h1>
          <Form onSubmit={handleSubmit} inputs={[email, password]}>
            <Input
              input={email}
              type="text"
              label="Email:"
              name="email"
              id="email-field"
              emptyMsg="Please fill in your email address"
              errorMsg="Email not valid"
            />
            <Input
              input={password}
              type="password"
              label="Password:"
              name="password"
              id="password-field"
              emptyMsg="Please fill in your email password"
              errorMsg="Password not valid"
            />
            <button type="submit">Send</button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
