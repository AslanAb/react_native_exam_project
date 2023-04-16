import { gql } from '@apollo/client';
const productFragment = `
  fragment ProductFragment on Product {
    _id
    title
    title_url
    price
    picture
    date
    currency
    user_id
    color
    price_one
    company{
      _id
    }
    wholesale_count
    status_retail
    status_wholesale
    category{
      title
      title_url
      _id
    }
  }
`
const getProduct = gql`
  ${productFragment}

  query($id: ID!) {
    getProduct(id: $id) {
      error
      msg
      attributions{
        status
        size{
          attr_param
          status
        }
      }
      product{
        ...ProductFragment
        description
        count_views
        count_favorites
        vendor_code
        company{
          _id
          name
        }
        addition_product{
          descriptions{
            name
            value
          }
          characteristics{
            name
            value
          }
        }
      }
      slider_list{
        _id
        url
      }
    }
  }
`;

const getProducts = gql`
  ${productFragment}

  query($query: QueryProdustInput) {
    getProducts(query: $query) {
      ...ProductFragment
    }
  }
`;
const productsGQL = {
  getProducts,
  getProduct
}
export default productsGQL