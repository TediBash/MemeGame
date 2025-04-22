import "./game.css";
import { useEffect, useState } from "react";
import { Captions, Round } from "../../memeModels.mjs";
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../API.mjs";
import MyTimer from "../timer/Timer";

function GameMatch(props){
    const navigate = useNavigate();

    const [matchError, setMatchError] = useState('');    
    const [captions, setCaptions] = useState([]);
    const [meme, setMeme] = useState({});

    const [round, setRound] = useState(1);
    const [roundPoints, setRoundPoints] = useState(0);
    const [saveRound, setSaveRound] = useState([]);

    const [selectedCap, setSelectedCap] = useState(null);
    const [correctCaptions, setCorrectCaptions] = useState([]);
    const [disableBtn, setDisableBtn] = useState(false);
    
    const roundSeconds = 30;
    const [seconds, setSeconds] = useState(roundSeconds);
    const [stopTimer, setStopTimer] = useState(false);
    
    // Func called when user not logged in
    const getCaptionSingle = async () => {
        await API.getCaptionSingle()
        .then(response => {setMeme(response.meme); setCaptions(response.captions);})
        .catch(error => {console.error('Error:', error); props.setFeedbackFromError(error);});

        setDisableBtn(false);
        setStopTimer(false);
        setSeconds(roundSeconds);
        setCorrectCaptions([]);
        setSelectedCap(null);
    };

    //Func called when user is logged in, chose different meme each round
    const getCaptionsMulti = async () => {
        await API.getCaptionMulti()
        .then(response => {setMeme(response.meme); setCaptions(response.captions);})
        .catch(error => {console.error('Error:', error); props.setFeedbackFromError(error);});

        setDisableBtn(false);
        setStopTimer(false);
        setSeconds(roundSeconds);
        setCorrectCaptions([]);
        setSelectedCap(null);
    };

    // Clear points and the array of obj containing the rounds to save
    const initMatch = async () => {
        setSelectedCap(null);
        setSaveRound([]);
        setMatchError('');

        await API.initMatchLogged()
        .catch(error => {console.error('Error:', error); props.setFeedbackFromError(error);});
    };

    // Func called when user click on caption, stopTimer is used to clear the setInterval
    const checkSelection = (cap) => {
        setStopTimer(true);
        setDisableBtn(true);
        sendRoundResults(cap);
    };

    // Func called when user click on caption or time up, if user is logged store the round in local variable
    const sendRoundResults = async (cap) => {
        let sendRound = new Round(props.user ? props.user.id : 0, meme, captions, 0, cap, 0, round, []);
        let res = '';
        let correctCapId = [];
        if(props.user){
            await API.checkRoundLog(sendRound)
            .then((result) =>  res = result)
            .catch((error) => {console.error('Error:', error); props.setFeedbackFromError(error);});
        }else{
            await API.checkRound(sendRound)
            .then((result) =>  res = result)
            .catch((error) => {console.error('Error:', error); props.setFeedbackFromError(error);});
        }
        
        if(res){
            sendRound.points = res.points;
            sendRound.correctCaption = res.correctCap;
            correctCapId = res.correctCapId;
        }
        setRoundPoints(sendRound.points);
        setCorrectCaptions(correctCapId);

        if(props.user && round < 3){
            setSaveRound((old) =>  [...old, sendRound]);
        }

        if(props.user && round === 3)
            setTimeout(() => callEndGame(sendRound), 3000);
        else
            setTimeout(() => setRound(oldRound => oldRound + 1), 3000);
    };

    const callEndGame = (sendRound) => {
        endMatch(sendRound);
    }

    // Func called when the user ends his 3rd game, store the match and update user points
    const endMatch = async (sendRound) => {
        setSelectedCap(null);
        let match_points = 0;
        let match_id = 0;
        const send_obj = {user_id: props.user.id, match_details: [...saveRound, sendRound]};

        await API.createMatch(send_obj)
        .then(result => {match_points = result.points; match_id = result.id})
        .catch(error => {console.error('Error:', error); props.setFeedbackFromError(error);});

        const tot_point = props.user.points + match_points;
        props.setUser({id: props.user.id, name: props.user.name, points: tot_point, username: props.user.username});
        
        navigate('/resume',{state:{match_id: match_id}});
    };

    const endTimerFunc = () => {
        sendRoundResults(new Captions(0, "Not provided, time up!",0));
    };

    useEffect(() => {
        if(props.user){
            (round === 1) ? initMatch() : '';
            (round > 3) ? '' : getCaptionsMulti();
        }else{
            getCaptionSingle();
        }
        setRoundPoints(0);
    }, [round]);

    return(
        <>
        <div className="game-container">
            <div className="game-title title-color">
                {
                    props.user ? `Round ${round}` : 'Round 1'
                }
            </div>
            <div className="resume-points">
                {disableBtn ? `You Earned +${roundPoints} Points!` : '' } 
            </div>
            <Row>
                <Col md={6} className="side-container">
                    <div className="meme-container pixel-corners--wrapper" >
                        <img src={meme?.img_url} className='pixel-corners' />
                    </div>
                    <div className="timer-container">
                        <MyTimer seconds={seconds} setSeconds={setSeconds} endTimeFunc={endTimerFunc} stopTimer={stopTimer} setDisableBtn={setDisableBtn} />
                    </div>
                </Col>
                <Col md={6} className="captions-container">
                    {
                        captions.map((cap) => <button 
                                                onClick={() => {
                                                    setSelectedCap(cap.id);
                                                    checkSelection(cap);
                                                }} 
                                                disabled={disableBtn ? true : null}                                                
                                                key={round+"_"+cap.id} 
                                                className={
                                                    ` ${!disableBtn ? "hover" : ""}
                                                      ${disableBtn && correctCaptions.includes(cap.id) ? "green-class" : ""}
                                                      ${disableBtn && cap.id === selectedCap && !correctCaptions.includes(cap.id) ? "red-class" : ""}
                                                      ${disableBtn && cap.id === selectedCap ? "btn-selected" : ""}
                                                    `
                                                }
                                                >
                                                    {cap.text}
                                                </button>)
                    }
                </Col>
            </Row>
        </div>
        </>
    )
}

GameMatch.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
    logout: PropTypes.func,
    setFeedbackFromError: PropTypes.func.isRequired,
};

export default GameMatch;