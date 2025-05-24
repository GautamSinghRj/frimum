import ContentPage from "./contentpage"
import { Routes, Route  } from "react-router-dom";
import Success from "./success";
import Failed from "./failed";
import SrcSong from "./srcsong";
import Songs from "./songs";
import { AnimatePresence,motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import View from "./view";

function AnimatedRoutes() {
    const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Songs /></PageWrapper>} />
        <Route path="/:content" element={<PageWrapper><ContentPage /></PageWrapper>} />
        <Route path="/success" element={<PageWrapper><Success /></PageWrapper>} />
        <Route path="/failed" element={<PageWrapper><Failed /></PageWrapper>} />
        <Route path="/srcsong" element={<PageWrapper><SrcSong /></PageWrapper>} />
        <Route path="/view" element={<PageWrapper><View /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper=({children})=>{
   return <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.3 }}
       >
    {children}
   </motion.div>;
}
export default AnimatedRoutes;