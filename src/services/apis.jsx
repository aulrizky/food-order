import instance from "./axiosConfig";

const baseUrl = import.meta.env.VITE_API_URL;
const apiLogin = import.meta.env.VITE_API_LOGIN_URL;
const apiRegister = import.meta.env.VITE_API_REGISTER_URL;
const apiFoods = import.meta.env.VITE_API_GET_FOODS_URL;
const apiAddCart = import.meta.env.VITE_API_ADD_CART_URL;
const apiAddFavorites = import.meta.env.VITE_API_ADD_FAVORITE_URL;
// const apiRemoveCart = import.meta.env.VITE_API_DELETE_CART_URL;
// const apiGetFoodDetails = import.meta.env.VITE_API_GET_FOODS_DETAIL_URL;

const buildUrl = (base, params) => {
  let url = base + "?";
  for (const key in params) {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  }
  // Remove the trailing '&'
  url = url.slice(0, -1);
  return url;
};

export const userLogin = (username, password) => {
  return instance
    .post(apiLogin, { username: username, password: password })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const userRegister = (formData) => {
  console.log(formData);
  return instance
    .post(apiRegister, formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getFoods = (
  pageNumber,
  pageSize,
  sortBy,
  foodName,
  categoryId
) => {
  const apiUrl = buildUrl(apiFoods, {
    pageNumber,
    pageSize,
    sortBy,
    foodName,
    categoryId,
  });
  return instance
    .get(apiUrl)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const postAddToCart = (foodId) => {
  console.log(foodId);
  return instance
    .post(apiAddCart, { foodId: foodId })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const putFavorite = (foodId) => {
  console.log(foodId);
  const url = apiAddFavorites.replace("{foodId}", foodId);
  return instance
    .put(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const deleteCart = (foodId) => {
  console.log(foodId);
  // const url = apiRemoveCart.replace("{foodId}", foodId);
  return instance
    .delete(`${apiAddCart}/${foodId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
export const getFoodDetail = (foodId) => {
  // const url = apiGetFoodDetails.replace("{foodId}", foodId);
  return instance
    .get(`${apiFoods}/${foodId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getMyCart = async () => {
  const apiurl = `${baseUrl}/food-order/cart`;
  return instance
    .get(apiurl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

// checkout makanan
export const checkoutCart = async (payload) => {
  const apiurl = `${baseUrl}/food-order/cart/checkout`;
  return (
    instance
      .post(apiurl, payload)
      // .return((response) => {
      //   return response;
      // })
      .catch((error) => {
        console.log(error);
        throw error;
      })
  );
};

// history
export const historyCart = async (pageNumber, pageSize, sortBy) => {
  const apiUrl = `${baseUrl}/food-order/history`;
  const build = buildUrl(apiUrl, { pageNumber, pageSize, sortBy });
  return instance
    .get(build)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const myFavorites = async (
  pageNumber,
  pageSize,
  sortBy,
  foodName,
  categoryId
) => {
  const apiurl = `${baseUrl}/food-order/foods/my-favorite-foods`;
  const BuildUrl = buildUrl(apiurl, {
    pageNumber,
    pageSize,
    sortBy,
    foodName,
    categoryId,
  });
  return instance
    .get(BuildUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const putQty = async (qty, cartId) => {
  const apiurl = `${baseUrl}/food-order/cart/${cartId}`;
  return instance
    .put(apiurl, { qty: qty })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
