import Title from '@/components/atoms/Title/Title.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import type { RegisterSchema } from '@/types/schemas/register.schema.ts';
import { registerSchema } from '@/types/schemas/register.schema.ts';
import Form from '@components/molecules/Form/Form.tsx';
import Anchor from '@components/atoms/Anchor/Anchor.tsx';

interface RegisterFormProps {
  title?: string;
  submit: UseMutationResult<unknown, Error, RegisterSchema, unknown>;
  submitButtonText?: string;
  onSuccess?: () => void;
}

const REGISTER_FIELDS = [
  [
    {
      type: 'text',
      label: 'Username',
      name: 'username',
    },
  ],
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

function RegisterForm({ submit, submitButtonText = 'Register' }: RegisterFormProps) {

  return (
    <section id="register-form" className="h-full pb-20 w-full flex flex-col justify-center items-center">
      <Title text={'Register'} />
      <div className={'max-w-[300px]'}>
        <Form schema={registerSchema}
              defaultValues={{ username: '', email: '', password: '' }}
              fields={REGISTER_FIELDS}
              submit={submit}
              submitButtonText={submitButtonText}
        />
      </div>
      <Anchor linkTo={'/auth/login'}>
        Already a user? Login here!
      </Anchor>
    </section>
  );
}

export default RegisterForm;