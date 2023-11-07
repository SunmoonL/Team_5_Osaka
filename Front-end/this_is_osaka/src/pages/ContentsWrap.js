import './scss/ContentsWrap.scss';

const ContentsWrap = ({children}) => {

    return (
        <div className="ContentsWrap">
            {children}
       </div>
    );
};


export default ContentsWrap;