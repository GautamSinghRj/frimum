
import { Link } from "react-router-dom";
function Success() {
  return (
    <div className="payment_success">
      <img src="https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png" loading="lazy" alt="Payment successful" />
      <h1>Payment Successfull</h1>
      <p>Thank you for your payment.<br/><br/>
      Your transaction has been completed.</p>
    <Link to="/" className="payment_btn" style={{textDecoration:"none"}}>
    <p>Go to Home</p>
    </Link>
    </div>
  );
}
export default Success;