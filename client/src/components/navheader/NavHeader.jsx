import {Col, Container, Navbar, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { LoginButton, LogoutButton } from '../login/Auth';
import PropTypes from "prop-types";
import './navheader.css';

function NavHeader(props){

    return(
        <Navbar bg='transparent' data-bs-theme='dark' className='navbar'>
            <Container fluid className='gap-3 align-items-center'>
                <Row className='w-100'>
                    <Col md={2} >
                        <div className='profile'>
                            <Link to='/' className='navbar-brand'>Tedi Exam Memo</Link>
                        </div>
                    </Col>
                    <Col md={5}>
                    </Col>
                    <Col md={2} className='d-flex align-items-center justify-content-end'>
                        <div className='profile'>
                            {
                                props.loggedIn ? <Link to='/profile' className='nav-link link-light'><span>Profile <i className="bi bi-person-square me-2 flex-shrink-0"></i> </span></Link> : ''
                            }
                        </div>
                    </Col>
                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                        {
                            props.loggedIn ? <LogoutButton logout={props.logout} /> : <LoginButton />
                        }
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

NavHeader.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
    loggedIn: PropTypes.bool,
};

export default NavHeader;