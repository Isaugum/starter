import { useQuery } from '@tanstack/react-query';
import api from '@hooks/useAxios';
import { Endpoints } from '@types/enums/Endpoints.enum';

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await api.get(Endpoints.USER);
      return res?.data?.data;
    },
  });
}