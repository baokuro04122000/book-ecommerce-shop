import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ProductsPage from "../pages/Products";
const Layout = ({ page }) => {
  return (
    <div className="tg-home tg-homeone">
      <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
        <Header />

        {page === "products" ? (
          <ProductsPage />
        ) : (
          <Outlet />
        )}

        {/* footer here */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
