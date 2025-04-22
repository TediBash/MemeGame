import { useLocation, useNavigate } from "react-router-dom";
import "./resume.css";
import { useEffect, useState } from "react";
import API from "../../API.mjs";
import RoundBox from "../roundBox/RoundBox";
import PropTypes from "prop-types";


function Resume(props){
    const location = useLocation();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [points, setPoints] = useState(0);

    const getHistoryGame = async () => {
        if(location.state){
            await API.getHistoryMatch(location.state.match_id)
            .then(result => {setHistory(result.details); setPoints(result.points);})
            .catch(error =>  {console.error('Error:', error); props.setFeedbackFromError(error);});
        }
    };

    useEffect(() => {
        getHistoryGame();
    }, []);

    return(
        <div>
            <div className="resume-title title-color">
                Resume
            </div>
            <div className="resume-points">
                You Earned +<span className={points > 0 ? 'green-points' : 'red-points'}>{points}</span> Points!
            </div>
            <div className="resume-history">
                <RoundBox match_details={history} styles={"resume-match-container"} from={"resume"}/>
            </div>
            <button onClick={() => navigate('/game')} className='btn-home mt-3'>
                <span className='span-start'>RESTART</span><br/>
                <span className='span-end'>GAME</span>
            </button>
            
        </div>
    )
}

Resume.propTypes = {
    setFeedbackFromError: PropTypes.func.isRequired,
};

export default Resume;