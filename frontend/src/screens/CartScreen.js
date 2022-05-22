import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  let recproducts=products.length > 32 ? products.slice(0,32) : products;
  let arr=[]

  recproducts.map((item,index) => arr[index]=item._id);
  const n = 5;
  const sample = arr
  .map(x => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(a => a.x)
  .slice(0, n);

  recproducts=[]
  sample.map((item1,index) => {
    recproducts[index]=products.filter(item => item._id==item1)
  })

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const removeFromCartHandler = (id) => {
    console.log('this ran')
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div className='cartScreen-outer'>
      <button
        style={{ marginBottom: '10px', background: 'rgb(97,63,153)' }}
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
      <div className='cartScreen-inner'>
        <div className='cartScreen-left'>
          <span style={{ fontSize: '20px', textTransform: 'uppercase' }}>
            Your Shopping Cart
          </span>
          <br />
          <br />
          {cartItems.length < 1 ? (
            <span>You have not added any items to cart</span>
          ) : (
            cartItems.map((item) => (
              <>
                <div className='cart-controller' key={item.product}>
                  <Link
                    to={`/category/${item.category}/${item.subCategory}/${item.product}`}
                  >
                    <img src={item.image} alt='' />
                  </Link>
                  <span>{item.name}</span>
                  <span>Rs. {item.price}</span>

                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                    name=''
                    id=''
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <i
                    onClick={() => removeFromCartHandler(item.product)}
                    className='fas fa-trash'
                  ></i>
                </div>
                <div
                  style={{ marginLeft: '10px', width: '70%' }}
                  className='underline'
                ></div>
              </>
            ))
          )}
        </div>
        <div className='cartScreen-right'>
          <span>
            SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            ITEMS
          </span>
          <span>
            Rs.{' '}
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}{' '}
          </span>
          <button
            className='checkout-btn'
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      <div className="spacer70"></div>
      <div className='recommend-card'>
        <a href='https://www.google.com/'>
          <div className="head-left"
          >RECOMMENDED PRODUCTS FOR YOU!</div>
        </a>
      </div>
      <div style={{flexDirection:'row'}}>
      <div className='container1' style={{width:'100%'}}>
          <div className='shopping-items' style={{display:'flex', flexDirection:'row'}}>
            {recproducts  && 
              recproducts.map((item) => (
                <ProductCard key={item[0]._id} product={item[0]} />
              ))}
          </div>
          
        </div>
      </div>
      
      <div className="spacer70"></div>
    </div>

   
  )
}

export default CartScreen
