import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSellersTop3 } from "../api/products";
import {scrollTop} from '../helpers/utils'
const Footer = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector("#tg-btnbacktotop").addEventListener("click", ()=> {window.scrollTo({ top: 0, behavior: 'smooth' });})
    getSellersTop3()
      .then(({ data }) => {
        setSellers(data.data);
      })
      .catch((err) => {
        console.log("err seller top 3::", err);
      });
  }, []);
  return (
    <footer id="tg-footer" className="tg-footer tg-haslayout">
      <div className="tg-footerarea">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="tg-clientservices">
                <li className="tg-devlivery">
                  <span className="tg-clientserviceicon">
                    <i className="icon-rocket"></i>
                  </span>
                  <div className="tg-titlesubtitle">
                    <h3>Fast Delivery</h3>
                    <p>Shipping Worldwide</p>
                  </div>
                </li>
                <li className="tg-discount">
                  <span className="tg-clientserviceicon">
                    <i className="icon-tag"></i>
                  </span>
                  <div className="tg-titlesubtitle">
                    <h3>Open Discount</h3>
                    <p>Offering Open Discount</p>
                  </div>
                </li>
                <li className="tg-quality">
                  <span className="tg-clientserviceicon">
                    <i className="icon-leaf"></i>
                  </span>
                  <div className="tg-titlesubtitle">
                    <h3>Eyes On Quality</h3>
                    <p>Publishing Quality Work</p>
                  </div>
                </li>
                <li className="tg-support">
                  <span className="tg-clientserviceicon">
                    <i className="icon-heart"></i>
                  </span>
                  <div className="tg-titlesubtitle">
                    <h3>24/7 Support</h3>
                    <p>Serving Every Moments</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tg-threecolumns">
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="tg-footercol">
                  <strong className="tg-logo">
                    <a href="javascript:void(0);">
                      <img src="/images/flogo.png" alt="image description" />
                    </a>
                  </strong>
                  <ul className="tg-contactinfo">
                    <li>
                      <i className="icon-apartment"></i>
                      <address>
                        01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí
                        Minh
                      </address>
                    </li>
                    <li>
                      <i className="icon-phone-handset"></i>
                      <span>
                        <em>0329460523</em>
                      </span>
                    </li>
                    <li>
                      <i className="icon-clock"></i>
                      <span>Serving 7 Days A Week From 9am - 5pm</span>
                    </li>
                    <li>
                      <i className="icon-envelope"></i>
                      <span>
                        <em>
                          <a href="mailto:support@domain.com">
                            19110168@student.hcmute.edu.vn
                          </a>
                        </em>
                      </span>
                    </li>
                  </ul>
                  <ul className="tg-socialicons">
                    <li className="tg-facebook">
                      <a href="javascript:void(0);">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="tg-twitter">
                      <a href="javascript:void(0);">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="tg-linkedin">
                      <a href="javascript:void(0);">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li className="tg-googleplus">
                      <a href="javascript:void(0);">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li className="tg-rss">
                      <a href="javascript:void(0);">
                        <i className="fa fa-rss"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="tg-footercol tg-widget tg-widgetnavigation">
                  <div className="tg-widgettitle">
                    <h3>Shipping And Help Information</h3>
                  </div>
                  <div className="tg-widgetcontent">
                    <ul>
                      <li>
                        <a href="javascript:void(0);">Terms of Use</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Terms of Sale</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Returns</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Privacy</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Cookies</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Contact Us</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Our Affiliates</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Vision &amp; Aim</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="javascript:void(0);">Our Story</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Meet Our Team</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">FAQ</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Testimonials</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Join Our Team</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="tg-footercol tg-widget tg-widgettopsellingauthors">
                  <div className="tg-widgettitle">
                    <h3>Top 3 Sellers</h3>
                  </div>
                  <div className="tg-widgetcontent">
                    <ul>
                      {sellers?.map((seller) => (
                        <>
                          <li>
                            <figure
                              style={{
                                maxWidth: "69px",
                              }}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigate("/products/sellers=" + seller?._id);
                                }}
                              >
                                <img
                                  src={seller?.logo}
                                  alt="image description"
                                />
                              </a>
                            </figure>
                            <div className="tg-authornamebooks">
                              <h4>
                                <a
                                  href="javascript:void(0);"
                                  onClick={() => {
                                    navigate("/products/sellers=" + seller?._id);
                                  }}
                                >
                                  {seller?.info?.name}
                                </a>
                              </h4>
                              <p>{seller?.totalProduct} Books</p>
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tg-newsletter">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <h4>Signup Newsletter!</h4>
              <h5>
                Consectetur adipisicing elit sed do eiusmod tempor incididunt.
              </h5>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <form className="tg-formtheme tg-formnewsletter">
                <fieldset>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Your Email ID"
                  />
                  <button type="button">
                    <i className="icon-envelope"></i>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="tg-footerbar">
        <a
          id="tg-btnbacktotop"
          className="tg-btnbacktotop"
          href="javascript:void(0);"
          onClick={()=>{
            scrollTop()
          }}
        >
          <i className="icon-chevron-up"></i>
        </a>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <span className="tg-paymenttype">
                <img src="/images/paymenticon.png" alt="image description" />
              </span>
              <span className="tg-copyright">
                2023 All Rights Reserved By &copy; Book Library - Dinh Bao
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
