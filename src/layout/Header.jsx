import MiddleContainer from "./MiddleContainer"
import {useAppDispatch, useAppSelector} from '../store'
import {useEffect} from 'react';
import { actionGetAllCategory } from "../store/products/action";
import { setCategories } from "../store/products/slice";
const Header = () => {

	const categories = useAppSelector(({products}) => products.categories)

	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(actionGetAllCategory())
		return () => {
			dispatch(setCategories(null))
		}
	}, [dispatch])
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
								<a href="javascript:void(0);" id="tg-currenty" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i className="icon-earth"></i>
									<span>Currency</span>
								</a>
								<ul className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-currenty">	
									<li>
										<a href="javascript:void(0);">
											<i>$</i>
											<span>Us Dollar</span>
										</a>
									</li>
								</ul>
							</div>
							<div className="tg-userlogin">
								<figure><a href="javascript:void(0);"><img src="images/users/img-01.jpg" alt="image description"/></a></figure>
								<span>Hi, John</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* middle container */}
      <MiddleContainer/>
			<div className="tg-navigationarea">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<nav id="tg-nav" className="tg-nav">
								<div className="navbar-header">
									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#tg-navigation" aria-expanded="false">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
								</div>
								<div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
									<ul>
										<li className="menu-item-has-children menu-item-has-mega-menu">
											<a href="javascript:void(0);">All Categories</a>
											<div className="mega-menu">
												<ul className="tg-themetabnav" role="tablist">
													{categories?.map(category => (
														<li role="presentation" className="active">
															<a href="#artandphotography" aria-controls="artandphotography" role="tab" data-toggle="tab">{category.name}</a>
														</li>
													))}
												</ul>
											</div>
										</li>
										<li className="menu-item-has-children current-menu-item">
											<a href="javascript:void(0);">Home</a>
										</li>
										<li className="menu-item-has-children">
											<a href="javascript:void(0);">Authors</a>
										</li>
										<li><a href="products.html">Best Selling</a></li>
										<li><a href="products.html">Weekly Sale</a></li>
										<li className="menu-item-has-children">
											<a href="javascript:void(0);">Latest News</a>
											<ul className="sub-menu">
												<li><a href="newslist.html">News List</a></li>
												<li><a href="newsgrid.html">News Grid</a></li>
												<li><a href="newsdetail.html">News Detail</a></li>
											</ul>
										</li>
										<li><a href="contactus.html">Contact</a></li>
										<li className="menu-item-has-children current-menu-item">
											<a href="javascript:void(0);"><i className="icon-menu"></i></a>
											<ul className="sub-menu">
												<li><a href="aboutus.html">About Us</a></li>
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
  )
}

export default Header;