import { storeFavorite } from "../../../Services/store";

const getProduct = (putProduct, id) => {
  return {
    variables: {
      id,
    },
    skip: id === undefined,
    onCompleted: async (data) => {
      // console.log("PRODUCT_DETAL", data);
      let favoriteList = await storeFavorite.get_favorite_list();
      let product = data.getProduct.product;
      if (putProduct) {
        return await putProduct(() => {
          if (
            favoriteList?.find((el) => {
              return el._id === product._id;
            })
          ) {
            return { ...product, inFavorite: true };
          }
          return product;
        });
      }
    },
    onError: (err) => {
      console.log("PRODUCT_DETAL", err);
    },
  };
};

export { getProduct };
