import { useMemo, useState } from "react";
import { getSellers } from "../../../api/products";
import { useNavigate } from "react-router-dom";
const Sellers = () => {
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
      <div class="tg-widget tg-widgetblogers">
        <div class="tg-widgettitle">
          <h3>Top Sellers</h3>
        </div>
        <div
          class="tg-widgetcontent"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <ul>
            {sellers?.map((seller) => (
              <>
                <li>
                  <div class="tg-author">
                    <figure>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          navigate("/products/sellers=" + seller._id);
                        }}
                      >
                        <img src={seller.logo} alt="image description" />
                      </a>
                    </figure>
                    <div class="tg-authorcontent">
                      <h2>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/products/sellers=" + seller._id);
                          }}
                        >
                          {seller.info.name}
                        </a>
                      </h2>
                      <span>{seller.totalProduct} Books</span>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sellers;
