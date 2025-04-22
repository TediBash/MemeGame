import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import './auth.css';


function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };

    props.login(credentials)
      .then ( () => navigate( "/" )  )
      .catch( (err) => {
        if(err.message === "Unauthorized")
          setErrorMessage("Invalid username and/or password");
        else
          setErrorMessage(err.message);
        setShow(true);
      });
  };

  return (
    <div>
      <Row className="vh-100 justify-content-md-center loginContainer">
          <Col md={4} >
            <h1 className="pb-3 title-color">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Alert
                    dismissible
                    show={show}
                    onClose={() => setShow(false)}
                    variant="danger">
                    {errorMessage}
              </Alert>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className='font-disket'>email</Form.Label>
                <Form.Control
                  type="email"
                  value={username} placeholder="Example: john.doe@polito.it"
                  onChange={(ev) => setUsername(ev.target.value)}
                  required={true}
                  className='font-garet'
                />
              </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label className='font-disket'>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password} placeholder="Enter the password."
                  onChange={(ev) => setPassword(ev.target.value)}
                  required={true} minLength={6}
                  className='font-garet'
                  />
              </Form.Group>
              <button type="submit" className='login-button'>Login</button>
            </Form>
            <div className='newAccContainer'>
              <Link to="/register" className='nav-link link-light '><span className='newAccount'>No account? Create one!</span></Link>
            </div>
          </Col>
        </Row>
    </div>
    
  )
}

LoginForm.propTypes = {
  login: PropTypes.func,
}

function LogoutButton(props) {
  return (
    <Button variant="outline-light" onClick={props.logout}>Logout</Button>
  )
}

LogoutButton.propTypes = {
  logout: PropTypes.func
}

function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button variant="outline-light" onClick={()=> navigate('/login')}>Login</Button>
  )
}

export { LoginForm, LogoutButton, LoginButton };
