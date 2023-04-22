import { getApi, getApiForFormData} from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

// export const createProduct = async (data) => {
//   const response = await getApi()
//     .post("/products/", data)
//     .then((res) => {
//       return buildResponse(true, res.data);
//     })
//     .catch((err) => {
//       return buildResponse(false, err.response.data, err.response.status);
//     });

//   return response;
// };

export const createProduct = async (data) => {
  const { stringifiedBody, file } = data;

  const formData = new FormData();
  formData.append("stringifiedBody", JSON.stringify(stringifiedBody));
  formData.append("file", file);

  const response = await getApi()
    .post("/products/", formData)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });
  return response;
};


export const getPaginatedProducts = async (page,limit,orderBy) => {
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
