import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import "./Footer.css"

const FSGNLink = 'https://t.me/bmstu_fsgn'


const Footer = () => {
    const {tg} = useTelegram();

    return (
        <div className={"footer"}>
            <p className={"footer__desc"}>© 2024 МГТУ им. Н.Э. Баумана</p>
            <a className={"footer__link"} href="#" onClick={() => tg.openTelegramLink(FSGNLink)}>Created by SGN</a>
        </div>
    );
};

export default Footer;