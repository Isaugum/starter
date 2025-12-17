import LoginForm from '@components/molecules/LoginForm/LoginForm.tsx';
import { useLogin } from '@hooks/api/useLogin.tsx';

function Login() {
  const login = useLogin();
  return <section><LoginForm submit={login} /></section>;
}

export default Login;
