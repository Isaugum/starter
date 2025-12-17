import Title from '@/components/atoms/Title/Title.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import { loginSchema, type LoginSchema } from '@/types/schemas/login.schema.ts';
import Form from '@components/molecules/Form/Form.tsx';
import Anchor from '@components/atoms/Anchor/Anchor.tsx';

const LOGIN_FIELDS = [
  [
    {
      type: 'text',
      label: 'Email',
      name: 'email',
    },
  ],
  [
    {
      type: 'password',
      label: 'Password',
      name: 'password',
    },
  ],
];

interface LoginFormProps {
  submit: UseMutationResult<unknown, Error, LoginSchema, unknown>;
  submitButtonText?: string;
  onSuccess?: () => void;
}

function LoginForm({ submit, submitButtonText = 'Login' }: LoginFormProps) {
  return (
    <section id="login-form" className="h-full pb-20 w-full flex flex-col justify-center items-center">
      <Title text={'Login'} />
      <div className={'max-w-[300px]'}>
        <Form schema={loginSchema}
              defaultValues={{ email: '', password: '' }}
              fields={LOGIN_FIELDS}
              submit={submit}
              submitButtonText={submitButtonText}
        />
      </div>
      <Anchor linkTo={'/auth/register'}>
        No account yet? Register here!
      </Anchor>
    </section>
  );
}

export default LoginForm;