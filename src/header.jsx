import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginWithGoogle } from "./login";
import { auth } from "./firebase";
import { getRedirectResult } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";
import { paykey } from "./paykey";
 
function Header() {
   
const [inputValue, setInputValue] = useState("");

const postInputChange = async()=>{ 
    const res=await fetch("https://frimum.onrender.com/Song",{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'  
      },
    body: JSON.stringify({ inputValue }),     
});
const data = await res.json();  
console.log(data);
}



const stripePromise = loadStripe(paykey); 

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch('https://frimum.onrender.com/api/payment/create-checkout-session', {
      method: 'POST',
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }}
  

    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem("musicUser"));
            if (storedUser) {
                setUserImage(storedUser.photoURL);
                return;
            }

            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    const user = result.user;

                    const response = await fetch("https://frimum.onrender.com/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.displayName,
                            imgurl: user.photoURL,
                        }),
                    });

                    const userData = {
                        email: user.email,
                        name: user.displayName,
                        photoURL: user.photoURL,
                    };

                    localStorage.setItem("musicUser", JSON.stringify(userData));
                    setUserImage(user.photoURL);
                }
            } catch (err) {
                console.error("Error getting redirect result:", err);
            }
        };

        checkUser();
    }, []);

    return (
        <header>
            <div className="nav_bar">
                <Link to="/" className="home">
                    <img src="./pic/home.png" alt="Go to home" />
                </Link>
                <img
                    loading="lazy"
                    className="search_btn"
                    src="./pic/search.png"
                    alt="Search button"
                />
                <textarea
                    className="search"
                    name="search"
                    id="search"
                    rows={3}
                    cols={50}
                    placeholder="What do you want to play?"
                ></textarea>    
                <p className="support"  onClick={handlePayment}>
                    Support Us
                </p>
                <img
                    loading="lazy"
                    className="login"
                    src={userImage || "./pic/user.png"}
                    alt="Login with Google"
                    onClick={loginWithGoogle}
                />
            </div>
            <div className="nav_bar-mobile">
                    <Link to="/" className="home">
                    <img src="./pic/home.png" alt="Go to home" />
                </Link>
                
                <p className="support"  onClick={handlePayment}>
                    Support Us
                </p>
                    <img
                    loading="lazy"
                    className="login"
                    src={userImage || "./pic/user.png"}
                    alt="Login with Google"
                    onClick={loginWithGoogle}
                />
                <img
                    loading="lazy"
                    className="search_btn"
                    onClick={postInputChange}
                    src="./pic/search.png"
                    alt="Search button"
                />
                <textarea
                    className="search"
                    name="search"
                    id="search"
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={3}
                    cols={50}
                    placeholder="What do you want to play?"
                ></textarea>   
            </div>
        </header>
    );
}

export default Header;
