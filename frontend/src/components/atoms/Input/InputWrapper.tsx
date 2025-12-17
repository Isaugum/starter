import ErrorMessage from '@/components/atoms/ErrorMessage/ErrorMessage.tsx';

interface InputWrapperProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

function InputWrapper({ label, error, children }: InputWrapperProps) {
  return (
    <div className={'flex flex-col w-full my-2'}>
      {label && <label className={'ml-3 text-sm opacity-50'}>{label}</label>}
      {children}
      {error && <ErrorMessage text={error} />}
    </div>
  );
}

export default InputWrapper;
