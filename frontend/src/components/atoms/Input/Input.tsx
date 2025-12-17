import InputWrapper from '@/components/atoms/Input/InputWrapper.tsx';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'textarea' | 'time' | string;
}

function Input({ label, placeholder, value, onChange, error, type }: InputProps) {
  if (type === 'textarea') {
    return (
      <InputWrapper label={label} error={error}>
        <textarea
          value={value}
          placeholder={placeholder ?? ''}
          className="w-full backdrop-blur-xs rounded-md shadow-lg bg-zinc-300/10 py-2 px-4 text-xl mt-2 min-h-[200px]"
          onChange={(e) => onChange(e.target.value)}
        />
      </InputWrapper>
    );
  }

  if (type === 'date') {
    return (
      <InputWrapper label={label} error={error}>
        <input
          type={'date'}
          placeholder={placeholder ?? ''}
          className={
            'w-full backdrop-blur-xs rounded-md shadow-lg bg-zinc-300/10 py-2 px-4 text-xl mt-2'
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputWrapper>
    );
  }

  if (type === 'time') {
    return (
      <InputWrapper label={label} error={error}>
        <input
          type={'time'}
          placeholder={placeholder ?? ''}
          className={
            'w-full backdrop-blur-xs rounded-md shadow-lg bg-zinc-300/10 py-2 px-4 text-xl mt-2'
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputWrapper>
    );
  }

  return (
    <InputWrapper label={label} error={error}>
      <input
        type={type ?? 'text'}
        value={value}
        placeholder={placeholder ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={
          'w-full backdrop-zinc-300/10 backdrop-blur-xs rounded-md shadow-lg bg-zinc-300/10 py-2 px-4 text-xl mt-2'
        }
      />
    </InputWrapper>
  );
}

export default Input;
