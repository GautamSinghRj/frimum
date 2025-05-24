
import { Link } from "react-router-dom";
function Failed() {
  return (
    <div className="payment_failed">
      <img src="https://cdn.printme.online/wp-content/uploads/2020/04/payment_fail_icon.png" loading="lazy" alt="Payment failed" />
      <h1>Payment Cancelled</h1>
      <p>Looks like you cancelled the payment.<br/><br/>
      Try again if you want!</p>
      <Link to="/" className="payment_btn" style={{textDecoration:"none"}}>
        <p>Go to Home</p>
      </Link>
    </div>
  );    
}
export default Failed;