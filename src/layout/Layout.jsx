import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ProductsPage from "../pages/Products";
import {GoogleOAuthProvider} from '@react-oauth/google'
const Layout = ({ page }) => {
  return (
    <div className="tg-home tg-homeone">
      <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
      <GoogleOAuthProvider clientId='782585478907-b8t4h88cdv4bu0kh0t2uq5d2ahr0dlgi.apps.googleusercontent.com'>
        <Header />
      </GoogleOAuthProvider>

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
