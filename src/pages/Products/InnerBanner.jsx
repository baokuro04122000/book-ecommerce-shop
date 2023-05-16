import { useParams, useNavigate } from "react-router-dom";
const InnerBanner = () => {
  const { params } = useParams();

  const navigate = useNavigate();

  return (
    <>
      {params?.split('=')[0] === "authors" ? (
        <>
          <div
            class="tg-innerbanner tg-haslayout tg-parallax tg-bginnerbanner"
            data-z-index="-100"
            data-appear-top-offset="600"
            data-parallax="scroll"
            data-image-src="images/parallax/bgparallax-07.jpg"
          >
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="tg-innerbannercontent">
                    <h1>Authors</h1>
                    <ol class="tg-breadcrumb">
                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          home
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/products/authors");
                          }}
                        >
                          Authors
                        </a>
                      </li>
                      <li class="tg-active">{params.split("?")[1]}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : params?.split('=')[0] === "sellers" ? (
        <>
          <div
            class="tg-innerbanner tg-haslayout tg-parallax tg-bginnerbanner"
            data-z-index="-100"
            data-appear-top-offset="600"
            data-parallax="scroll"
            data-image-src="images/parallax/bgparallax-07.jpg"
          >
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="tg-innerbannercontent">
                    <h1>Sellers</h1>
                    <ol class="tg-breadcrumb">
                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          home
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/products/sellers");
                          }}
                        >
                          Sellers
                        </a>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            class="tg-innerbanner tg-haslayout tg-parallax tg-bginnerbanner"
            data-z-index="-100"
            data-appear-top-offset="600"
            data-parallax="scroll"
            data-image-src="/images/parallax/bgparallax-07.jpg"
          >
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="tg-innerbannercontent">
                    <h1>All Products</h1>
                    <ol class="tg-breadcrumb">
                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          home
                        </a>
                      </li>
                      <li class="tg-active">Products</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InnerBanner;
