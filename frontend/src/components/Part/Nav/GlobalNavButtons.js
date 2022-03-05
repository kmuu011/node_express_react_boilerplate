import React  from 'react';
import './GlobalNavButtons.scss';


function GlobalNavButtons() {
    function logOut () {
        sessionStorage.removeItem('x-token');
        localStorage.removeItem('x-token');
        window.location = '/';
    }

    return (
        <div className={"nav_footer_wrapper"}>
            <div className={"nav_button_bottom"} onClick={logOut}>
                로그아웃
            </div>
        </div>
    );
}



export default GlobalNavButtons;
