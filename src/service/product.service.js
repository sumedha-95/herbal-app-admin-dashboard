import { getApi, getApiForFormData } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const createProduct = async (data) => {
  console.log("data", data);
  const { file } = data;

  const formData = new FormData();
  formData.append("strigifiedBody", JSON.stringify(data));
  formData.append("file", file);

  const response = await getApiForFormData()
    .post("/products/", formData)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      console.log("errr", err.response.data);
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getPaginatedProducts = async (page, limit, orderBy) => {
  const response = await getApi()
    .get("/products", {
      params: {
        page,
        limit,
        orderBy,
      },
    })
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const updateProducts = async (productId, data) => {
  const response = await getApi()
    .patch(`/products/${productId}`, data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const deleteProducts = async (productId) => {
  const response = await getApi()
    .delete(`/products/${productId}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const findById = async (productId) => {
  const response = await getApi()
    .get(`/products/${productId}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getSelfPaginatedProducts = async (page, limit, orderBy) => {
  const response = await getApi()
    .get("/products", {
      params: {
        page,
        limit,
        orderBy,
      },
    })
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
