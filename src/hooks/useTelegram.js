const tg = window.Telegram.WebApp;

export function useTelegram() {

    const toggleBackButton = () => {
        if(tg.BackButton.isVisible) {
            tg.BackButton.hide();
        } else {
            tg.BackButton.show();
        }
    }

    const toggleMainButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        toggleBackButton,
        toggleMainButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }
}