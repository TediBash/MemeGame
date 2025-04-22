import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

function Register(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const information = { username, password, name };
  
      props.register(information)
        .then ( () => navigate( "/" )  )
        .catch( (err) => {
          if(err.message === "Unauthorized")
            setErrorMessage("Invalid username and/or password");
          else
            setErrorMessage(err.message);
          setShow(true);
        });
    };

    return(
        <div>
            <Row className="vh-100 justify-content-md-center loginContainer">
            <Col md={4} >
                <h1 className="pb-3 title-color">Register</h1>
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
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className='font-disket'>Username</Form.Label>
                    <Form.Control
                    type="text"
                    value={name} placeholder="Player12345"
                    onChange={(ev) => setName(ev.target.value)}
                    required={true} minLength={4}
                    className='font-garet'
                    />
                </Form.Group>
                <button type="submit" className='login-button'>Register</button>
                </Form>
                <div className='newAccContainer'>
                <Link to="/login" className='nav-link link-light '><span className='newAccount'>Already registered? Go login!</span></Link>
                </div>
            </Col>
            </Row>
        </div>
    )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Register;