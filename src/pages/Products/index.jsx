import InnerBanner from "./InnerBanner";
import Products from './Products'
import Search from './SideBar/Search'
import Categories from "./SideBar/Categories";
import {Outlet} from 'react-router-dom'
const ProductsPage = () => {
  return (
    <>
      <InnerBanner />
      <main id="tg-main" class="tg-main tg-haslayout">
        <div class="container">
          <div class="row">
            <div id="tg-twocolumns" class="tg-twocolumns">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
                <Outlet/>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 pull-left">
                <aside id="tg-sidebar" class="tg-sidebar">
                  <Search/>
                  <Categories/>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
