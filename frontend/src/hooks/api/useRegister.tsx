import { useMutation } from '@tanstack/react-query';
import api from '@/hooks/useAxios';
import { useNavigate } from 'react-router';
import type { RegisterSchema } from '@/types/schemas/register.schema.ts';
import { Endpoints } from '@types/enums/Endpoints.enum.ts';
import { Routes } from '@types/enums/Routes.enum.ts';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const res = await api.post(Endpoints.REGISTER, data);
      return res.data;
    },
    onSuccess: () => {
      navigate(Routes.LOGIN);
    },
  });
}