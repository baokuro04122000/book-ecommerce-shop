import MiddleContainer from "./MiddleContainer";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect, useState } from "react";
import { actionGetAllCategory } from "../store/products/action";
import { setCategories } from "../store/products/slice";
import { getUser, selectIsAuth } from "../store/authentication/selector";
import { useGoogleLogin } from "@react-oauth/google";
import {
  actionGoogleLogin,
  actionLogin,
  actionLogout,
  actionRegisterSeller,
} from "../store/authentication/action";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actionGetCart } from "../store/cart/action";
const Header = () => {
  const categories = useAppSelector(({ products }) => products.categories);
  const user = getUser();
  const [flag, setFlag] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(actionGetAllCategory());
    return () => {
      dispatch(setCategories(null));
    };
  }, [dispatch, flag]);

  const handleSubmitForm = async (values) => {
    const email = values.target[0].value;
    const password = values.target[1].value;

    values.preventDefault();
    try {
      await dispatch(actionLogin({ email, password }));
      dispatch(actionGetCart())
      setFlag((pre) => !pre);
    } catch (error) {
      console.log("error", error);
      if(error?.message){
        toast.error(error?.message.toString(), {autoClose: 5000})
      }else{
        toast.error(error?.errors.message, {autoClose: 5000})
      }
      setFlag((pre) => !pre);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      await dispatch(actionGoogleLogin({ accessToken: res.access_token }));
      dispatch(actionGetCart())
      setFlag((pre) => !pre);
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
  });

  const handleLogout = async () => {
    try {
      await actionLogout({
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
      setFlag((pre) => !pre);
      dispatch(actionGetCart())
      toast.success('Logout successfully', {autoClose: 3000})
      console.log('login', selectIsAuth())
    } catch (error) {
      console.log("err::", error);
      localStorage.clear("authUser");
      setFlag((pre) => !pre);
    }
  };

  const handleRegisterSeller =async () => {
    try {
      const message = await actionRegisterSeller()
      toast.success(message, {autoClose: 3000})
    } catch (error) {
      if(error?.message){
        toast.error(error?.message.toString(), {autoClose: 5000})
      }else{
        toast.error(error?.errors.message, {autoClose: 5000})
      }
    }
  }

  return (
    <header id="tg-header" className="tg-header tg-haslayout">
      <div className="tg-topbar">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="tg-addnav">
                <li>
                  <a href="javascript:void(0);">
                    <i className="icon-envelope"></i>
                    <em>Contact</em>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <i className="icon-question-circle"></i>
                    <em>Help</em>
                  </a>
                </li>
              </ul>
              <div className="dropdown tg-themedropdown tg-currencydropdown">
                <a
                  href="javascript:void(0);"
                  id="tg-currenty"
                  className="tg-btnthemedropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="icon-earth"></i>
                  <span>Currency</span>
                </a>
                <ul
                  className="dropdown-menu tg-themedropdownmenu"
                  aria-labelledby="tg-currenty"
                >
                  <li>
                    <a href="javascript:void(0);">
                      <i>$</i>
                      <span>Us Dollar</span>
                    </a>
                  </li>
                </ul>
              </div>
              {selectIsAuth() ? (
                <>
                  <div className="tg-userlogin">
                    <li
                      class="dropdown"
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <a
                        href="javascript:void(0);"
                        class="dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <figure>
                          <a href="javascript:void(0);">
                            {user?.role === "seller" ? (
                              <img
                                src={user?.seller?.logo}
                                alt="image description"
                              />
                            ) : (
                              <img src={user?.avatar} alt="image description" />
                            )}
                          </a>
                        </figure>
                        {user?.role === "seller" ? (
                          <span>Hi, {user?.seller?.info?.name}</span>
                        ) : (
                          <span>Hi, {user?.name}</span>
                        )}
                      </a>

                      <ul
                        class="dropdown-menu dropdown-lr animated slideInRight"
                        role="menu"
                        style={{
                          marginTop: "60px",
                        }}
                      >
                        {user?.role === 'user' ? (
                          <li
                          className="custom-search-list"
                          style={{
                            justifyContent: "center",
                          }}
                          onClick={handleRegisterSeller}
                        >
                          <a href="javascript:void(0);">Register Seller</a>
                        </li>
                        ): (
                          <></>
                        )}
                         <li
                          className="custom-search-list"
                          style={{
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            navigate('/checkout/profile')
                          }}
                        >
                          <a href="javascript:void(0);">Profile</a>
                        </li>
                        <li
                          className="custom-search-list"
                          style={{
                            justifyContent: "center",
                          }}
                          onClick={handleLogout}
                        >
                          <a href="javascript:void(0);">Logout</a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="tg-userlogin"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={
                        process.env.REACT_APP_ADMINISTRATOR_WEB_HOST +
                        "/auth" +
                        "/sign-up"
                      }
                      tabindex="5"
                      class="btn btn-primary mb-2"
                      target="_blank"
                    >
                      Sign Up
                    </a>
                    <div id="navbar" class="collapse navbar-collapse">
                      <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                          <a
                            href="#"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            id="pin-login"
                          >
                            Log In
                          </a>
                          <ul
                            class="dropdown-menu dropdown-lr animated slideInRight"
                            role="menu"
                            style={{
                              width: "350px",
                            }}
                          >
                            <div class="col-lg-12">
                              <div class="text-center">
                                <h3>
                                  <b>Log In</b>
                                </h3>
                              </div>
                              <form
                                id="ajax-login-form"
                                role="form"
                                method="post"
                                autocomplete="off"
                                onSubmit={handleSubmitForm}
                              >
                                <div class="form-group">
                                  <label for="email">Email</label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    tabindex="1"
                                    class="form-control"
                                    placeholder="Email"
                                    autocomplete="off"
                                  />
                                </div>

                                <div class="form-group">
                                  <label for="password">Password</label>
                                  <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    tabindex="2"
                                    class="form-control"
                                    placeholder="Password"
                                    autocomplete="off"
                                  />
                                </div>

                                <div class="form-group">
                                  <div class="row">
                                    <div
                                      class="col-xs-7"
                                      style={{
                                        display: "flex",
                                      }}
                                    >
                                      <a
                                        href="#"
                                        onClick={() => {
                                          googleLogin();
                                        }}
                                      >
                                        <i
                                          class="fa fa-google-plus-square"
                                          aria-hidden="true"
                                          style={{ fontSize: "41px" }}
                                        ></i>
                                      </a>
                                    </div>
                                    <div class="col-xs-5 pull-right">
                                      <input
                                        type="submit"
                                        name="login-submit"
                                        id="login-submit"
                                        tabindex="4"
                                        class="form-control btn btn-success"
                                        value="Log In"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="text-center">
                                        <a
                                          href={
                                            process.env
                                              .REACT_APP_ADMINISTRATOR_WEB_HOST +
                                            "/auth" +
                                            "/forgot-password"
                                          }
                                          tabindex="5"
                                          class="forgot-password"
                                          target="_blank"
                                        >
                                          Forgot Password?
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* middle container */}
      <MiddleContainer  />
      <div className="tg-navigationarea">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <nav id="tg-nav" className="tg-nav">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#tg-navigation"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div
                  id="tg-navigation"
                  className="collapse navbar-collapse tg-navigation"
                >
                  <ul>
                    <li className="menu-item-has-children menu-item-has-mega-menu">
                      <a href="javascript:void(0);">All Categories</a>
                      <div className="mega-menu">
                        <ul className="tg-themetabnav" role="tablist">
                          {categories?.map((category) => (
                            <li role="presentation" className="active">
                              <a
                                href="javascript:void(0);"
                                aria-controls="artandphotography"
                                role="tab"
                                data-toggle="tab"
                                onClick={() => {
                                  navigate(
                                    "/products/category=" + category._id
                                  );
                                }}
                              >
                                {category.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li className="menu-item-has-children current-menu-item">
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Home
                      </a>
                    </li>
                    <li className="menu-item-has-children">
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          navigate("/sellers");
                        }}
                      >
                        Sellers
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          navigate("/products/all");
                        }}
                      >
                        Best Selling
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Contact</a>
                    </li>
                    <li className="menu-item-has-children current-menu-item">
                      <a href="javascript:void(0);">
                        <i className="icon-menu"></i>
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="javascript:void(0);">About Us</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
