module.exports = class CopyUserIDPlugin {
    start() {
        document.addEventListener('click', this.handleClick);
    }

    stop() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        const userCard = event.target.closest('[class*=userPopout], [class*=userProfileModal]');
        if (userCard) {
            const userID = userCard.dataset.userId;
            if (userID) {
                navigator.clipboard.writeText(userID);
                BdApi.showToast(`Skopiowano ID: ${userID}`, { type: 'success' });
            }
        }
    }
};
