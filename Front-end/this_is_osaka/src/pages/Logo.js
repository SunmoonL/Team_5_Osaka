import './scss/Logo.scss';
import {Link} from "react-router-dom";

const Logo = ({children}) => {
    return (
        <div className="LogoZone">
            <Link to="/">
                <img className="logoImg" src="/images/logo.png" alt="THIS IS OSAKA" />
                <img className="logoIcon" src="/images/logoicon.png" alt="오사카성 아이콘"/>
                {children}
            </Link>
        </div>
    )
};


export default Logo;