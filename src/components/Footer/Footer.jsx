import React from 'react';
import "./Footer.css"



const Footer = () => {
    return (
        <div className={"footer"}>
            <p className={"footer__desc"}>© 2024 МГТУ им. Н.Э. Баумана</p>
            <a className={"footer__link"} href="javascript:Telegram.WebApp.openTelegramLink('https://t.me/bmstu_fsgn');">Created by SGN</a>
        </div>
    );
};

export default Footer;