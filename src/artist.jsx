import { useNavigate } from "react-router-dom";

const ArtistCard = ({ name, img }) => {
    const navigate = useNavigate();
    return (
        <div className="artists">
            <img loading="lazy" src={img} alt={name} onClick={() => navigate(`/${name}?type=artist`)}/>
            <p>{name}</p>
        </div>
    );
};
export { ArtistCard };