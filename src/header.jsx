import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginWithGoogle } from "./login";
import { auth } from "./firebase";
import { getRedirectResult } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";
import { paykey } from "./paykey";
import { useContext } from "react";
import { MusicContext } from "./musicplayercontext";
 
function Header() {
   
const {setInputValue} = useContext(MusicContext);

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
            <div className="h-0.02vh p-16 md:h-24 xl:h-24 flex flex-col md:flex-row xl:flex-row gap-8 md:gap-24 xl:gap-24 justify-center items-center
             no-underline text-base bg-slate-950 text-slate-950 font-semibold font-(font-family: 'Circular', 'Circular Std', 'Gotham', 'Montserrat', sans-serif)">
                <img className="xl:transform -translate-x-36 w-36 md:w-64 xl:w-64 h-20" src="./pic/logo.png" alt="Logo For Frimum Music Streaming" />
                <Link to="/" className="bg-gray-500 backdrop-blur-md rounded-full">
                    <img className="w-auto h-12 scale-100 hover:scale-125 transform transition-all duration-200 ease-in-out" src="./pic/home.png" alt="Go to home" />
                </Link>
                <Link to="/srcsong">
                <img
                    loading="lazy"
                    className="relative w-auto h-8"
                    src="./pic/search.png"
                    alt="Search button"
                />
                </Link>
                     <textarea
                    style={{ backgroundColor: 'rgb(107, 114, 128)', color: 'white' }}
                    className="placeholder:text-slate-50 resize-none text-center rounded-full truncate font-medium text-xl border-none w-80 h-10 py-2 transform -translate-x-20"
                    name="search"
                    id="search"
                    rows={3}
                    cols={50}
                    onChange={(e) => setInputValue(e.target.value)}
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
        </header>
    );
}


export default Header;