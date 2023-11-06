import './scss/Logo.scss';
import {Link} from "react-router-dom";

const Logo = ({children}) => {
    return (
        <div className="LogoZone">
            <Link to="/">
                <img className="logoImg" src="/images/logo_mobile.png" alt="THIS IS OSAKA" /> 
                {children}
            </Link>
        </div>
    )
};


export default Logo;