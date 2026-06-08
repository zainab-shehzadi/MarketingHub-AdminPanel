import { api } from '@/lib/api';
import { apiCall } from '@/lib/callApi';
import { SigninPayload, SigninResponse } from '@/types/auth';

export const authService = {
  signin: (payload: SigninPayload) => {
    return apiCall<SigninResponse>(() => api.post('/auth/signin', payload));
  },
};