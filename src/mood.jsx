import { useNavigate } from "react-router-dom";

const MoodCard = ({ title, img, description }) => {
    const navigate = useNavigate();

    return ( 
        <div className="moods" onClick={() => navigate(`/${title}`)}>
            <img loading="lazy" src={img} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export { MoodCard };
