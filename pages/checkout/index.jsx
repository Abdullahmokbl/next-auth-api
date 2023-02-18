import Checkout from '../../components/Checkout'
// import PaypalCheckoutButton from '../../components/PaypalCheckoutButton'
import styles from './index.module.css'

export default function checkout() {
  return (
    <div className={styles.checkout}>
      {/* <PaypalCheckoutButton /> */}
      <Checkout cart={{ price: 'price_1MbLrpB7TcbF1qgabWaY8Dy2', quantity: 1 }} />
    </div>
  )
}
