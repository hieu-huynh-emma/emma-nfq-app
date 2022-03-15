import { Heading, Page } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import Products from "./products";
import { Link } from "../components/index.js";


export default function Index() {
  return (
    <Page>
      <Heading>
        <Link url="/products">Products</Link>
      </Heading>
    </Page>
  );
}
