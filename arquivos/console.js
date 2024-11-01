const chalk = require('chalk');

const naDono = `𝐌𝐄𝐔 𝐃𝐎𝐍𝐎`;

function logConsole({ isGroup, isCmd, isDono, sender, pushname, hora, comando, prefixo, body, groupName }) {
    if (sender) {
        const header = `${chalk.bgMagenta.white(' ★━━━━━━━━━━━━━━━━━━━━━━━━★ ')}\n`;
        const footer = `${chalk.bgMagenta.white(' ★━━━━━━━━━━━━━━━━━━━━━━━━★ ')}\n`;
        const numero = `${chalk.green('➤')} ${chalk.yellow('Número:')} ${chalk.white(sender.split('@')[0])}`;
        const nome = `${chalk.green('➤')} ${chalk.yellow('Nome:')} ${chalk.white(isDono ? naDono : pushname)}`;
        const horario = `${chalk.green('➤')} ${chalk.yellow('Horário:')} ${chalk.white(hora)}`;
        const palavras = `${chalk.green('➤')} ${chalk.yellow('Palavras:')} ${chalk.white(body.length)}`;
        
        const logContent = isGroup 
            ? `${chalk.green('➤')} ${chalk.yellow('Grupo:')} ${chalk.white(groupName)}\n`
            : '';

        const commandOrMessage = isCmd 
            ? `${chalk.green('➤')} ${chalk.yellow('Comando:')} ${chalk.cyan(prefixo + comando)}\n`
            : `${chalk.green('➤')} ${chalk.yellow('Mensagem:')} ${chalk.cyan(body)}\n`;

        console.log(`${header}${numero}\n${nome}\n${horario}\n${commandOrMessage}${palavras}\n${logContent}${footer}`);
    }
}

module.exports = logConsole;