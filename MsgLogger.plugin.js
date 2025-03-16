/**
 * @name MessageLogger
 * @description Pokazuje usunięte wiadomości na czerwono z dopiskiem "USUNĘTO".
 * @version 1.0.0
 * @author wojtas199
 * @source https://github.com/wojtas199/BetterDiscordPlugins
 */

module.exports = class MessageLogger {
    constructor() {
        this.deletedMessages = new Map();
    }

    start() {
        BdApi.Patcher.after("MessageLogger", BdApi.findModuleByProps("dispatch"), "dispatch", (_, args) => {
            if (args[0]?.type === "MESSAGE_DELETE") {
                this.logDeletedMessage(args[0].id);
            }
        });
    }

    stop() {
        BdApi.Patcher.unpatchAll("MessageLogger");
    }

    logDeletedMessage(messageId) {
        const messageElement = document.querySelector(`[id="chat-messages-"] [id="message-${messageId}"]`);
        if (messageElement) {
            messageElement.style.color = "red";
            messageElement.innerText += " (USUNĘTO)";
        }
    }
};
