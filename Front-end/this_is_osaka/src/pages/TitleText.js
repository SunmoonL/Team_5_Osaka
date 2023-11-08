import './scss/TitleText.scss';


const TitleText = ({children, regional}) => {
    const [, setRegional] = regional;   // 지역을 변경하는 set 함수
    return (
        <div className="TitleText">
            <img className="mainTitle" src="/images/logo.png" alt="THIS IS OSAKA" onMouseOver={() => {
                setRegional("main");    // 타이틀 위로 마우스가 지나갈시 현재지역을 main으로 변경
            }} />
            {children}
        </div>
    );
};


export default TitleText;