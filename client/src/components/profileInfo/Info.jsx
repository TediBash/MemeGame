import './info.css';
import { Col, Row } from 'react-bootstrap';
import PropTypes from "prop-types";

function ProfileInfo(props){
    return(
        <div className='profile-container'>
            <div className='user-profile'>
                <div className='user-img'>
                    <img src="./user-profile-icon.png" />
                </div>
                <div className='user-details'>
                    <Row>
                        <Col md={3}>
                            <b>Username:</b>
                        </Col>
                        <Col md={9}>
                            <span className='font-disket'>{props.user.name}</span>
                        </Col>  

                        <Col md={3}>
                            <b>Email:</b>
                        </Col>
                        <Col md={9}>
                            <span className='font-disket'>{props.user.username}</span>
                        </Col>

                        <Col md={3}>
                            <b>Points:</b>
                        </Col>
                        <Col md={9}>
                            <span className='font-disket'>{props.user.points}</span>
                        </Col>         
                    </Row>
                </div>
            </div>
        </div>
    )
}

ProfileInfo.propTypes = {
    user: PropTypes.object.isRequired,
};


export default ProfileInfo;