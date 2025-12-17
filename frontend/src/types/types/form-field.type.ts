import type {FieldValues, Path} from 'react-hook-form';

export type FormField<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    type?: 'text' | 'email' | 'password';
    delay?: number;
};
