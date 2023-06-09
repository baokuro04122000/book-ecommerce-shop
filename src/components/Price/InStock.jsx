import {inStock} from '../../helpers/utils'
const InStock = ({product}) => {
  const status = inStock(product)
  return (
    <>
      {
        status === 'paperBack' ? 
        (<em>In Stock</em>) :
        status === 'kindle' ?
        (
          <em>In Stock E-Book</em>
        ):
        (
          <em>Out Of Stock</em>
        )
      }
    </>
  )
}

export default InStock