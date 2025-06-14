import { Navigate, useNavigate } from 'react-router-dom';
import './home.css';

function Home(){
    const navigate = useNavigate();

    return (
        <div>
            <div className="title">
                <button onClick={() => navigate('/game')} className='btn-home'>
                    <span className='span-start'>START</span><br/>
                    <span className='span-end'>GAME</span>
                </button>
            </div>
            <svg wversion="1.1" height="100vh" width="100vh" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="star-background">
            <defs>
                <radialGradient cx="0%" cy="100%" r="100%" spreadMethod="pad" id="solarGradient">
                <stop offset="0%" stopColor="hsla(0, 0%, 100%, 0.35)"/>
                <stop offset="70%" stopColor="hsla(0, 0%, 0%, 0)"/>
                </radialGradient>

                <radialGradient id="flickerGradient">
                    <stop offset="80%" stopColor="hsla(0, 0%, 0%, 1)"/>
                    <stop offset="100%" stopColor="hsla(0, 0%, 0%, 0.25)"/>
                </radialGradient>

                <path id="*" d="
                    M 0.000 0.500
                    L 1.736 3.604
                    L 0.391 0.312
                    L 3.900 0.890
                    L 0.487 -0.111
                    L 3.127 -2.494
                    L 0.217 -0.450
                    L 0.000 -4.000
                    L -0.217 -0.450
                    L -3.127 -2.494
                    L -0.487 -0.111
                    L -3.900 0.890
                    L -0.391 0.312
                    L -1.736 3.604
                    L 0.000 0.500
                "/>

                <g id="stars">
                    <use href="#*" x="13" y="26"/><use href="#*" x="229" y="45"/><use href="#*" x="361" y="12"/><use href="#*" x="491" y="40"/><use href="#*" x="522" y="48"/><use href="#*" x="717" y="19"/><use href="#*" x="814" y="92"/><use href="#*" x="975" y="30"/><use href="#*" x="64" y="137"/><use href="#*" x="185" y="149"/><use href="#*" x="317" y="205"/><use href="#*" x="401" y="227"/><use href="#*" x="546" y="171"/><use href="#*" x="732" y="228"/><use href="#*" x="882" y="241"/><use href="#*" x="974" y="144"/><use href="#*" x="112" y="318"/><use href="#*" x="243" y="350"/><use href="#*" x="372" y="373"/><use href="#*" x="394" y="273"/><use href="#*" x="519" y="375"/><use href="#*" x="722" y="353"/><use href="#*" x="780" y="293"/><use href="#*" x="999" y="267"/><use href="#*" x="23" y="432"/><use href="#*" x="169" y="481"/><use href="#*" x="321" y="455"/><use href="#*" x="399" y="493"/><use href="#*" x="536" y="440"/><use href="#*" x="661" y="473"/><use href="#*" x="797" y="444"/><use href="#*" x="982" y="502"/><use href="#*" x="13" y="561"/><use href="#*" x="200" y="558"/><use href="#*" x="376" y="602"/><use href="#*" x="432" y="611"/><use href="#*" x="603" y="607"/><use href="#*" x="692" y="560"/><use href="#*" x="796" y="557"/><use href="#*" x="973" y="604"/><use href="#*" x="64" y="724"/><use href="#*" x="232" y="742"/><use href="#*" x="267" y="647"/><use href="#*" x="430" y="736"/><use href="#*" x="585" y="695"/><use href="#*" x="713" y="701"/><use href="#*" x="852" y="695"/><use href="#*" x="998" y="697"/><use href="#*" x="63" y="866"/><use href="#*" x="241" y="876"/><use href="#*" x="358" y="810"/><use href="#*" x="422" y="787"/><use href="#*" x="617" y="832"/><use href="#*" x="660" y="814"/><use href="#*" x="825" y="886"/><use href="#*" x="1008" y="863"/><use href="#*" x="82" y="910"/><use href="#*" x="238" y="993"/><use href="#*" x="301" y="946"/><use href="#*" x="476" y="1013"/><use href="#*" x="568" y="945"/><use href="#*" x="662" y="981"/><use href="#*" x="879" y="997" />
                </g>
            </defs>
                <use className="stars stars-sm-no-rotate" href="#stars"/>
                <use className="stars stars-sm" href="#stars"/>
                <use className="stars stars-md" href="#stars"/>

                <g className="flicker-circles">
                    <circle cx="47" cy="149"/><circle cx="290" cy="11"/><circle cx="506" cy="69"/><circle cx="808" cy="99"/><circle cx="962" cy="49"/><circle cx="15" cy="276"/><circle cx="257" cy="395"/><circle cx="465" cy="342"/><circle cx="707" cy="242"/><circle cx="901" cy="222"/><circle cx="68" cy="551"/><circle cx="270" cy="549"/><circle cx="573" cy="470"/><circle cx="708" cy="466"/><circle cx="914" cy="542"/><circle cx="40" cy="751"/><circle cx="366" cy="806"/><circle cx="461" cy="790"/><circle cx="644" cy="720"/><circle cx="905" cy="684"/><circle cx="192" cy="853"/><circle cx="218" cy="946"/><circle cx="431" cy="854"/><circle cx="740" cy="1006"/>
                </g>


                <use className="stars stars-lg" href="#stars"/>

            </svg>
        </div>
    )
}


export default Home;