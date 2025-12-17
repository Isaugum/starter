import { useMutation } from '@tanstack/react-query';
import api from '@/hooks/useAxios';
import { useNavigate } from 'react-router';
import type { RegisterSchema } from '@/types/schemas/register.schema.ts';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const res = await api.post('/auth/register', data);
      return res.data;
    },
    onSuccess: () => {
      navigate('/auth/login');
    },
  });
}