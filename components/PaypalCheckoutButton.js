import { PayPalButtons } from '@paypal/react-paypal-js'

export default function paypalCheckoutButton() {
  return (
    <PayPalButtons
      onClick={(data, actions) => console.log('jjjjj')}
      createOrder={(data, actions) => {
        return actions.order.create({ purchase_units: [{ description: 'dff', amount: { value: '2.33' } }] })
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(details => {
          const name = details.payer.name.given_name
          alert(`Transaction completed by ${name}`)
        })
      }}
      onCancel={() => console.log('cancelllllll')}
      onError={err => {
        alert(err)
      }}
    />
  )
}
