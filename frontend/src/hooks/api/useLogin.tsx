import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { LoginSchema } from '@/types/schemas/login.schema.ts';
import { useAuthStore } from '@store/auth.store.ts';
import api from '@hooks/useAxios.ts';
import { Endpoints } from '@types/enums/Endpoints.enum.ts';
import { Routes } from '@types/enums/Routes.enum.ts';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const res = await api.post(Endpoints.LOGIN, data);
      return res.data;
    },
    onSuccess: (data) => {
      login(data?.data);
      navigate(Routes.HOME);
    },
    onError: () => {

    },
  });
}