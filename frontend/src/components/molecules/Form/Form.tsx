import { Controller, useForm, UseFormProps } from 'react-hook-form';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodObject, ZodRawShape } from 'zod';
import type { UseMutationResult } from '@tanstack/react-query';

import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';
import InputGroup from '@/components/molecules/InputGroup/InputGroup';
import type { FormField } from '@types/types/form-field.type.ts';
import type { ZodTypeAny } from 'zod/v3';
import Spinner from '@components/atoms/Spinner/Spinner.tsx';

interface BaseFormProps<T> {
  schema: ZodObject<ZodRawShape>;
  defaultValues: T;
  fields: FormField<T>[][];
  submit: UseMutationResult<unknown, Error, T, unknown>;
  submitButtonText?: string;
  onSuccess?: () => void;
}

function Form<T extends Record<string, ZodTypeAny>>({
                                                      schema,
                                                      defaultValues,
                                                      fields,
                                                      submit,
                                                      submitButtonText = 'Submit',
                                                      onSuccess,
                                                    }: BaseFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  } as UseFormProps<T>);

  const onSubmit = async (values: T) => {
    try {
      await submit.mutateAsync(values);
      onSuccess?.();
    } catch (err) {
      console.error('Form submit failed:', err);
    }
  };

  return (
    <section className="h-full py-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((group, groupIndex) => (
          <InputGroup
            key={`form-input-${groupIndex}`}
            delay={groupIndex * 0.2}
          >
            {group.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={form.control}
                render={({ field: fieldCtrl, fieldState }) => (
                  <Input
                    type={field.type}
                    label={field.label}
                    value={fieldCtrl.value ?? ''}
                    onChange={fieldCtrl.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            ))}
          </InputGroup>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: fields.length * 0.2 }}
          className="flex justify-end mt-4"
        >
          <Button type="submit" disabled={submit.isPending}>
            {submit.isPending ? <Spinner /> : submitButtonText}
          </Button>
        </motion.div>
      </form>
    </section>
  );
}

export default Form;