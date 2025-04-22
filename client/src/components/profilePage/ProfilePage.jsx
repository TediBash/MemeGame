import { useEffect, useState } from 'react';
import './profilePage.css';
import API from '../../API.mjs';

import ProfileInfo from '../profileInfo/Info';
import ProfileHistory from '../profileHistory/History';
import PropTypes from "prop-types";

function ProfilePage(props){
    const [history, setHistory] = useState([]);

    const getHistory = async () => {
        await API.getHistory()
        .then((response) => setHistory(response))
        .catch((error) => {
            console.error('Error fetching data:', error.error);
            props.setFeedbackFromError(error);
            //error.error === 'Not authorized' ? props.logout() : null;
        });
        //console.log(response);
        
    };

    useEffect(() => {
        getHistory();
    }, []);

    return(
        <div className='all-container'>
            <ProfileInfo user={props.user} />
            <ProfileHistory history={history} />
        </div>
    )
}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    setFeedbackFromError: PropTypes.func.isRequired,
};

export default ProfilePage;