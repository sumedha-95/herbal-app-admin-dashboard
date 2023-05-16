import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const login = async (data) => {
  const response = await getApi()
    .post("/auth/login", data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(
        false,
        err.response.data,
        err.response.status,
        err.response.status
      );
    });

  return response;
};

export const register = async (data) => {
  const response = await getApi()
    .post("/auth/register", data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
