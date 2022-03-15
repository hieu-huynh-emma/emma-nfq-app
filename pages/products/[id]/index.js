import {
  Page,
  Layout,
  Thumbnail,
  Card,
  Stack,
  TextContainer,
  SkeletonBodyText,
  SkeletonThumbnail,
} from "@shopify/polaris";
import { Query } from "react-apollo";
import { useRouter } from "next/router";
import { generateShopifyProductGid } from "utils";
import { GET_PRODUCT_BY_ID_QUERY } from "../query.js";

const ProductDetails = () => {
  const { push, query } = useRouter();

  const { id: productId } = query;

  const shopifyProductGid = generateShopifyProductGid(productId);

  return (
    <Page title="Product Details">
      <Layout>
        <Query
          query={GET_PRODUCT_BY_ID_QUERY}
          variables={{ productId: shopifyProductGid }}
        >
          {({ data, loading, error }) => {
            if (loading)
              return (
                <Layout.Section>
                  <Card sectioned>
                    <div className="title">
                      <SkeletonBodyText lines={1} />
                    </div>
                    <div className="body">
                      <SkeletonThumbnail />
                      <div className="text">
                        <TextContainer>
                          <SkeletonBodyText lines={2} />
                        </TextContainer>
                      </div>
                    </div>
                  </Card>
                </Layout.Section>
              );

            if (error)
              return (
                <Layout.Section>
                  <Card sectioned>
                    <p>{error.message}</p>
                  </Card>
                </Layout.Section>
              );

            const product = data.product

            const productThumbnailUrl =
              product?.featuredImage?.originalSrc || "";

            return (
              <Layout.Section>
                <Card title={product.title} sectioned>
                  <Stack alignment="center">
                    <Stack.Item>
                      <Thumbnail source={productThumbnailUrl} alt="" />
                    </Stack.Item>
                  </Stack>
                </Card>
              </Layout.Section>
            );
          }}
        </Query>
      </Layout>
    </Page>
  );
};

export default ProductDetails;
