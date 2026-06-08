import { api } from "@/lib/api";
import { apiCall } from "@/lib/callApi";
import {
  BlockUserPayload,
  BlockUserResponse,
  GetUsersParams,
  GetUsersResponse,
} from "@/types/user";

export const userService = {
  getUsers: (params: GetUsersParams) => {
    return apiCall<GetUsersResponse>(() =>
      api.get("/auth/admin/users", {
        params,
      })
    );
  },

  blockUnblockUser: (userId: string, payload: BlockUserPayload) => {
    return apiCall<BlockUserResponse>(() =>
      api.patch(`/auth/admin/users/${userId}/block`, payload)
    );
  },
};