import MiddleContainer from "./MiddleContainer";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { actionGetAllCategory } from "../store/products/action";
import { setCategories } from "../store/products/slice";
import { selectIsAuth } from "../store/authentication/selector";
import { useGoogleLogin } from '@react-oauth/google'
import { actionGoogleLogin, actionLogin } from '../store/authentication/action'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const categories = useAppSelector(({ products }) => products.categories);
  const user = useAppSelector(({ authentication }) => authentication.authUser);
  const dispatch = useAppDispatch();
	const navigate = useNavigate()
  useEffect(() => {
    dispatch(actionGetAllCategory());
    return () => {
      dispatch(setCategories(null));
    };
  }, [dispatch]);

  const handleSubmitForm =async (values) => {
		const email = values.target[0].value;
		const password = values.target[1].value

		values.preventDefault();
		try {
			await dispatch(actionLogin({email, password}))
		} catch (error) {
			console.log('error', error)
		}
  };

	const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      await dispatch(actionGoogleLogin({accessToken: res.access_token}))
    },
    onError: (errorResponse) => {
      console.log(errorResponse)
    },
  })
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
              <div className="tg-userlogin">
                {selectIsAuth() ? (
                  <>
                    <figure>
                      <a href="javascript:void(0);">
                        <img
                          src="/images/users/img-01.jpg"
                          alt="image description"
                        />
                      </a>
                    </figure>
                    <span>Hi, John</span>
                  </>
                ) : (
                  <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                     
                      <li class="dropdown">
                        <a
                          href="#"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Log In
                        </a>
                        <ul
                          class="dropdown-menu dropdown-lr animated slideInRight"
                          role="menu"
													style={{
														width: '350px'
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
                                  <div class="col-xs-7" style={{
																		display:'flex'
																	}}>
																		<a 
																			href="#"
																			onClick={() => {googleLogin()}}
																			>
																			<i 
																				class="fa fa-google-plus-square" 
																				aria-hidden="true"
																				style={{    fontSize: '41px'}}
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
                                        href={process.env.REACT_APP_ADMINISTRATOR_WEB_HOST+'/auth' + '/forgot-password'}
                                        tabindex="5"
                                        class="forgot-password"
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* middle container */}
      <MiddleContainer />
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
																	navigate('/products/category='+ category._id)
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
                      <a href="javascript:void(0);" onClick={() => {
                        navigate('/')
                      }}>Home</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0);" onClick={()=> {
                        navigate('/sellers')
                      }}>Sellers</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" onClick={() => {
                        navigate('/products/all')
                      }}>Best Selling</a>
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
