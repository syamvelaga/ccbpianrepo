import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Navbar = props => {
  const {cartCount} = props
  return (
    <nav>
      <h1>UNI Resto Cafe</h1>
      <div className="cartDetails">
        <p>My Cart</p>
        <div className="cartContainer">
          <AiOutlineShoppingCart className="cartIcon" />
          <span className="cartCount">{cartCount}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
