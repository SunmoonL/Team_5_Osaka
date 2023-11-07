import './scss/TitleText.scss';


const TitleText = ({children, regional}) => {
    const [, setRegional] = regional;
    return (
        <div className="TitleText">
            <img className="mainTitle" src="/images/logo.png" alt="THIS IS OSAKA" onMouseOver={() => {
                setRegional("main");
            }} />
            {children}
        </div>
    );
};


export default TitleText;