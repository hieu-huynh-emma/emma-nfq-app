import React, { useMemo, useState } from "react";
import { Query } from "react-apollo";
import {
  Frame,
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
  Toast,
  EmptyState,
  Filters,
  Layout,
} from "@shopify/polaris";
import { extractIdFromGid } from "utils";
import { GET_PRODUCTS_QUERY } from "./query.js";

const renderItem = ({ node: item }) => {
  const url = `products/${extractIdFromGid(item.id)}`;
  const thumbnailUrl = item?.featuredImage?.originalSrc || "";

  return (
    <ResourceList.Item
      id={item.id}
      url={url}
      media={<Thumbnail source={thumbnailUrl} alt={""} />}
      verticalAlignment="center"
    >
      <Stack alignment="center">
        <Stack.Item fill>
          <h3>
            <TextStyle variation="strong">{item.title}</TextStyle>
          </h3>
        </Stack.Item>
      </Stack>
    </ResourceList.Item>
  );
};

const renderEmptyStateMarkup = () => {
  <EmptyState
    heading="You don't have any products with reviews yet"
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Once you have products with reviews they will display on this page.</p>
  </EmptyState>;
};

const ProductList = () => {
  const [queryValue, setQueryValue] = useState("");

  return (
    <Query query={GET_PRODUCTS_QUERY} variables={{ query: queryValue }}>
      {({ data, loading, error }) => {
        if (error) return <div>{error.message}</div>;

        const products = data?.products?.edges ?? [];

        return (
          <Card>
            <ResourceList
              showHeader
              emptyState={renderEmptyStateMarkup}
              resourceName={{ singular: "Product", plural: "Products" }}
              items={products}
              renderItem={renderItem}
              loading={loading}
              filterControl={
                <Filters
                  filters={[]}
                  queryValue={queryValue}
                  onQueryChange={setQueryValue}
                  onQueryClear={() => setQueryValue(null)}
                />
              }
            />
          </Card>
        );
      }}
    </Query>
  );
};

export default ProductList;
