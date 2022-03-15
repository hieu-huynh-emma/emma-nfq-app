import gql from "graphql-tag";

export const GET_PRODUCTS_QUERY = gql`
  query getProducts($query: String) {
    products(first: 110, query: $query) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          featuredImage {
            id
            originalSrc
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query getProductById($productId: ID!) {
    product(id: $productId) {
      id
      title
      handle
      descriptionHtml
      featuredImage {
        id
        originalSrc
      }
    }
  }
`;
