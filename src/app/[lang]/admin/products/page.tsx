import CurrentView from "./_components/CurrentView";
import ProductFormDrawer from "./_components/ProductFormDrawer";
import ProductPageHeader from "./_components/ProductPageHeader";

const ProductsPage = () => {
  return (
    <>
      <ProductPageHeader />
      <CurrentView />
      <ProductFormDrawer />
    </>
  );
};

export default ProductsPage;
