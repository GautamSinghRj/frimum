import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { paykey } from "./paykey";
import { useContext } from "react";
import { MusicContext } from "./musicplayercontext";
import { useNavigate } from "react-router-dom"; 

function Header() {
   const navigate = useNavigate();
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
  

    return (
        <header>
           <div className="fixed top-0 left-0 z-40 w-full h-24 p-4 md:p-8 flex flex-col md:flex-row  gap-4 items-center justify-between bg-slate-950 text-white">
                <img className="xl:transform -translate-x-36 w-36 md:w-42 xl:w-64 h-20" src="./pic/logo.png" alt="Logo For Frimum Music Streaming" />
                <Link to="/" className="transform md:translate-x-10 xl:translate-x-60  rounded-full" style={{ backgroundColor: '#1E1E1E'}}>
                    <img className="w-auto h-12 scale-100 hover:scale-125 transform transition-all duration-200 ease-in-out" src="./pic/home.png" alt="Go to home" />
                </Link>
                <Link to="/srcsong" className="z-50 translate-y-6 md:translate-y-0 xl:translate-y-0 -translate-x-32 md:translate-x-20 transform xl:translate-x-20">
                <img
                    loading="lazy"
                    className="relative w-auto h-8"
                    src="./pic/search.png"
                    alt="Search button"
                />
                </Link>
                     <textarea
                    style={{ backgroundColor: '#1E1E1E', color: 'white' }}
                    className="placeholder-white resize-none text-center rounded-full truncate font-medium text-xl border-none 
                    w-80 h-10 pl-4 py-8 xl:py-2 transform -translate-y-10 md:translate-y-0 xl:translate-y-0 transform xl:-translate-x-36"
                    name="search"
                    id="search"
                    rows={3}
                    cols={50}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            navigate("/srcsong");
                        }
                    }}
                    placeholder="What do you want to play?"
                ></textarea> 
                <Link to="/auth">
                 <img
                    loading="lazy"
                    className="transform -translate-y-8 xl:-translate-y-0 xl:-translate-x-80 ml-2 w-12 h-12 hover:scale-110 transform transition-all duration-200 ease-in-out"
                    src="./pic/user.png"
                    alt="Login or Sign Up"
                />
                </Link>
                <div className="transform -translate-y-8 xl:translate-y-0 p-2 text-center rounded-full w-40 scale-100 hover:scale-110 transform transition-all duration-200 ease-in-out"
                        style={{ backgroundColor: 'white',}}>
                     <p onClick={handlePayment} style={{ cursor: 'pointer', color:'black' }} className="font-extrabold">
                    Support Us
                </p>
                 </div>   
            </div>
        </header>
    );
}


export default Header;
