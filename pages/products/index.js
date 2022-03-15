import { useState, useMemo } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  Heading,
  Thumbnail,
  EmptyState,
  Filters,
} from "@shopify/polaris";
import store from "store-js";
import { ImageMajor } from "@shopify/polaris-icons";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useRouter } from "next/router";
import ProductList from "./ProductList.js";

/**
 * This page is accessed via '/products'
 */
const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // const [isPickerOpen, setIsPickerOpen] = useState(false);
  // Read more about Shopify API search syntax at https://shopify.dev/concepts/about-apis/search-syntax
  // const { products, loading } = useProducts({ query: queryValue });

  // router.{method} is explicitly a client-side method and SSR would crash without this window check.
  if (id) {
    if (typeof window === "object") {
      // redirect to specific product if its id is present in query params of page
      router.replace(`${router.pathname}/${id}`);
    }

    return null;
  }

  return (
    <Page title="Products">
      <Layout>
        <Layout.Section>
          <ProductList />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ProductPage;
