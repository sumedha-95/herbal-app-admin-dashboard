import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getOrdersByProducts = async (
  page,
  limit,
  orderBy,
) => {
  const response = await getApi()
    .get("/orders", {
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

export const approveOrder = async (orderId, data) => {
  const response = await getApi()
    .patch(`/orders/${orderId}/approve`, data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const completeOrder = async (orderId, data) => {
  const response = await getApi()
    .patch(`/orders/${orderId}/complete`, data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const rejectOrder = async (orderId, data) => {
  const response = await getApi()
    .patch(`/orders/${orderId}/reject`, data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getOrderStats = async (pharmacyId) => {
  const response = await getApi()
    .get(`/orders/pharmacies/${pharmacyId}/stats`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};


export const confirmOrder = async (orderId, data) => {
  const response = await getApi()
    .patch(`/orders/${orderId}/confirm`, data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};