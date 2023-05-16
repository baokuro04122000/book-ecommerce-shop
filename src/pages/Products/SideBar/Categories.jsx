import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store'
import { setCategoriesAmount } from '../../../store/products/slice';
import { actionGetAllCategoriesAmount, actionGetProducts } from '../../../store/products/action';
import {useNavigate} from 'react-router-dom'

const Categories = () => {
  const categories = useAppSelector(({products}) => products.categoriesAmount)
  const [onCategory, setOnCategory] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(actionGetAllCategoriesAmount())
    return () => {
      dispatch(setCategoriesAmount(null))
    }
  }, [])

  const handleClickCategory =async (categoryId) => {
    navigate('/products/category='+ categoryId)
    setOnCategory(categoryId)
  }
  return (
    <>
      <div className="tg-widget tg-catagories">
        <div className="tg-widgettitle">
          <h3>Categories</h3>
        </div>
        <div className="tg-widgetcontent">
          <ul>
            {categories?.map((category) => (

              <li className={onCategory === category._id ? "tg-widgettitle-active" : ''} >
                <a href="javascript:void(0);" onClick={() => {
                  handleClickCategory(category._id)
                }}>
                  <span>{category.name}</span>
                  <em>{category.products}</em>
                </a>
              </li>

            ))}
            <li className={onCategory === '' ? "tg-widgettitle-active" : ''}>
              <a href="javascript:void(0);" onClick={async() => {
                  await dispatch(actionGetProducts('page=1&limit=8'))
                  setOnCategory('')
                  navigate('/products/all')
                }}>
                <span>View All</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Categories;
