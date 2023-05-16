import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSellers } from "../../api/products";

const Seller = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();
  useMemo(() => {
    getSellers()
      .then(({ data }) => {
        setSellers(data.data);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  }, []);

  return (
    <>
      <div class="tg-authorsgrid">
        <div class="container">
          <div class="row">
            <div class="tg-authors">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="tg-sectionhead">
                  <h2>
                    <span>Strong Minds Behind Us</span>Most Popular Sellers
                  </h2>
                </div>
              </div>
              {sellers?.map((seller) => (
                <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                  <div class="tg-author">
                    <figure>
                      <a href="javascript:void(0);" onClick={()=> {
                        navigate('/products/sellers='+ seller._id)
                      }}>
                        <img src={seller.logo} alt="image description" />
                      </a>
                    </figure>
                    <div class="tg-authorcontent">
                      <h2>
                        <a href="javascript:void(0);" onClick={()=> {
                        navigate('/products/sellers='+ seller._id)
                      }}>{seller.info.name}</a>
                      </h2>
                      <span>{seller.totalProduct} Books</span>
                      <ul class="tg-socialicons">
                        <li class="tg-facebook">
                          <a href="javascript:void(0);">
                            <i class="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li class="tg-twitter">
                          <a href="javascript:void(0);">
                            <i class="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li class="tg-linkedin">
                          <a href="javascript:void(0);">
                            <i class="fa fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Seller;
