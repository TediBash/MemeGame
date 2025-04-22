import { Accordion, Col, Row } from 'react-bootstrap';
import RoundBox from '../roundBox/RoundBox';
import './history.css';
import PropTypes from "prop-types";

function ProfileHistory(props){
    return(
        <div className='history-container'>
                {
                    props.history ?
                        props.history.map((h, index) => {
                            return (
                                <Accordion className='game-accordion' key={index} flush>
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header>
                                            <p>Game N* {(props.history.length - index) < 10 ? "0"+(props.history.length - index) : (props.history.length - index)}     Match Points: {JSON.parse(h.match_details).length === 3 ? h.match_points : 'invalid'}</p>
                                        </Accordion.Header>
                                        <Accordion.Body className='body-accordion'>
                                            <RoundBox match_details={JSON.parse(h.match_details)} styles={""} from={"history"}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )
                        })
                    : 'Nothing to show'
                }
        </div>
    )
}

ProfileHistory.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileHistory;