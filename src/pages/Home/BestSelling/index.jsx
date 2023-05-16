import Product from './Product'
import Section from '../../../components/Section/Section';

const BestSelling = () => {
	
  return (
		<>
			<section className="tg-sectionspace tg-haslayout">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div className="tg-sectionhead">
								<h2><span>People’s Choice</span>Bestselling Books</h2>
								<a className="tg-btn" href="javascript:void(0);">View All</a>
							</div>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<Section>
							<Product/>
      			</Section>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default BestSelling