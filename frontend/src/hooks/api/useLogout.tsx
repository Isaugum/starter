import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@store/auth.store.ts';
import api from '@hooks/useAxios.ts';
import { Endpoints } from '@types/enums/Endpoints.enum.ts';
import { Routes } from '@types/enums/Routes.enum.ts';

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await api.post(Endpoints.LOGOUT);
    },
    onSuccess: () => {
      logout();
      navigate(Routes.LOGIN);
    },
    onError: () => {

    },
  });
}