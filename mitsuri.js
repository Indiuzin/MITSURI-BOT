/* 
 🇧  🇦  🇸  🇪    🇮  🇳  🇩  🇮  🇺  🇿  🇮  🇳 

base feita por indiuzin...
nao tira os creditos nao se for fazer uma case 
colocar meu nome la 😁
qual quer coisa chama


ATENÇÃO 

TEM UMS COMANDOS QUE NAO TA REGISTRADO NO MENU VERIFIQUE
*/
require("./datab/dono/env/info.js")
const { 
default: makeWAindiuet,
MessageType, 
Presence,
MessageOptions, 
downloadContentFromMessage,
fetchLatestBaileysVersion,
Mimetype,
useMultiFileAuthState,
DisconnectReason,
Browser,
delay
} = require("./mitsuri_baileys")
const fs = require("fs")
const P = require("pino") 
const axios = require('axios')
const path = require('path');
const fetch = require("node-fetch")
const chalk = require("chalk")
const inquirer = require("inquirer")
const { color } = require("./datab/lib/cores")
const { banner, getBuffer, getExtension, getRandom } = require("./datab/lib/funções")
const logConsole = require('./arquivos/console');
const links = require("./arquivos/logos.json")
const audios = require("./arquivos/audios.json")
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
const speed = require("performance-now")
const yts = require("yt-search")
const _ = require("lodash")

// Definições 
prefixo = configurações.prefixo
nomeBot = configurações.nomeBot
nomeDono = configurações.nomeDono
numeroDono = configurações.numeroDono
api_kay1 = configurações.api_kay1
api_kay2 = configurações.api_kay2
apikey_mitsuri_api = configurações.apikey_mitsuri_api




const { prepareWAMessageMedia } = require(`./mitsuri_baileys`)

var botoes = JSON.parse(fs.readFileSync("./dono/config-all.json")).botoes

const sendButton = async(from, dados, zerotwo, sender, options, info) => {
  try {
    if(botoes) {
      but = []
      for(i of options) {
        if(i.type == `copy_url`) but.push({name: "cta_url", buttonParamsJson: JSON.stringify({display_text: i.text, url: i.url, merchant_url: i.url})})
        if(i.type == `copy_text`) but.push({name: "cta_copy", buttonParamsJson: JSON.stringify({display_text: i.text, copy_code: i.url})})
        if(i.type == `call`) but.push({name: "cta_call", buttonParamsJson: JSON.stringify({display_text: i.text, id: i.url})})
        if(i.type == `cmd`) but.push({name: "quick_reply", buttonParamsJson: JSON.stringify({display_text: i.text, id: i.comando, disabled: false})})
        if(i.type == `list` || i.type == `lista`) {
          caixa = []
          for(a of i.rowId) {
            lista = []
            for(b of a.options) {
              lista.push({header: b?.name || ``, title: b?.title || ``, description: b?.body, id: b?.comando || ``, disabled: false})
            }
            caixa.push({title: a?.title || ``, highlight_label: a?.body || ``, rows: lista})
          }
          but.push({name: "single_select", buttonParamsJson: JSON.stringify({title: i.title, sections: caixa})})
        }
      }
      if(dados?.text) return mitsuri.relayMessage(from, {interactiveMessage: {body: {text: dados?.text || ``}, footer: {text: dados?.footer || ``}, contextInfo: {participant: sender, mentionedJid: dados?.mentions, quotedMessage: info ? info.message : ``}, nativeFlowMessage: {buttons: but, messageParamsJson: ""}}}, {})
      if(dados?.image) {
        img = await prepareWAMessageMedia({image: dados?.image}, {upload: mitsuri.waUploadToServer})
        return mitsuri.relayMessage(from, {interactiveMessage: {header: {hasMediaAttachment: true, imageMessage: img.imageMessage}, headerType: `IMAGE`, body: {text: dados?.caption || ``}, footer: {text: dados?.footer || ``}, contextInfo: {participant: sender, mentionedJid: dados?.mentions, quotedMessage: info ? info.message : ``}, nativeFlowMessage: {buttons: but, messageParamsJson: ""}}}, {})
      }
      vid = await prepareWAMessageMedia({video: dados?.video}, {upload: mitsuri.waUploadToServer})
      return mitsuri.relayMessage(from, {interactiveMessage: {header: {hasMediaAttachment: true, videoMessage: vid.videoMessage}, headerType: `IMAGE`, body: {text: dados?.caption || ``}, footer: {text: dados?.footer || ``}, contextInfo: {participant: sender, mentionedJid: dados?.mentions, quotedMessage: info ? info.message : ``}, nativeFlowMessage: {buttons: but, messageParamsJson: ""}}}, {})
    } else {
      if(dados?.text) return mitsuri.sendMessage(from, {text: dados?.text, mentions: dados?.mentions}, {quoted: info})
      if(dados?.image) return mitsuri.sendMessage(from, {image: dados?.image, caption: dados?.caption, mentions: dados?.mentions}, {quoted: info})
      return mitsuri.sendMessage(from, {video: dados?.video, caption: dados?.caption, mentions: dados?.mentions}, {quoted: info})
    }
  } catch(e) {console.log(e)}
}

const sendListB = async(from, dados, zerotwo, sender, title, lista, info) => {
  try {
    if(botoes) {
      caixa = []
      for(a of lista) {
        hehe = []
        for(b of a.options) {
          hehe.push({header: b?.name || ``, title: b?.title || ``, description: b?.body, id: b?.comando || ``, disabled: false})
        }
        caixa.push({title: a?.title || ``, highlight_label: a?.body || ``, rows: hehe})
      }
      but = [{name: "single_select", buttonParamsJson: JSON.stringify({title: title, sections: caixa})}]
      if(dados?.text) return mitsuri.relayMessage(from, {interactiveMessage: {body: {text: dados?.text || ``}, footer: {text: dados?.footer || ``}, contextInfo: {participant: sender, mentionedJid: dados?.mentions, quotedMessage: info ? info.message : ``}, nativeFlowMessage: {buttons: but, messageParamsJson: ""}}}, {})
      if(dados?.image) {
        img = await prepareWAMessageMedia({image: dados?.image}, {upload: mitsuri.waUploadToServer})
        return mitsuri.relayMessage(from, {interactiveMessage: {header: {hasMediaAttachment: true, imageMessage: img.imageMessage}, headerType: `IMAGE`, body: {text: dados?.caption || ``}, footer: {text: dados?.footer || ``}, contextInfo: {participant: sender, mentionedJid: dados?.mentions, quotedMessage: info ? info.message : ``}, nativeFlowMessage: {buttons: but, messageParamsJson: ""}}}, {})
      }
      vid = await prepareWAMessageMedia({video: dados?.video}, {upload: mitsuri.waUploadToServer})
      return mitsuri.relayMessage(from, {interactiveMessage: {header: {hasMediaAttachment: true, videoMessage: vid.videoMessage}, headerType: `IMAGE`, body: {text: dados?.caption || ``}, footer: {text: dados?.footer || ``}, contextInfo: {participant: sender, mentionedJid: dados?.mentions, quotedMessage: info ? info.message : ``}, nativeFlowMessage: {buttons: but, messageParamsJson: ""}}}, {})
    } else {
      if(dados?.text) return mitsuri.sendMessage(from, {text: dados?.text, mentions: dados?.mentions}, {quoted: info})
      if(dados?.image) return mitsuri.sendMessage(from, {image: dados?.image, caption: dados?.caption, mentions: dados?.mentions}, {quoted: info})
      return mitsuri.sendMessage(from, {video: dados?.video, caption: dados?.caption, mentions: dados?.mentions}, {quoted: info})
    }
  } catch(e) {console.log(e)}
}


module.exports = { sendButton, sendListB }


const girastamp = speed()
const latensi = speed() - girastamp

// Contato do dono
const vcard = "BEGIN:VCARD\n"
+ "VERSION:3.0\n" 
+ "FN:ＩＮＤＩＵＺＩＮ\n" // Nome completo
+ `ORG:digite: ${prefixo}alugar-bot;\n` // A organização do contato
+ "TEL;type=CELL;type=VOICE;waid=558592039551:558592039551\n" // WhatsApp ID + Número de telefone
+ "END:VCARD" // Fim do ctt

const id1 = "558592139771@s.whatsapp.net";

async function laur() {

// Início da conexão
const { state, saveCreds } = await useMultiFileAuthState("./datab/base-codico")
console.log(banner.string)
const mitsuri = makeWAindiuet({
 logger: P({ level: "silent" }),
 mobile: false,
 browser: ["chrome (linux)"],
 auth: state
})

mitsuri.ev.on("connection.update", (update) => {
  const { connection, lastDisconnect } = update;

  if (connection === "close") {
    const shouldReconnect =
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output &&
      lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

    if (shouldReconnect) {
      // Lógica para reconectar, se necessário
      console.log("Tentando reconectar...");
    }
  } else if (connection === "open") {
    // Enviar mensagem quando a conexão for aberta
    mitsuri.sendMessage(id1, { text: `Olá ${nomeDono}, estou online 🫡` });
  }
});

// Nova conexão 
if (mitsuri.user == null) {
let resposta = await inquirer.prompt([{ type: "input", name: "numero", message: "Digite seu número: \nEx: 558586294618\n-->" }])

let codigo = await mitsuri.requestPairingCode(resposta.numero)
console.log(`Seu código de conexão é: ${chalk.bold(codigo)}`)
}

// Chat update
// Ouvir quando as credenciais auth é atualizada
mitsuri.ev.on("creds.update", saveCreds)
mitsuri.ev.on("messages.upsert", async ({ messages }) => {
try {
const info = messages[0]
if (!info.message) return 
await mitsuri.readMessages([info.key.id])
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]

const content = JSON.stringify(info.message)
const from = info.key.remoteJid

// Body
var body = (type === "conversation") ?
info.message.conversation : (type == "imageMessage") ?
info.message.imageMessage.caption : (type == "videoMessage") ?
info.message.videoMessage.caption : (type == "extendedTextMessage") ?
info.message.extendedTextMessage.text : ""

const args = body.trim().split(/ +/).splice(1)
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).split(/ +/).shift().toLowerCase() : null
bidy =  body.toLowerCase()

const isGroup = from.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const sender = isGroup ? info.key.participant : from
const testat = bidy
const pushname = info.pushName ? info.pushName : ""
const groupMetadata = isGroup ? await mitsuri.groupMetadata(from) : ""
const groupName = isGroup  ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
const groupAdmins = isGroup ? _.map(_.filter(groupMembers, "admin"), "id")  : ""
const q = args.join(" ")

// Consts dono/adm etc...
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const numeroBot = mitsuri.user.id.split(":")[0] + "@s.whatsapp.net"
const isBot = info.key.fromMe
const isDono = sender.includes(numeroDono)
const isBotadm = groupAdmins.includes(numeroBot) || false
const isAdm = groupAdmins.includes(sender) || false 
const enviar = (texto) => {
mitsuri.sendMessage(from, { text: texto }, {quoted: info}) }

const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(let chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

basDono = `*MEU DONO 🫡*`

const reagir = async (idgp, emj) => {
var reactionMessage = {
react: {
text: emj, 
key: info.key
}
} 
mitsuri.sendMessage(idgp, reactionMessage)
}

const logo = `https://telegra.ph/file/a506ff9040af5593629a4.jpg`

const imagePath = path.resolve(__dirname, './arquivos/rank.png');

async function pegarPerfil(){
  try {
 img = await mitsuri.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image");
    } catch (e) {
        img = `${logo}`
    }}
let ftperfil = pegarPerfil()

const esperar = sleep = async (tempo) => {
    return new Promise(funcao => setTimeout(funcao, tempo));
}


const logoBot = `https://telegra.ph/file/7f314f176371bf85b3cdf.jpg`

if(!info.message) return;
const baileys = require('@whiskeysockets/baileys');

const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')

const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')

const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')

const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')

const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')

const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')

const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

const gerarFrutaOuNumero = () => {
  const frutasComPrecos = [
    { fruta: "🍎🍑🍊", preco: (Math.random() * (10 - 5) + 5).toFixed(2) },
    { fruta: "🍉🍍🍓", preco: (Math.random() * (7 - 3) + 3).toFixed(2) },
    { fruta: "🍋🍒🍉", preco: (Math.random() * (8 - 4) + 4).toFixed(2) },
    { fruta: "🍊🍍🍎", preco: (Math.random() * (12 - 6) + 6).toFixed(2) },
    { fruta: "🍑🍋🍈", preco: (Math.random() * (15 - 8) + 8).toFixed(2) },
    { fruta: "🍉🍑🍌", preco: (Math.random() * (20 - 10) + 10).toFixed(2) },
    { fruta: "🍓🍏🍎", preco: (Math.random() * (9 - 5) + 5).toFixed(2) },
    { fruta: "🍒🍊🍍", preco: (Math.random() * (25 - 15) + 15).toFixed(2) },
    { fruta: "🍈🍓🍇", preco: (Math.random() * (30 - 15) + 15).toFixed(2) },
    { fruta: "🍑🍋🍍", preco: (Math.random() * (22 - 12) + 12).toFixed(2) },
    { fruta: "🍉🍏🍓", preco: (Math.random() * (18 - 10) + 10).toFixed(2) },
    { fruta: "🍒🍈🍎", preco: (Math.random() * (14 - 8) + 8).toFixed(2) },
    { fruta: "🍌🍇🍑", preco: (Math.random() * (6 - 3) + 3).toFixed(2) },
    { fruta: "🍏🍒🍉", preco: (Math.random() * (11 - 6) + 6).toFixed(2) },
    { fruta: "🍎🍓🍋", preco: (Math.random() * (10 - 5) + 5).toFixed(2) },
    { fruta: "🍍🍈🍒", preco: (Math.random() * (13 - 7) + 7).toFixed(2) },
    { fruta: "🍊🍇🍎", preco: (Math.random() * (16 - 9) + 9).toFixed(2) },
    { fruta: "🍋🍑🍍", preco: (Math.random() * (7 - 4) + 4).toFixed(2) }
  ];

  const numero = Math.floor(Math.random() * 1000);

  if (numero === 777) {
    const preco = (Math.random() * (1000 - 100) + 100).toFixed(2);
    return `7️⃣7️⃣7️⃣ ✅\nVocê ganhou! O valor é R$ ${preco}`;
  }

  const frutaAleatoria = frutasComPrecos[Math.floor(Math.random() * frutasComPrecos.length)];
  return `╔═════╗\n |                ${frutaAleatoria.fruta}\n |                  R$ ${frutaAleatoria.preco}\n |              ╚═════╝`;
};

const pessoas = [ //by indiuzin
  { nome: "jose do carmo", cpf: "123.456.789-01", idade: 45, endereco: "Rua A, 123", dataNascimento: "01/01/1979", telefone: "(11) 98765-4321", email: "jose.carmo@gmail.com" },
  { nome: "alex de oliveira", cpf: "987.654.321-00", idade: 32, endereco: "Avenida B, 456", dataNascimento: "15/05/1992", telefone: "(21) 99876-5432", email: "alex.oliveira@gmail.com" },
  { nome: "mardeson da silva", cpf: "111.222.333-44", idade: 29, endereco: "Praça C, 789", dataNascimento: "22/11/1994", telefone: "(31) 97765-4321", email: "mardeson.silva@gmail.com" },
  { nome: "Gabriel oliveira", cpf: "555.666.777-88", idade: 34, endereco: "Rua D, 101", dataNascimento: "30/03/1990", telefone: "(41) 96654-3210", email: "gabriel.oliveira@gmail.com" },
  { nome: "eduardo da silva", cpf: "999.888.777-66", idade: 27, endereco: "Avenida E, 202", dataNascimento: "05/12/1996", telefone: "(51) 95543-2109", email: "eduardo.silva@gmail.com" },
  { nome: "raimunda de oliveira", cpf: "333.444.555-99", idade: 41, endereco: "Rua F, 303", dataNascimento: "17/07/1982", telefone: "(61) 94432-1098", email: "raimunda.oliveira@gmail.com" },
  { nome: "luana costa", cpf: "444.555.666-77", idade: 28, endereco: "Rua G, 404", dataNascimento: "12/02/1996", telefone: "(71) 92234-5678", email: "luana.costa@gmail.com" },
  { nome: "marcos pereira", cpf: "555.666.777-88", idade: 37, endereco: "Avenida H, 505", dataNascimento: "23/04/1987", telefone: "(81) 93345-6789", email: "marcos.pereira@gmail.com" },
  { nome: "camila souza", cpf: "666.777.888-99", idade: 30, endereco: "Praça I, 606", dataNascimento: "09/09/1993", telefone: "(91) 94456-7890", email: "camila.souza@gmail.com" },
  { nome: "thiago alves", cpf: "777.888.999-00", idade: 33, endereco: "Rua J, 707", dataNascimento: "16/11/1990", telefone: "(11) 95567-8901", email: "thiago.alves@gmail.com" },
  { nome: "beatriz martins", cpf: "888.999.000-11", idade: 26, endereco: "Avenida K, 808", dataNascimento: "04/01/1998", telefone: "(21) 96678-9012", email: "beatriz.martins@gmail.com" },
  { nome: "gustavo lima", cpf: "999.000.111-22", idade: 41, endereco: "Rua L, 909", dataNascimento: "29/07/1982", telefone: "(31) 97789-0123", email: "gustavo.lima@gmail.com" },
  { nome: "fernanda oliveira", cpf: "000.111.222-33", idade: 35, endereco: "Praça M, 1010", dataNascimento: "10/06/1988", telefone: "(41) 98890-1234", email: "fernanda.oliveira@gmail.com" }
];

const veiculos = [ //by indiuzin
  { marca: "Fiat", modelo: "Uno", ano: 2015, placas: "ABC1D23", tipo: "Hatchback", cor: "Vermelho", dataRegistro: "15/03/2015", telefone: "(11) 98765-4321" },
  { marca: "Honda", modelo: "Civic", ano: 2018, placas: "XYZ9W87", tipo: "Sedan", cor: "Preto", dataRegistro: "22/07/2018", telefone: "(21) 99876-5432" },
  { marca: "Ford", modelo: "Fiesta", ano: 2020, placas: "LMN4O56", tipo: "Hatchback", cor: "Branco", dataRegistro: "30/11/2020", telefone: "(31) 97765-4321" },
  { marca: "Chevrolet", modelo: "Onix", ano: 2019, placas: "RST3P45", tipo: "Hatchback", cor: "Azul", dataRegistro: "05/01/2019", telefone: "(41) 96654-3210" },
  { marca: "Volkswagen", modelo: "Gol", ano: 2016, placas: "OPQ2R67", tipo: "Sedan", cor: "Prata", dataRegistro: "12/06/2016", telefone: "(51) 95543-2109" },
  { marca: "Hyundai", modelo: "HB20", ano: 2021, placas: "JKL5S89", tipo: "Hatchback", cor: "Cinza", dataRegistro: "20/09/2021", telefone: "(61) 94432-1098" },
  { marca: "Renault", modelo: "Sandero", ano: 2017, placas: "UVW1X23", tipo: "Hatchback", cor: "Bege", dataRegistro: "08/04/2017", telefone: "(71) 92234-5678" },
  { marca: "Nissan", modelo: "Kicks", ano: 2019, placas: "YZA6B78", tipo: "SUV", cor: "Verde", dataRegistro: "15/12/2019", telefone: "(81) 93345-6789" },
  { marca: "Toyota", modelo: "Corolla", ano: 2022, placas: "BCE2D34", tipo: "Sedan", cor: "Marrom", dataRegistro: "02/05/2022", telefone: "(91) 94456-7890" },
  { marca: "Jeep", modelo: "Compass", ano: 2020, placas: "FGH9I01", tipo: "SUV", cor: "Prata", dataRegistro: "17/11/2020", telefone: "(11) 95567-8901" }
];

const meni = [
    "Ana", "Beatriz", "Clara", "Clarice", "Daniela", "Elaine", "Fernanda", "Gabriela", 
    "Isabela", "Juliana", "Karen", "Laura", "Marcela", "Natalia", "Olivia", 
    "Patricia", "Queila", "Rafaela", "Sabrina", "Tatiane", "Vanessa", "Wendy", 
    "Yasmin", "Zara", "Lúcia", "Marina", "Camila", "Jéssica", "Amanda", 
    "Raquel", "Sílvia", "Cristina", "Renata", "Letícia", "Lívia", "Milena", 
    "Naiara", "Samantha", "Gisele", "Carolina", "Joana", "Eliane", "Rita", 
    "Mariana", "Viviane", "Ana Clara", "Bárbara", "Cíntia", "Daniella", 
    "Evelyn", "Fátima", "Helena", "Irene", "Janaína", "Karla", "Mônica", 
    "Patrícia", "Regiane", "Sofia", "Ursula", "Valéria", "Yara", "Zuleika", 
    "Adriana", "Cássia", "Daniele", "Elen", "Flávia", "Geovana", "Heloísa", 
    "Jaqueline", "Marli", "Nayara", "Paula", "Rosa", "Tânia", "Valéria", 
    "Yasmin", "Lúcia", "Gabrielle", "Aline", "Carla", "Luana", "Mariane", 
    "Marta", "Núbia", "Pamela", "Roberta", "Tatiane", "Viviane", "Suzana", 
    "Helena", "Eliane", "Giselle", "Jaqueline", "Renata", "Claudia", "Graziella", 
    "Letícia", "Marcela", "Michele", "Natasha", "Rebeca", "Simone", "Valéria", 
    "Andreia", "Bianca", "Caroline", "Cristiane", "Edna", "Elaine", "Fátima", 
    "Gisele", "Iara", "Júlia", "Larissa", "Lúcia", "Mônica", "Naiara", 
    "Priscila", "Raquel", "Sandra", "Tatiane", "Verônica", "Viviane", "Zuleika"
];

const rg = [
    "460096213",
    "568000329",
    "470726782",
    "754889345",
    "701653042",
    "073679045",
    "097532298",
    "890086463",
    "087632265",
    "700963208",
    "102938475",
    "564738291",
    "019283746",
    "847362910",
    "657483920",
    "384756192",
    "092837465",
    "574839201",
    "374829165",
    "647382910",
    "198765432",
    "312456789",
    "675849302",
    "239847561",
    "987654321",
    "478392061",
    "135792468",
    "908172635",
    "746829103",
    "564738290",
    "981276345",
    "768594032",
    "837461920",
    "193847562",
    "284756391",
    "657839402",
    "102938746",
    "495837162",
    "847263091",
    "902374561"
];

// Função para obter um RG aleatório
function getRandomRG() {
    const randomIndex = Math.floor(Math.random() * rg.length);
    return rg[randomIndex];
}

const profi = [
    "🚗 uber",
    "🍕 pizza-boy",
    "🛵 motoboy",
    "🍽️ garçom",
    "🏗️ pedreiro",
    "🛍️ vendedor",
    "🏢 porteiro",
    "🧹 faxineiro",
    "🌿 jardineiro",
    "💡 eletricista",
    "🔧 encanador",
    "🥖 padeiro",
    "👨‍🍳 cozinheiro",
    "🛡️ segurança",
    "⛽ frentista",
    "🔩 mecânico",
    "🚛 motorista de caminhão",
    "🔪 açougueiro",
    "🪚 carpinteiro",
    "🛞 borracheiro",
    "🚌 cobrador de ônibus",
    "🧼 auxiliar de serviços gerais",
    "🗂️ auxiliar administrativo",
    "🌾 agricultor",
    "🏭 auxiliar de produção",
    "🚜 operador de máquinas",
    "💅 manicure",
    "✂️ cabeleireiro",
    "🧵 costureira",
    "🍲 auxiliar de cozinha",
    "💼 assistente de vendas",
    "📝 supervisor",
    "🛒 gerente de loja",
    "💳 caixa de supermercado",
    "📦 repositor de mercadorias",
    "☎️ telemarketing",
    "📦 entregador",
    "🎨 pintor",
    "💻 técnico de informática",
    "⚙️ soldador",
    "🪑 montador de móveis",
    "💆‍ esteticista",
    "💈 barbeiro",
    "📞 operador de telemarketing",
    "💻 analista de suporte",
    "🛒 consultor de vendas",
    "📚 professor particular",
    "🚗 instrutor de autoescola",
    "🏗️ operador de empilhadeira",
    "👮 vigilante",
    "👩‍💻 recepcionista",
    "💊 atendente de farmácia",
    "🛍️ balconista",
    "🔌 técnico em eletrônica",
    "💵 operador de caixa",
    "📚 bibliotecário",
    "🧘‍ fisioterapeuta",
    "🥗 nutricionista",
    "🐾 veterinário",
    "💉 auxiliar de enfermagem",
    "🚑 paramédico",
    "💳 analista de crédito"
];

const randomProfession = profi[Math.floor(Math.random() * profi.length)];

const gerarNumeroWhatsApp = () => {
    // Função para gerar um número aleatório dentro de um intervalo
    const gerarNumeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Prefixo do Brasil
    const codigoPais = '+55';

    // Código da área de Fortaleza, CE
    const codigoArea = '85';

    // Gerar o número aleatório com 8 dígitos
    const numero = gerarNumeroAleatorio(10000000, 99999999);

    // Formatar o número no estilo (XX) XXXXX-XXXX
    const numeroFormatado = `(${codigoArea}) ${numero.toString().slice(0, 5)}-${numero.toString().slice(5)}`;

    // Retornar o número completo com código do país
    return `${codigoPais} ${numeroFormatado}`;
};

const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant

const menc_jid = args?.join(" ").replace("@", "") + "@s.whatsapp.net"

const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid

const sender_ou_n = q.includes("@") ? menc_jid : sender

const mrc_ou_numero = q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt 
const menc_os2 = q.includes("@") ? menc_jid : menc_prt 

const marc_tds = q.includes("@") ? menc_jid : q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt 

const menc_prt_nmr = q.length > 12 ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt


const welcome = JSON.parse(fs.readFileSync('./datab/bemvindo/welkon.json'));
const recentMessages = new Map(); // Para armazenar timestamps das mensagens recentes
const isWelcome = (groupId) => welcome.includes(groupId);

const MisheruModzDev = new Map();

const nahidadomina = async (num) => {
    const neguin = num.participants[0];
    const MisheruModzin = `${num.id}-${neguin}-${num.action}`;
    const now = Date.now();
    const defaultProfilePicUrl = 'https://telegra.ph/file/a506ff9040af5593629a4.jpg'; // URL da imagem padrão
    if (MisheruModzDev.has(MisheruModzin) && (now - MisheruModzDev.get(MisheruModzin)) < 10000) {
        return;
    }
    MisheruModzDev.set(MisheruModzin, now);
    
    if (!isWelcome(num.id)) return;

    let ppimg;
    try {
        ppimg = await mitsuri.profilePictureUrl(`${participant}@c.us`, "image");
    } catch (e) {
        ppimg = defaultProfilePicUrl; // Usar a URL da imagem padrão se houver erro
    }

    let messageText, footerText, imageUrl;
    if (num.action === 'add') {
        messageText = `Opa, @${sender.split("@")[0]}, estamos felizes que você entrou no nosso grupo. Seja bem-vindo(a)!`;
        footerText = '😁';
        imageUrl = 'https://telegra.ph/file/bc9d5acf470b071d8b6ce.jpg'; // Imagem de boas-vindas
    } else if (num.action === 'remove') {
        messageText = `Tchau @${sender.split("@")[0]}, espero que se arrependa!`;
        footerText = '😔';
        imageUrl = 'https://telegra.ph/file/0b98c8d03a2191021931b.jpg'; // Imagem de despedida
    }

    const perfil = await getBuffer(ppimg);
    const pimg = await getBuffer(imageUrl); // Agora a variável imageUrl já foi inicializada

    await mitsuri.sendMessage(num.id, {
        image: pimg,
        mentions: [sender],
        caption: messageText,
        footer: footerText,
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: nomeBot,
                body: `${num.action === 'add' ? 'Bem-vindo' : 'Tchau'}: @${sender.split("@")[0]}`,
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: true,
                thumbnail: perfil,
                sourceUrl: `https://wa.me/${sender}`
            }
        }
    });
};

mitsuri.ev.removeAllListeners('group-participants.update');
mitsuri.ev.on('group-participants.update', nahidadomina);

async function blockUser(indiu, phone) {
    if (phone) {
        const userId = `${phone}@s.whatsapp.net`; // Formata o número para o formato do WhatsApp
        try {
            await mitsuri.updateBlockStatus(userId, 'block'); // Bloqueia o usuário
            console.log(`${userId} foi bloqueado com sucesso!`);
        } catch (err) {
            console.error(`Erro ao bloquear o usuário ${userId}:`, err);
        }
    } else {
        console.log('Por favor, forneça um número de telefone válido.');
    }
}


// Defina a variável uptime corretamente antes de chamar a função
const uptime = process.uptime(); // ou qualquer outro valor que esteja tentando medir em segundos

function kyun(seconds) {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60 * 60));
  var minutes = Math.floor(seconds % (60 * 60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`;
}

const convertBytes = function(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) {
    return "n/a";
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) {
    return bytes + " " + sizes[i];
  }
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Erro na requisição JSON:', error);
        throw error;
    }
}

try {
    fs.writeFileSync('./base.txt', `Usuario: ${isDono ? basDono : pushname}\ncomando: ${prefixo + comando}`);
} catch (err) {
    console.error('Erro ao manipular o arquivo:', err);
}


const ping = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "5585992039551@g.us" } : {}) }, message: {imageMessage: {caption: `ONLINE: ${kyun(uptime)}`}}}

const dado = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "5585992039551@g.us" } : {}) }, message: {imageMessage: {caption: `Resultado do: ${isDono ? basDono : pushname}`}}}

const play = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "5585992039551@g.us" } : {}) }, message: {imageMessage: {caption: `𝐔𝐒𝐄𝐑 : ${isDono ? basDono : pushname}`}}}


// Mensagens do console

if (body === !isGroup && !isCmd) {
  enviar("Sem flood, mano. Espera 3 segundos aí.");
}

const quotedMessage = {
    key: {
        fromMe: false, // Indica que a mensagem não é do próprio bot
        participant: '0@s.whatsapp.net', // Participante fictício para simular a citação
        remoteJid: '5585992039551@g.us', // JID do grupo ou contato
    },
    message: {
        conversation: 'Confira este canal no WhatsApp:\nhttps://whatsapp.com/channel/0029VagsrfS4inornNfibB2u', // Mensagem original a ser citada
    },
};

if (isGroup && !isCmd) {
    console.log(`
${chalk.cyan.bold(`╔════════════════════════════════════════════════════════════
║
║  ${chalk.red.bold(`╔═══════〘${chalk.green.bold(`MENSAGEM GRUPO`)}〙═════════╗
║  ║ ${chalk.red.bold(`⤿Grupo:`)} ${chalk.white(`${groupName}`)}
║  ║ ${chalk.red.bold(`⤿Usuário:`)} ${chalk.white(`${pushname}`)}
║  ║ ${chalk.blue.bold(`⤿Mensagem:`)} ${chalk.white(`${body}`)}
║  ╚══════════════════════════════╝`)}
║`)}    `);}
    if (isGroup && !isCmd) { console.log(`║
${chalk.cyan.bold(`║  ${chalk.red.bold(`╔═══════〘${chalk.green.bold(`COMANDO GRUPO`)}〙══════════╗
║  ║ ${chalk.red.bold(`⤿Grupo:`)} ${chalk.white(`${groupName}`)}
║  ║ ${chalk.red.bold(`⤿Usuário:`)} ${chalk.white(`${pushname}`)}
║  ║ ${chalk.blue.bold(`⤿Comando:`)} ${chalk.white(`${prefixo+comando}`)}
║  ╚══════════════════════════════╝`)}
║
╚════════════════════════════════════════════════════════════`)}`)}

if (!isGroup && !isCmd) { console.log(`
${chalk.cyan.bold(`╔════════════════════════════════════════════════════════════
║
║  ${chalk.red.bold(`╔═══════〘${chalk.yellow.bold(`COMANDO PRIVADO`)}〙═════════╗
║  ║ ${chalk.red.bold(`⤿Usuário:`)} ${chalk.white(`${pushname}`)}
║  ║ ${chalk.blue.bold(`⤿Comando:`)} ${chalk.white(`${prefixo+comando}`)}
║  ╚═══════════════════════════════╝`)}
║`)}`)}

if (!isGroup && !isCmd) { console.log(`║
${chalk.cyan.bold(`║  ${chalk.red.bold(`╔═══════〘${chalk.yellow.bold(`MENSAGEM PRIVADO`)}〙═════════╗
║  ║ ${chalk.red.bold(`⤿Usuário:`)} ${chalk.white(`${pushname}`)}
║  ║ ${chalk.blue.bold(`⤿Mensagem:`)} ${chalk.white(`${body}`)}
║  ╚═══════════════════════════════╝`)}
║
╚════════════════════════════════════════════════════════════`)}`)}

async function enviarMidiaParaApi(mediaBuffer, mediaType) {
    try {
        const tempFilePath = path.join(__dirname, `temp.${mediaType === 'image' ? 'jpg' : 'mp4'}`);
        
        // Escrever o arquivo temporariamente
        writeFileSync(tempFilePath, mediaBuffer);
        
        // Configurar o upload para a API
        const formData = new FormData();
        formData.append('file', require('fs').createReadStream(tempFilePath));

        const response = await axios.post('https://itachi-api.onrender.com/api/aleatori-video', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        // Excluir o arquivo temporário
        unlinkSync(tempFilePath);

        return response.data; // Retorna a resposta da API
    } catch (error) {
        console.error('Erro ao enviar mídia para a API:', error);
        return null;
    }
}
    

// Começo dos comandos com prefix
switch (comando) {

case 'mitsuri-api':
 reagir(from, '📡')
    try {
        await mitsuri.sendMessage(from, {
            document: {
                url: './datab/anuncio/anucio.docx'
            },
            mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            fileName: 'CRIADA E DESEVOLVIDA POR INDIUZIN MODS CLIQUE AQUI',
            footer: '⚠️',
            headerType: 4,
            gifPlayback: true,
            contextInfo: {
                externalAdReply: {
                    title: `OLÁ, SOU A ${nomeBot}`,
                    body: 'EU ESTOU ONLINE ✅',
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: false,
                    thumbnail: await getBuffer(links.links.logo),
                    sourceUrl: 'https://mitsure-api.onrender.com'
                }
            }
        });
    } catch (error) {
    reagir(from, '😦')
        console.error('Erro ao enviar mensagem:', error);
        await mitsuri.sendMessage(from, { text: '⚠️ Ocorreu um erro ao processar sua solicitação.' });
    }
    break;

case 'playstore': // case feita por @indiuzin ♨️
 await mitsuri.sendMessage(from, {
                react: { text: "⏱️", key: info.key }
            });
    if (!q) return enviar('Falta o nome do app que quer pesquisar.');

    const apiplays = `https://mitsure-api.onrender.com/playstore?nome=${q}&apikey=${apikey_mitsuri_api}`;

    try {
        const response = await axios.get(apiplays);
        const appInfo = response.data[0].resultado;
        if (!appInfo) {
            return enviar('Nenhum aplicativo encontrado com esse nome.');
        }
        const imgplay = appInfo.thumbnail;
        const tituloplays = appInfo.nome;
        const empresaplays = appInfo.desenvolvedor;
        const claseplays = appInfo.classificacao;
        const avaliplays = appInfo.avaliacao;
        const visuplays = appInfo.reviews;
        const donwsplays = appInfo.downloads;
        const linkplaye = appInfo.url;

        const resultplays = `
╭━━━━━━━━━━━━━━━━━━━╮
┃ 🎮 *Play Store - Jogo* 🎮
┃
┃ 🏷️ *Nome:* ${tituloplays}
┃ 📈 *Classificação:* ${claseplays}
┃ ⭐ *Avaliação:* ${avaliplays}
┃ 👥 *Visualizações:* ${visuplays}
┃ 🏢 *Empresa:* ${empresaplays}
┃ 📥 *Downloads:* ${donwsplays}
┃ 🔗 *Visitar:* [Clique aqui](${linkplaye})
╰━━━━━━━━━━━━━━━━━━━╯

> _by: @indiuzin ♨️_
        `;
        mitsuri.sendMessage(from, { 
            image: { url: imgplay }, 
            caption: resultplays 
        });
        await mitsuri.sendMessage(from, {
                react: { text: "✅", key: info.key }
            });
    } catch (error) {
    await mitsuri.sendMessage(from, {
                react: { text: "❌", key: info.key }
            });
        console.error('Erro ao buscar informações da Play Store:', error);
        enviar('❌ Erro ao buscar informações da Play Store.');
    }
    break;

case 'g1':
    const apig1 = 'https://mitsure-api.onrender.com/noticias-brasil?apikey=${apikey_mitsuri_api}';
    try {
        let response = await axios.get(apig1);
        let noticias = response.data.noticias;
        
        if (noticias && noticias.length > 0) {
            const randomIndex = Math.floor(Math.random() * noticias.length);
            const noticiaSelecionada = noticias[randomIndex];

            const titleg1 = noticiaSelecionada.titulo;
            const imageg1 = noticiaSelecionada.thumbnail;
            const linkg1 = noticiaSelecionada.link;
            await mitsuri.sendMessage(from, {
                react: { text: "♨️", key: info.key }
            });
            await mitsuri.sendMessage(from, {
                document: {
                    url: './datab/anuncio/anucio.docx'
                },
                mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                fileName: '📍 G1 NOTÍCIAS 24HORAS 📍',
                caption: `${titleg1}. clique no título e saiba mais`,
                footer: '♨️',
                headerType: 4,
                gifPlayback: true,
                contextInfo: {
                    externalAdReply: {
                        title: '📢 noticias de hoje',
                        body: 'by: indiuzin ♨️',
                        mediaType: 1,
                        renderLargerThumbnail: false,
                        showAdAttribution: false,
                        thumbnail: await getBuffer(imageg1),
                        sourceUrl: linkg1
                    }
                }
            });
        } else {
            await mitsuri.sendMessage(from, { text: 'Nenhuma notícia encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao obter notícias:', error.message);
        await mitsuri.sendMessage(from, { text: 'Não foi possível obter as notícias no momento. Tente novamente mais tarde.' });
    }
    break;

case 'play-vd':
    if (!q) return enviar(`falta a pesquisa exemplo ${prefixo + comando} matue`);
    try {
        const query = encodeURIComponent(q);
        const play1 = await fetchJson(`https://mitsure-api.onrender.com/play1?query=${query}&apikey=${apikey_mitsuri_api}`);

        if (play1 && play1.length > 0) {
            const videoInfo = play1[0];
            const videoUrl = videoInfo.link;
            const title = videoInfo.title;
            const views = Number(videoInfo.views).toLocaleString();
            const duration = videoInfo.duration;

            const captionText = `🎶 *${title}*\n👀 *Visualizações:* ${views}\n⏱️ *Duração:* ${duration}`;
            await mitsuri.sendMessage(from, {
                video: { url: videoUrl },
                mimetype: 'video/mp4',
                caption: captionText
            });
        } else {
            mitsuri.sendMessage(from, { text: 'Nenhum vídeo encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao tentar buscar ou enviar o vídeo:', error);
        mitsuri.sendMessage(from, { text: 'Erro ao tentar buscar ou enviar o vídeo.' });
    }
    break;

case 'corinthians': {//by: indiuzin estraga xereca 🤪
    const apiGet = `https://mitsure-api.onrender.com/corinthians?apikey=${apikey_mitsuri_api}`;
    try {
        const response = await axios.get(apiGet);
        const data = response.data[0];
        const imgGet = data.thumbnail;
        const titologet = data.titulo;
        const descget = data.descricao;
        await mitsuri.sendMessage(from, {
            image: { url: imgGet },
            caption: `🗞️ *Título:* ${titologet}\n*Descrição:* ${descget}`
        });
    } catch (error) {
        console.error("Erro ao buscar ou enviar os dados:", error);
        await mitsuri.sendMessage(from, { 
            text: "❌ *Ocorreu um erro ao tentar buscar as informações do Corinthians.*\nPor favor, tente novamente mais tarde." 
        });
    }
    break;
}

case 'hapymod':
    try {
        mitsuri.sendMessage(from, { react: { text: `🕕`, key: info.key } });
        const apiv = await fetchJson(`https://mitsure-api.onrender.com/api/happymode?apikey=${apikey_mitsuri_api}`);
        if (apiv.length > 0) {
            let noticias = apiv.map((item, index) => `${index + 1}. *${item.titulo}*\n${item.url}`).join('\n\n');
            enviar(`📰 *Notícias HappyMod:*\n\n${noticias}`);
        } else {
            enviar('❌ Nenhuma notícia encontrada.');
        }

    } catch (erro) {
        reagir(from, "❌");
        console.log(erro);
    }
    break;

case 'togif':
if(!isQuotedSticker) return enviar('Marque a figurinha animada!')
try {
if((isMedia && !info.message.videoMessage || isQuotedSticker) && !q.length <= 1) {
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
enviar('Aguarde, estou convertendo a figurinha para o formato gif.')
a = await webp_mp4(buff)
mitsuri.sendMessage(from, {video: {url: a}, gifPlayback: true, fileName: `stick.gif`}, {quoted: sasah}).catch(e => {
enviar("Erro ao realizar o envio do sticker!") 
})
DLT_FL(buff)
}
} catch {
enviar(e)
}
break

    case 'ft':
        if (!quotedMessage || !quotedMessage.message || (!quotedMessage.message.imageMessage && !quotedMessage.message.videoMessage)) {
            await mitsuri.sendMessage(from, { text: 'Por favor, responda a uma imagem ou vídeo!' });
            break;
        }

        // Verifica se a mídia é uma imagem ou vídeo
        const mediaType = quotedMessage.message.imageMessage ? 'image' : 'video';
        const mediaMessage = mediaType === 'image' ? quotedMessage.message.imageMessage : quotedMessage.message.videoMessage;

        const mediaBuffer = await mitsuri.downloadMediaMessage(quotedMessage);

        // Envia a mídia para a API
        const resultado = await enviarMidiaParaApi(mediaBuffer, mediaType);

        if (resultado) {
            await mitsuri.sendMessage(from, { text: `Mídia enviada com sucesso!\nLink: ${resultado.url}` });
        } else {
            await mitsuri.sendMessage(from, { text: 'Falha ao enviar a mídia para a API.' });
        }
        break;

case 'block':
 await blockUser(indiu, sender); // Chama a função de bloqueio
 break;



case 'reiniciar'://by indiuzin
reagir(from, "🌀")
enviar(`O bot está sendo reiniciado...`);
  if (!isDono) {
    return enviar(`Só quem tem permissão pode reiniciar o bot.`);
  }
  console.log(`${chalk.green(`reiniciando...`)}`)
  setTimeout(() => {
    process.exit(0);
  }, 1000); 
  break;

case 'luta':
const { monstros, monstroAleatorio, ataques, getAtaqueAleatorio, getlink} = require('./arquivos/monstros/monstro.js')


const ataqueMonstro = getAtaqueAleatorio();
const ataqueUsuario = getAtaqueAleatorio();
const monstro2 = monstroAleatorio();
const gif1 = getlink();

Mobse = await fetchJson(`https://tohka.tech/api/pesquisa/pinterest?nome=${monstro2}&apikey=${api_kay1}`)
iconmob = await getBuffer(`${Mobse[1]}`)

const g = Math.floor(Math.random() * 2) // 0 a 6
const D = Math.floor(Math.random() * 200) // 0 a 200
const C = Math.floor(Math.random() * 100) // 0 a 100
const viih = Math.floor(Math.random() * 16) // 0 a  15
const viih2 = Math.floor(Math.random() * 60) 

const chance = `> *A batalha já começou e até agora não ouve um resultado. sua chance é: ${C}%*`
const vitoria = `🍂 *você venceu essa luta.*\n\n⚔️ *Derrotado: ${monstro2}*\nPerdeu: ${viih}  HP\n💰 *Recompensa: R$${D},00.*`
const perdeu = `> 🍂 *${pushname} foi derrotado por ${monstro2}*\n\n🪤 *você perdeu: ${viih2}HP*\n📜 *Descontado: R$${D},00 Pela derrota.*`
const empate = `🤝 Houve um acordo de paz... 🤝`
const batalha = `> *${monstro2} x ${pushname}*\n\n*Seu Oponente: ${monstro2}*\n*Ataque: ${ataqueMonstro}*\n\n*Aventureiro: ${pushname}*\n*Ataque: ${ataqueUsuario}*`

const img = (img, p) => {
  mitsuri.sendMessage(from, {image: img, caption: p})
}

const vid = (img, p) => {
  mitsuri.sendMessage(from, {
    video: {url: img}, gifPlayback: true, caption: p
  })
}

if (g == 0) {
  enviar('> 🍂 *Nenhum  inimigo foi avistado*')
} else if (g == 1) {
  img(iconmob, batalha)
  await sleep(100) // 4s
  vid(gif1, chance)
  await sleep(40000)
  if (C <= 50) {
    enviar(perdeu)
    removeHP(sender, viih2)
    confirmarMoney(sender, D)
  } else if (C >= 60) {
    enviar(vitoria)
    removeHP(sender, viih)
    addMoney(sender, D)
  } else if (C <= 51 || C >= 59) {
    reply(empate)
  }
} 

break

case 'setprefix': // BY INDIUZIN
    if (args.length < 1) {
        return enviar(`Oi ${isDono ? basDono : pushname}, forneça um novo prefixo ${!isDono ? Messfdp : ''}.`);
    }
    if (!isDono) {
        return enviar('*Só meu dono pode mudar meu prefixo.*');
    }
    const Messfdp = '*filho da puta*';
    const newPrefix = args[0];
    await sleep(100) 
    enviar(`Prefixo foi alterado com sucesso para: ${newPrefix}. Aguarde 15 segundos para o bot reiniciar.`);
    const content = `// Configurações & Informações

const configurações = {
  prefixo: "${newPrefix}",
  nomeBot: "𝐁𝐀𝐒𝐄 𝐈𝐍𝐃𝐈𝐔𝐙𝐈𝐍",
  nomeDono: "𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽",
  numeroDono: "558592039551",
  api_key2: "Z89EX",
  api_key1: "o3Iez"
}

global.configurações = configurações; // indiu >|<`;

    fs.writeFileSync('./datab/dono/env/info.js', content);
    break;

case 'nome':
if (!q) return enviar('TIPO DE CONSULTA INAVALIDA!')
try {
gabz = await fetchJson(`https://nodz.xyz/api/consultas/nome?query=${q}&apitoken=INDIUZIN`)
mitsuri.sendMessage(from, {image: {url: `${logoBot}`}, caption: `${gabz.resultado}`}, {quoted: info})
} catch (error) {
console.log(error)
}
break






case 'cpf':
if (!q) return enviar('TIPO DE CONSULTA INAVALIDA!')
try {
gabz = await fetchJson(`https://nodz.xyz/api/consultas?type=cpf&query=${q}&apitoken=INDIUZIN`)
mitsuri.sendMessage(from, {image: {url: `${logoBot}`}, caption: `${gabz.resultado}`}, {quoted: info})
} catch (error) {
console.log(error)
}
break

case 'rankserial':
case 'rks':

const serial1 = groupMembers;
const serial2 = groupMembers;
const serial3 = groupMembers;
const serial4 = groupMembers;
const serial5 = groupMembers;
const serial6 = groupMembers;
const serial7 = groupMembers;
const serial8 = groupMembers;
const serial9 = groupMembers;
const serial10 = groupMembers;

// Gerando as menções para os seriais
const par1 = serial1[Math.floor(Math.random() * serial1.length)];
const par2 = serial2[Math.floor(Math.random() * serial2.length)];
const par3 = serial3[Math.floor(Math.random() * serial3.length)];
const par4 = serial4[Math.floor(Math.random() * serial4.length)];
const par5 = serial5[Math.floor(Math.random() * serial5.length)];
const par6 = serial6[Math.floor(Math.random() * serial6.length)];
const par7 = serial7[Math.floor(Math.random() * serial7.length)];
const par8 = serial8[Math.floor(Math.random() * serial8.length)];
const par9 = serial9[Math.floor(Math.random() * serial9.length)];
const par10 = serial10[Math.floor(Math.random() * serial10.length)];

// Lista de chances aleatórias
const rec = [
    "Você será o próximo na minha lista.", 
    "Sinto um prazer sádico ao te observar.",
    "A tua agonia é a minha diversão.",
    "Eu planejo cada passo com precisão.",
    "A tua dor é a minha recompensa.",
    "A cada passo teu, sinto o cheiro do medo.",
    "Vivo para ver a luz se apagar nos teus olhos.",
    "Você não sabe o que te aguarda na escuridão.",
    "Cada escolha tua é um jogo para mim.",
    "Teu destino é selado pelo meu desejo de controle.",
    "A minha paciência é o meu maior trunfo.",
    "Fico atento a cada movimento teu.",
    "A minha mente não conhece limites.",
    "Teus gritos são música para os meus ouvidos.",
    "Vejo você como uma peça em meu jogo macabro.",
    "A minha diversão é o teu sofrimento.",
    "O medo que você sente é o que eu procuro.",
    "O teu desespero é o meu deleite.",
    "Estou sempre um passo à frente.",
    "Cada respiração tua é um lembrete do meu controle.",
    "O teu pânico é o que me alimenta."
];

// Gerando a mensagem para os seriais
const messRank = `𝙊𝙎 𝟱 𝗦𝗘𝗥𝗜𝗔𝗜𝗦 𝙆𝙄𝙇𝙇𝙀𝙍𝙎 𝘿𝙊 𝙂𝙍𝙐𝙋𝙊:\n\n➢ 𝟭⁰ 𝗦𝗘𝗥𝗜𝗔𝗟: @${par1.id.split('@')[0]} 🤡\n• *${rec[Math.floor(Math.random() * rec.length)]}*\n\n➢ 𝟮⁰ 𝗦𝗘𝗥𝗜𝗔𝗟: @${par3.id.split('@')[0]} 🤡\n• *${rec[Math.floor(Math.random() * rec.length)]}*\n\n➢ 𝟯⁰ 𝗦𝗘𝗥𝗜𝗔𝗟: @${par5.id.split('@')[0]} 🤡\n• *${rec[Math.floor(Math.random() * rec.length)]}*\n\n➢ 𝟰⁰ 𝗦𝗘𝗥𝗜𝗔𝗟: @${par7.id.split('@')[0]} 🤡\n• *${rec[Math.floor(Math.random() * rec.length)]}*\n\n➢ 𝟱⁰ 𝗦𝗘𝗥𝗜𝗔𝗟: @${par9.id.split('@')[0]} 🤡\n• *${rec[Math.floor(Math.random() * rec.length)]}*`;

await mitsuri.sendMessage(from, {
    image: fs.readFileSync(path.join(__dirname, './arquivos/rank.png')), // Corrigido o uso do 'path'
    mimetype: 'image/png',
    caption: messRank,
    mentions: [par1.id, par2.id, par3.id, par4.id, par5.id, par6.id, par7.id, par8.id, par9.id, par10.id] // Menções dos seriais
});
break;

case 'rankmaster':
case 'rkm':

const master1 = groupMembers;
const master2 = groupMembers;
const master3 = groupMembers;
const master4 = groupMembers;
const master5 = groupMembers;
const master6 = groupMembers;
const master7 = groupMembers;
const master8 = groupMembers;
const master9 = groupMembers;
const master10 = groupMembers;

// Gerando as menções para os masters
const mas1 = master1[Math.floor(Math.random() * master1.length)];
const mas2 = master2[Math.floor(Math.random() * master2.length)];
const mas3 = master3[Math.floor(Math.random() * master3.length)];
const mas4 = master4[Math.floor(Math.random() * master4.length)];
const mas5 = master5[Math.floor(Math.random() * master5.length)];
const mas6 = master6[Math.floor(Math.random() * master6.length)];
const mas7 = master7[Math.floor(Math.random() * master7.length)];
const mas8 = master8[Math.floor(Math.random() * master8.length)];
const mas9 = master9[Math.floor(Math.random() * master9.length)];
const mas10 = master10[Math.floor(Math.random() * master10.length)];

// Mensagens motivacionais ou desafiadoras
const challenge = [
    "Você tem o que é preciso para ser o melhor?",
    "Prepare-se para o próximo nível.",
    "O desafio está lançado.",
    "Só os mais fortes sobrevivem.",
    "Mostre sua verdadeira habilidade.",
    "A competição está acirrada.",
    "Você está pronto para o teste final?",
    "Sua resistência será colocada à prova.",
    "É hora de se destacar.",
    "Quem será o mestre supremo?",
    "A vitória exige coragem e determinação.",
    "O topo não é para os fracos.",
    "Seja o melhor ou fique para trás.",
    "A batalha pela supremacia começa agora.",
    "Prove que você é digno do título.",
    "O jogo mudou, e você?",
    "A jornada para a glória não é fácil.",
    "Apenas os melhores podem brilhar.",
    "Você está preparado para o desafio?",
    "O caminho para a vitória é árduo."
];

// Gerando a mensagem para os masters
const messRankMaster = `🌟 𝙊 𝟱 𝗠𝗔𝗦𝗧𝗘𝗥𝗦 𝙏𝙍𝘼𝙉𝙀𝙉𝗗𝗘𝗡𝗧𝗘𝗦 🌟\n\n➢ 𝟭𝒔𝒕 𝗠𝗔𝗦𝗧𝗘𝗥: @${mas1.id.split('@')[0]} 🏆\n• *${challenge[Math.floor(Math.random() * challenge.length)]}*\n\n➢ 𝟮ⁿ𝗱 𝗠𝗔𝗦𝗧𝗘𝗥: @${mas3.id.split('@')[0]} 🏆\n• *${challenge[Math.floor(Math.random() * challenge.length)]}*\n\n➢ 𝟯𝗿𝗱 𝗠𝗔𝗦𝗧𝗘𝗥: @${mas5.id.split('@')[0]} 🏆\n• *${challenge[Math.floor(Math.random() * challenge.length)]}*\n\n➢ 𝟰𝘁𝗵 𝗠𝗔𝗦𝗧𝗘𝗥: @${mas7.id.split('@')[0]} 🏆\n• *${challenge[Math.floor(Math.random() * challenge.length)]}*\n\n➢ 𝟱𝘁𝗵 𝗠𝗔𝗦𝗧𝗘𝗥: @${mas9.id.split('@')[0]} 🏆\n• *${challenge[Math.floor(Math.random() * challenge.length)]}*`;

await mitsuri.sendMessage(from, {
    image: {url: logoBot}, // Ajuste a imagem conforme necessário
    caption: messRankMaster,
    mentions: [mas1.id, mas2.id, mas3.id, mas4.id, mas5.id, mas6.id, mas7.id, mas8.id, mas9.id, mas10.id] // Menções dos masters
});
break;

case 'rankheroes':
case 'rkh':

const hero1 = groupMembers;
const hero2 = groupMembers;
const hero3 = groupMembers;
const hero4 = groupMembers;
const hero5 = groupMembers;
const hero6 = groupMembers;
const hero7 = groupMembers;
const hero8 = groupMembers;
const hero9 = groupMembers;
const hero10 = groupMembers;

// Gerando as menções para os heróis
const her1 = hero1[Math.floor(Math.random() * hero1.length)];
const her2 = hero2[Math.floor(Math.random() * hero2.length)];
const her3 = hero3[Math.floor(Math.random() * hero3.length)];
const her4 = hero4[Math.floor(Math.random() * hero4.length)];
const her5 = hero5[Math.floor(Math.random() * hero5.length)];
const her6 = hero6[Math.floor(Math.random() * hero6.length)];
const her7 = hero7[Math.floor(Math.random() * hero7.length)];
const her8 = hero8[Math.floor(Math.random() * hero8.length)];
const her9 = hero9[Math.floor(Math.random() * hero9.length)];
const her10 = hero10[Math.floor(Math.random() * hero10.length)];

// Mensagens inspiradoras ou engraçadas
const quotes = [
    "O verdadeiro herói é aquele que nunca desiste!",
    "Você pode não ter capa, mas é um herói!",
    "Os verdadeiros heróis salvam o dia, todos os dias!",
    "Todo mundo é um herói, só precisa encontrar seu superpoder.",
    "Heróis não são feitos, são criados pelas suas ações!",
    "Cada dia é uma nova oportunidade para ser um herói.",
    "Heróis são aqueles que fazem a diferença, grande ou pequena.",
    "Não subestime o poder de um herói comum!",
    "Ser herói é mais sobre atitude do que sobre poderes.",
    "Você pode não ter uma identidade secreta, mas é um verdadeiro herói!",
    "Às vezes, um sorriso é o maior poder de um herói.",
    "Heróis são aqueles que nunca abandonam seus amigos.",
    "Ser um herói é lutar pela justiça e pela amizade.",
    "A verdadeira força de um herói está em seu coração.",
    "Heróis são feitos de coragem, não de músculos.",
    "Cada pequeno ato de bondade é um feito heroico.",
    "Você é o herói que esta equipe precisava!",
    "Cada dia é uma nova chance de brilhar como um herói.",
    "Ser um herói é uma questão de fazer a coisa certa.",
    "O mundo precisa de mais pessoas como você!"
];

// Gerando a mensagem para os heróis
const messRankHeroes = `🎉 𝙊𝙎 𝟱 𝗛𝗘𝗥𝗢𝗜𝗦 𝙈𝘼𝙎 𝗚𝗜𝗟𝗧𝗬 🎉\n\n➢ 𝟭𝒔𝒕 𝗛𝗘𝗥𝗢𝗜𝗦: @${her1.id.split('@')[0]} 🦸\n• *${quotes[Math.floor(Math.random() * quotes.length)]}*\n\n➢ 𝟮ⁿ𝗱 𝗛𝗘𝗥𝗢𝗜𝗦: @${her3.id.split('@')[0]} 🦸\n• *${quotes[Math.floor(Math.random() * quotes.length)]}*\n\n➢ 𝟯𝗿𝗱 𝗛𝗘𝗥𝗢𝗜𝗦: @${her5.id.split('@')[0]} 🦸\n• *${quotes[Math.floor(Math.random() * quotes.length)]}*\n\n➢ 𝟰𝘁𝗵 𝗛𝗘𝗥𝗢𝗜𝗦: @${her7.id.split('@')[0]} 🦸\n• *${quotes[Math.floor(Math.random() * quotes.length)]}*\n\n➢ 𝟱𝘁𝗵 𝗛𝗘𝗥𝗢𝗜𝗦: @${her9.id.split('@')[0]} 🦸\n• *${quotes[Math.floor(Math.random() * quotes.length)]}*`;

await mitsuri.sendMessage(from, {
    image: {url: logoBot},
    caption: messRankHeroes,
    mentions: [her1.id, her2.id, her3.id, her4.id, her5.id, her6.id, her7.id, her8.id, her9.id, her10.id] // Menções dos heróis
});
break;

case 'addcmd':
    if (!isDono) return enviar('*JAJA QUE EU VOU BOTAR CASE SEM SER MEU DONO MANDANDO 🤨*');

    // Lê o conteúdo do arquivo
    const conteudoArquivo = fs.readFileSync('index.js', 'utf8');

    // Define a posição onde o novo case deve ser inserido (logo após o switch)
    const posicaoInserir = conteudoArquivo.indexOf('switch (comando) {') + 'switch (comando) {'.length;

    // Novo case que será adicionado, corrigido para evitar as aspas extras
    const novoCase = `\n\n${q}'\n    // BY INDIUZIN\n    break;`;

    // Concatena o novo conteúdo
    const novoConteudo = [
        conteudoArquivo.slice(0, posicaoInserir),
        novoCase,
        conteudoArquivo.slice(posicaoInserir)
    ].join('');

    // Escreve o novo conteúdo no arquivo
    fs.writeFileSync('index.js', novoConteudo);

    enviar('Nova case adicionada com sucesso!');
    break;

case 'tigrinho': {
const frutas = [
'🍊 : 🍒 : 🍐',
'🍒 : 🍓 : 🍊',
'🍇 : 🍇 : 🍇',
'🍊 : 🍋 : 🍓',
'🍇 : 🍒 : 🍐',
'🍉 : 🍒 : 🍊',
'🍊 : 🍋 : ??',		
'🍐 : 🍒 : 🍋',
'🍐 : 🍐 : 🍐',
'🍊 : 🍒 : 🍒',
'🍓 : 🍓 : 🍓',
'🍌 : 🍒 : 🔔',
'🥑 : 🥑 : 🥑',
'🎰 : 🎰 : 🎰',
'🍊 : 🍋 : 🍒',
'🍋 : 🍋 : 🍌',
'🍌 : 🍌 : 🍇',
'🍌 : 🍑 : 🍇',
'🍌 : 🍌 : 🍌',
'🍎 : 🍒 : 🍒',
'🍊 : 🍌 : 🍌',
'🍉 : 🍉 : 🍉',
'🍑 : 🍊 : 🥭',
'🍎 : 🍎 : 🍑',
'🍊 : 🍊 : 🍊',
'🥝 : 🍉 : 🍎',]
const somtoy2 = frutas[Math.floor(Math.random() * frutas.length)]
const dinheiro = Math.floor(Math.random() * 100)
const dinheiro1 = Math.floor(Math.random() * 100000)
if ((somtoy2 == '🥑 : 🥑 : 🥑') ||(somtoy2 == '🍉 : 🍉 : 🍉') ||(somtoy2 == '🍓 : 🍓 : 🍓') ||(somtoy2 == '🍎 : 🍎 : 🍎') ||(somtoy2 == '🍍 : 🍍 : 🍍') ||(somtoy2 == '🥝 : 🥝 : 🥝') ||(somtoy2 == '🍑 : 🍑 : 🍑') ||(somtoy2 == '🥥 : 🥥 : 🥥') ||(somtoy2 == '🍋 : 🍋 : 🍋') ||(somtoy2 == '🍐 : 🍐 : 🍐') ||(somtoy2 == '🍌 : 🍌 : 🍌') ||(somtoy2 == '?? : 🍒 : 🍒') ||(somtoy2 == '🍊 : 🍊 : 🍊') ||(somtoy2 == '🍇 : 🍇 : 🍇')) {
var Vitória = `🏛Voce ganhou meu amigo R$ ${dinheiro}🏛`	
}  else if (somtoy2 == '🎰 : 🎰 : 🎰') {var Vitória = `🎰🎰🎰 MEGA JACKPOT 🎰🎰🎰\n${pushname}  você ganhou R$ ${dinheiro1}`
} else {
var Vitória = `🫠 ${pushname} você perdeu: ${dinheiro}`
}

await mitsuri.sendMessage(from, {text: `
╭━━━━❪🎰❫━━━━
┣► ${somtoy2}◄┛      
┗━━━━❪💰❫━━━━
*${Vitória}*`
},{quoted: info});
}
break

case 'tigrin':
mitsuri.sendMessage(from, { text: `
┎──────────────────────
 |   PARABÉNS: ${pushname}
 |              ${gerarFrutaOuNumero()}
┖──────────────────────` })
break

case 'apost-dado': {
  const numeros = [1, 2, 3, 4, 5, 6];
  const numeroEscolhido = numeros[Math.floor(Math.random() * numeros.length)];
  let premio;

  switch (numeroEscolhido) {
    case 1:
      premio = 'R$10,00';
      break;
    case 2:
      premio = 'R$20,00';
      break;
    case 3:
      premio = 'R$30,00';
      break;
    case 4:
      premio = 'R$40,00';
      break;
    case 5:
      premio = 'R$50,00';
      break;
    case 6:
      premio = 'R$100,00';
      break;
    default:
      premio = 'Nada';
  }

  let mensagem = premio === 'Nada' ? 
    `🎲 Que pena! Você rolou um ${numeroEscolhido}, mas não ganhou nada desta vez.` :
    `🎲 Você rolou um ${numeroEscolhido} e ganhou ${premio}! Parabéns!`;

  await mitsuri.sendMessage(from, { text: `
╭━━━━❪🎲❫━━━━
┣► Número rolado: ${numeroEscolhido} ◄┛
┗━━━━❪💰❫━━━━
*${mensagem}*
  ` }, { quoted: info });
}
break

case 'loteria': {
  const numerosSorteados = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 1);
  const escolha = message.text.split(' ').slice(1).map(Number); // Supõe que os números escolhidos são passados após o comando
  const acertos = escolha.filter(num => numerosSorteados.includes(num)).length;
    let premio;
    switch (acertos) {
      case 5:
        premio = 'R$1000,00';
        break;
      case 4:
        premio = 'R$500,00';
        break;
      case 3:
        premio = 'R$100,00';
        break;
      default:
        premio = 'Nada';
    }

    let mensagem = premio === 'Nada' ? 
      `😕 Você acertou ${acertos} números. Não ganhou prêmio desta vez.` :
      `🎉 Parabéns! Você acertou ${acertos} números e ganhou ${premio}! 🎉`;

    await mitsuri.sendMessage(message.from, { text: `
╭━━━━❪🎟️❫━━━━
┣► Números sorteados: ${numerosSorteados.join(', ')}
┣► Seus números: ${escolha.join(', ')}
┗━━━━❪💰❫━━━━
*${mensagem}*
    ` }, { quoted: message });
  }break

case 'gpt':
if (!q) return enviar(`> *${pushname} você precisa fazer uma pergunta para continuar.*`);
try {
const response = await fetchJson(`https://tohka.tech/api/outros/chatgpt?pergunta=${encodeURIComponent(q)}&apikey=${api_kay2}`)
mitsuri.sendMessage(from, {text: `${response.resposta}`}, {quoted: info})
} catch (error) {
console.error(error);
enviar('Erro ao conectar com a API');
}
break;

case 'spotify':
  if (!q) {
    return enviar(`Falta o nome da música. Exemplo: ${prefixo + comando} teto m4`);
  }

  reagir(from, "⏱️");

  try {
    const apiz = await fetchJson(`https://tohka.tech/api/pesquisa/spotify?nome=${q}&apikey=${api_kay2}`);
    const apidl = await fetchJson(`https://tohka.tech/api/dl/spotify?link=${apiz[0].link}&apikey=${api_kay2}`);

    await mitsuri.sendMessage(from, {
      audio: { url: `${apidl.resultado.download}` },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        "externalAdReply": {
          "showAdAttribution": true,
          "containsAutoReply": true,
          "renderLargerThumbnail": true,
          "title": apidl.resultado.titulo,
          "mediaType": 1,
          "thumbnail": await getBuffer(`${apidl.resultado.capa}`),
          "mediaUrl": apiz[0].link,
          "sourceUrl": apiz[0].link
        }
      }
    }, {quoted: play});

    reagir(from, "✅");
  } catch (e) {
    console.log(e);
    enviar("*Não encontrei essa música, por favor, seja mais específico.*");
    reagir(from, "✖️");
  }
  break;

case 'banir': case 'kick':
if(!isBotadm) return enviar(`so os adm pode usar esse comando`)
if(!isBotadm) return enviar(`eu preciso ser adm pra esse comasno funcionar`)
try {
if(!menc_os2 || menc_jid2[1]) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("Este usuário já foi removido do grupo ou saiu.")
if(numeroBot.includes(menc_os2)) return enviar('*✖️ - Infelizmente não consigo me banir, Mais você pode me remover manualmente ')
if(JSON.stringify(numeroDono).indexOf(menc_os2) >= 0) return enviar('*🤬  Não vou remover meu dono.*')

mitsuri.sendMessage(from, {text: `o Usuário @${menc_os2.split("@")[0]} aqui Foi Removido com sucesso`, mentions: [menc_os2]})
mitsuri.groupParticipantsUpdate(from, [menc_os2], "remove")
} catch (e) {
console.log(e)
}
break

case 'reviver': case 'add':
            if (!isBotadm) return enviar(`*Eu presiso se tornar adm 😔*`)
            if (!isAdm) return enviar(`so adm pode usar esse coamando`)
            if (!q && info.message.extendedTextMessage === null) return enviar('Marque a mensagem ou coloque o número de quem você quer adicionar no grupo')
            try {
              useradd = `${args.join(" ").replace(/\D/g, '')}` ? `${args.join(" ").replace(/\D/g, '')}`: info.message.extendedTextMessage.contextInfo.participant
              let id = `${useradd.replace(/\D/g, '')}`
              if (!id) return enviar(`Número inválido`)
              let [result] = await  mitsuri.onWhatsApp(id)
              if (!result) return enviar(`Esse número não está registrado no WhatsApp`)
              let response = await  mitsuri.groupParticipantsUpdate(from, [result.jid], "add")
              if (response[0].status == "409") {
                 mitsuri.sendMessage(from, {
                  text: `Ele já está no grupo, como eu vou adicionar?`, mentions: [result.jid, sender]})
              } else if (response[0].status == "403") {
                 mitsuri.sendMessage(from, {
                  text: `Não consegui adicionar o @${result.jid.split("@")[0]} porque ele privou a conta`, mentions: [result.jid, sender]})
              } else if (response[0].status == "408") {
                 mitsuri.sendMessage(from, {
                  text: `Não consegui adicionar o @${result.jid.split("@")[0]} porque ele saiu recentemente do grupo.`, mentions: [result.jid, sender]})
              } else if (response[0].status == "401") {
                 mitsuri.sendMessage(from, {
                  text: `Não consegui adicionar o @${result.jid.split("@")[0]} porque ele bloqueou o bot`, mentions: [result.jid, sender]})
              } else if (response[0].status == "200") {
                 mitsuri.sendMessage(from, {
                  text: `Prontinho fiz o que você pediu`, mentions: [result.jid, sender]})
              } else {
                enviar("Vish acho que algo deu errado")
              }
            } catch {}
            break

case 'google': {
    if (!q) return enviar(`⚠️ *Por favor, forneça o termo de pesquisa!*\n\nExemplo: ${prefixo + comando} termo pesquisa`);

    const apiUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`;

    try {
        // Enviar mensagem de carregamento com animação e mais estilo
        const loadingMessage = await mitsuri.sendMessage(from, { 
            text: "🔎 *Buscando resultados no Google...*\nPor favor, aguarde enquanto o " + nomeBot + " coleta as informações.", 
            quoted: info 
        });

        // Simulação de dados adicionais (como seria obtido pela API)
        const estimatedResults = 'Cerca de 1.230.000 resultados';
        const searchTime = '0.48 segundos';
        const snippet = 'Aqui está uma prévia do resultado mais relevante:\n\n"Este é um exemplo de como o Google apresenta...".';

        // Criar o resultado da pesquisa com mais informações e formatação
        const results = `📋 *Resultados da pesquisa:* "${q}"\n\n` +
                        `🌐 *Número de:* ${estimatedResults}\n` +
                        `⏱️ *Tempo de busca:* ${searchTime}\n\n` +
                        `${snippet}\n\n` +
                        `   🔗 *[Clique aqui para ver os resultados]\n*( ${apiUrl} )*\n`;

        // Enviar resultados com imagem, mais detalhes e animação
        await mitsuri.sendMessage(from, {
            text: results,
            footer: '🔍 Resultado fornecido pelo ' + nomeBot,
            contextInfo: {
                externalAdReply: {
                    title: '🔗 Google Search Result',
                    body: 'RESULTADO DA SUA PESQUISA',
                    mediaType: 1,
                    renderLargerThumbnail: false, // Exibir uma miniatura maior
                    showAdAttribution: false, // Mostrar atribuição de anúncio
                    thumbnail: await getBuffer('https://telegra.ph/file/e56463e6990df2126f1fe.jpg'), // Logo do Google
                    sourceUrl: apiUrl // Link direto para a pesquisa
                }
            }
        }, { quoted: dado });
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);

        // Mensagem de erro estilizada
        await mitsuri.sendMessage(from, { 
            text: "❌ *Ocorreu um erro ao tentar buscar os resultados.*\n\nTente novamente mais tarde ou verifique sua conexão.", 
            quoted: info 
        });
    }
} break;

case 'youtube': {
    if (!q) return enviar(`⚠️ *Por favor, forneça o termo de pesquisa!*\n\nExemplo: ${prefixo + comando} nome do vídeo`);

    const apiUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

    try {
        // Enviar mensagem de carregamento com animação e mais estilo
        const loadingMessage = await mitsuri.sendMessage(from, { 
            text: "🎥 *Buscando vídeos no YouTube...*\nPor favor, aguarde enquanto o " + nomeBot + " coleta as informações.", 
            quoted: info 
        });

        // Simulação de dados adicionais (como seria obtido pela API)
        const estimatedResults = 'Cerca de 500.000 vídeos encontrados';
        const searchTime = '0.89 segundos';
        const snippet = 'Aqui está uma prévia do vídeo mais relevante:\n\n"Este é um exemplo de como o YouTube apresenta...".';

        // Criar o resultado da pesquisa com mais informações e formatação
        const results = `📋 *Resultados da pesquisa:* "${q}"\n\n` +
                        `📊 *Número de vídeos:* ${estimatedResults}\n` +
                        `⏱️ *Tempo de busca:* ${searchTime}\n\n` +
                        `${snippet}\n\n` +
                        `   🔗 *[Clique aqui para ver os vídeos]\n*( ${apiUrl} )*\n`;

        // Enviar resultados com imagem, mais detalhes e animação
        await mitsuri.sendMessage(from, {
            text: results,
            footer: '🎬 Resultado fornecido pelo ' + nomeBot,
            contextInfo: {
                externalAdReply: {
                    title: '🎥 YouTube Search Result',
                    body: 'RESULTADO DA SUA PESQUISA',
                    mediaType: 1,
                    renderLargerThumbnail: false, // Exibir uma miniatura maior
                    showAdAttribution: false, // Mostrar atribuição de anúncio
                    thumbnail: await getBuffer('https://telegra.ph/file/0bc6f6e9e32e2d120b43f.jpg'), // Logo do YouTube
                    sourceUrl: apiUrl // Link direto para a pesquisa
                }
            }
        }, { quoted: dado });
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);

        // Mensagem de erro estilizada
        await mitsuri.sendMessage(from, { 
            text: "❌ *Ocorreu um erro ao tentar buscar os vídeos.*\n\nTente novamente mais tarde ou verifique sua conexão.", 
            quoted: info 
        });
    }
} break;

case 'spotify': {
    if (!q) return enviar(`⚠️ *Por favor, forneça o termo de pesquisa!*\n\nExemplo: ${prefixo + comando} nome da música/artista`);

    const apiUrl = `https://open.spotify.com/search/${encodeURIComponent(q)}`;

    try {
        // Enviar mensagem de carregamento com animação e mais estilo
        const loadingMessage = await mitsuri.sendMessage(from, { 
            text: "🎧 *Buscando músicas no Spotify...*\nPor favor, aguarde enquanto o " + nomeBot + " coleta as informações.", 
            quoted: info 
        });

        // Simulação de dados adicionais (como seria obtido pela API)
        const estimatedResults = 'Cerca de 300.000 músicas encontradas';
        const searchTime = '1.20 segundos';
        const snippet = 'Aqui está uma prévia do resultado mais relevante:\n\n"Este é um exemplo de como o Spotify apresenta...".';

        // Criar o resultado da pesquisa com mais informações e formatação
        const results = `📋 *Resultados da pesquisa:* "${q}"\n\n` +
                        `🎵 *Número de músicas:* ${estimatedResults}\n` +
                        `⏱️ *Tempo de busca:* ${searchTime}\n\n` +
                        `${snippet}\n\n` +
                        `   🔗 *[Clique aqui para ver no Spotify]*\n(${apiUrl})\n`;

        // Enviar resultados com imagem, mais detalhes e animação
        await mitsuri.sendMessage(from, {
            text: results,
            footer: '🎶 Resultado fornecido pelo ' + nomeBot,
            contextInfo: {
                externalAdReply: {
                    title: '🎧 Spotify Search Result',
                    body: 'RESULTADO DA SUA PESQUISA',
                    mediaType: 1,
                    renderLargerThumbnail: false, // Exibir uma miniatura maior
                    showAdAttribution: false, // Mostrar atribuição de anúncio
                    thumbnail: await getBuffer('https://telegra.ph/file/aa71a9900d15e2842d60a.jpg'), // Logo do Spotify
                    sourceUrl: apiUrl // Link direto para a pesquisa
                }
            }
        }, { quoted: dado });
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);

        // Mensagem de erro estilizada
        await mitsuri.sendMessage(from, { 
            text: "❌ *Ocorreu um erro ao tentar buscar as músicas.*\n\nTente novamente mais tarde ou verifique sua conexão.", 
            quoted: info 
        });
    }
} break;

case 'play1':
    if (!q) return enviar(`Falta o nome da musica man`)
    reagir(from, "🎧")
    try {
        let play1 = await fetchJson(`https://tohka.tech/api/pesquisa/yt?nome=${q}&apikey=bh8YJ`)
        playa = await getBuffer(`https://tohka.tech/api/dl/ytmp3v2?link=${play1.all[0].url}&apikey=bh8YJ`)
        await mitsuri.sendMessage(from, {
            audio: playa,
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: play1.all[0].title,
                    body: `Bem-vindo`,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: true,
                    thumbnail: await getBuffer(`https://i.imgur.com/CPfw6O6.jpeg`),
                    body: `🍁 AQUI ESTA ${pushname}`,
                    mediaUrl: `${play1.all[0].url}`,  
    sourceUrl: `${play1.all[0].url}`
                }
            }
        }, { quoted: play})
    } catch (e) {
        console.log(e);
        enviar("*Não encontrei essa música, Por favor seja mais específico.*")
        reagir(from, '✖️')
    }
    break;

case 'clima': {
    if (!q) {
        return enviar(`❌ *Forma Inválida!*\n> Use: ${prefixo + comando} <estado>\n> Ex.: ${prefixo + comando} rj`);
    }

    try {
        const { data: cidades } = await axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${q}?providers=dados-abertos-br,gov`);
        
        if (!cidades.length) {
            return enviar(`⚠️ Nenhuma cidade encontrada para o estado: ${q.toUpperCase()}`);
        }

        const cidadesFormatadas = cidades.map(cidade => `- ${cidade.nome}`).join('\n');

        const mensagem = `[ ☁️ ] *Clima das Cidades de ${q.toUpperCase()}*\n\n> Foram encontradas ${cidades.length} cidades:\n\n${cidadesFormatadas}\n\ndigite ${prefixo}clima2 nome da cidade`;

        await enviar(mensagem);
        
    } catch (error) {
        console.error(error);
        enviar(`❌ Ocorreu um erro ao buscar as cidades. Tente novamente mais tarde.`);
    }

    break;
}
    
case 'clima2':
if (args.length < 1) return enviar(`*Sintaxe correta para uso:* ${prefixo + comando} cidade\n• Caso tenha algum acento, retire ok?`)
cidade = body.slice(7)
clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=548b8266f19038cfd1f6d6f007d8bc58&units=metric&lang=pt_br`)
if (clima.error) return enviar(clima.error)
hora1 = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
jr = `▢ ⌁ Cidade: ${clima.data.name}\n▢ ⌁ Temperatura agora: ${clima.data.main.temp}ºC\n▢ ⌁ Temperatura Máxima: ${clima.data.main.temp_max}°C\n▢ ⌁ Temperatura Mínima: ${clima.data.main.temp_min}°C\n▢ ⌁ Clima: ${clima.data.weather[0].description}\n▢ ⌁  Umidade de ar: ${clima.data.main.humidity}%\n▢ ⌁ Ventos: ${clima.data.wind.speed}`
let buffeer = await getBuffer(`https://telegra.ph/file/20e2e6930059d8170e8fd.jpg`)
mitsuri.sendMessage(from, {image: buffeer, caption: jr}, {quoted: info})
break

case 'calcular':
case 'calc':
//ozzy
rsp = q.replace("x", "*").replace('"', ":").replace(new RegExp("[()abcdefghijklmnopqrstwuvxyz]", "gi"), "").replace("÷", "/")
return enviar(JSON.stringify(eval(rsp, null, '\t')))
//ozzy
break

case 'figurinhas':
if(!Number(q)) return enviar(`Digite a quantidade de figurinhas\nExemplo: ${prefixo+comando} 7`)
if(q >= 100) return enviar("Coloque abaixo de 100...")
if (isGroup) enviar(`As figurinhas estão sendo enviadas em seu pv, por motivo de segurança e flood em grupos, aguarde um pouco.`)
async function figuss() {
var rnd = Math.floor(Math.random() * 8051)
mitsuri.sendMessage(sender, { sticker: { url: `http://us-02.bed.ovh:25717/random?apitoken=INDIUZIN` } })}
for (i = 0; i < q; i++) {
await sleep(680)
figuss()
}
break

case 'do-job':
reagir(from, "🌶️")
    const randomIndex = Math.floor(Math.random() * meni.length);
    const selectedName = meni[randomIndex];
    const age = Math.floor(Math.random() * (35 - 20 + 1)) + 20; // Idade aleatória entre 20 e 35
    const jobPoints = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10'
    };
    const selectedJobPoints = Object.values(jobPoints)[Math.floor(Math.random() * Object.values(jobPoints).length)];
    
    const jobDescriptions = [
  `**Descrição:** Coordena tarefas chave e supervisiona equipe. Garante a eficiência operacional e a qualidade dos resultados.`,
  `**Descrição:** Responsável pela gestão de projetos e liderança de equipe. Implementa estratégias para alcançar metas e otimizar processos.`,
  `**Descrição:** Supervisiona operações diárias e desenvolve planos de ação. Avalia o desempenho da equipe e promove melhorias contínuas.`,
  `**Descrição:** Gerencia projetos complexos e assegura a execução dentro dos prazos estabelecidos. Fornece orientação e suporte à equipe.`,
  `**Descrição:** Administra a execução de projetos com foco em resultados. Facilita a comunicação entre os membros da equipe e resolve problemas.`,
  `**Descrição:** Coordena atividades operacionais e administrativas. Desenvolve e implementa procedimentos para garantir a produtividade.`,
  `**Descrição:** Lidera e inspira a equipe, gerenciando recursos e cronogramas para alcançar objetivos estratégicos. Atua como principal ponto de contato para clientes.`
];

const locations = [
  `**Localização:** Endereço será fornecido. Bem equipado e seguro, com fácil acesso a transporte público.`,
  `**Localização:** Escritório moderno localizado no centro da cidade, com infraestrutura completa e ambiente de trabalho agradável.`,
  `**Localização:** Instalações novas em um prédio corporativo, oferecendo todas as comodidades necessárias para um ambiente produtivo.`,
  `**Localização:** Localizado em um centro empresarial, com estacionamento disponível e acesso a várias opções de alimentação.`,
  `**Localização:** Escritório em área nobre da cidade, com tecnologia de ponta e ambiente de trabalho colaborativo.`,
  `**Localização:** Endereço conveniente com áreas de descanso e facilidades para lazer durante o intervalo.`,
  `**Localização:** Ambiente de trabalho dinâmico e bem localizado, próximo a serviços essenciais e com boas opções de transporte.`
];

const schedules = [
  `**Horário:** Confirmado antecipadamente. Pode haver ajustes conforme a demanda do projeto e necessidades da equipe.`,
  `**Horário:** Flexível e sujeito a mudanças conforme necessidade do projeto. Possibilidade de horários alternativos conforme negociação.`,
  `**Horário:** Horário regular de trabalho com possibilidade de horas extras. Ajustes podem ser feitos com antecedência.`,
  `**Horário:** Horário padrão com oportunidades para ajustes conforme as demandas do trabalho e preferências pessoais.`,
  `**Horário:** Trabalho em turnos, com opções de horários variados para atender às necessidades da equipe.`,
  `**Horário:** Horário fixo com flexibilidade para ajustes ocasionais. Ideal para quem busca equilíbrio entre vida profissional e pessoal.`,
  `**Horário:** Possibilidade de trabalho remoto e horários flexíveis, dependendo da evolução dos projetos e das necessidades da empresa.`
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const jobDescription = getRandomElement(jobDescriptions);
const location = getRandomElement(locations);
const schedule = getRandomElement(schedules);

    const contactInfo = `${gerarNumeroWhatsApp()}`;

    mitsuri.sendMessage(from, {
        image: { url: 'https://telegra.ph/file/3f3a02ee2d8ab183cf927.jpg' },
        caption: `
    *Detalhes do Job:*.   

    *Nome:* ${selectedName}.   

    *Idade:* ${age} anos.   

    *Pontos do Job:* ${selectedJobPoints} pontos

    *Descrição do Job:*\n ${jobDescription}

    *Localização:*\n ${location}

    *Horário:*\n ${schedule}

    *Contato:* ${contactInfo}

    Boa sorte com as do job...
`
    });
    break;
    
    case 'menu-brin'://by indiuzin
    mitsuri.sendMessage(from, { text: `
          ╔═══════════════╗
        🎉 *MENU BRINCADEIRAS* 🎉
          ╚═══════════════╝

 ─────────────
➤${prefixo}do-job
 ─────────────
➤${prefixo}gerarveiculo
 ─────────────
➤ ${prefixo}gerarcpf
 ─────────────

💡 *Dica*: Use os comandos para se divertir!

*BY* indiuzin 🚀
    ` })
    break
    
    case 'abc-nick':

    const nicks = {
        '1': '𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝙲 𝙾 𝙼 𝙽 𝙾 𝙿 𝙾',
        '2': '𝒜 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓅 𝓇 𝓈 𝓉 𝓊 𝓋 𝓷 𝓯 𝓏',
        '3': '𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖 𝓗 𝓘 𝓙 𝓚 𝓛 𝓜 𝓝 𝓸 𝓟 𝓠 𝓡 𝓢 𝓣 𝓤 𝓥 𝓦 𝓧 𝓨 𝓩',
        '4': '𝔸 𝔹 𝔻 𝔼 𝔽 𝔾 𝔻 𝔽 𝔾 𝔻 𝔽 𝔾 𝔻 𝔽 𝔾 𝔻 𝔽 𝔾 𝔻 𝔽 𝔾',
        '5': '𝒶 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓅 𝓟 𝓾 𝓧 𝓏',
        '6': '𝓪 𝓫 𝓬 𝓭 𝓮 𝓯 𝓰 𝓱 𝓲 𝓳 𝓴 𝓵 𝓶 𝓷 𝓸 𝓹 𝓺 𝓻 𝓼 𝓽 𝓾 𝓿 𝓦 𝓧 𝓨 𝓏',
        '7': '𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔧 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔯 𝔰 𝔱 𝔲 𝔳 𝔷',
        '8': '𝑎 𝑏 𝑐 𝑑 𝑒 𝑓 𝑔 𝑕 𝑖 𝑗 𝑘 𝑙 𝑚 𝑛 𝑜 𝑝 𝑞 𝑟 𝑠 𝑡 𝑢 𝑣 𝑤 𝑥 𝑦 𝑧',
        '9': '𝒶 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓹 𝓟 𝓻 𝓈 𝓉 𝓾 𝓿 𝓷 𝓧 𝓎 𝓏',
        '10': '𝕬 𝕭 𝕮 𝕯 𝕰 𝕱 𝕲 𝕳 𝕴 𝕵 𝕶 𝕷 𝕸 𝕽 𝕾 𝕿 𝖀 𝖁 𝖂 𝖃 𝖄 𝖅',
        '11': '𝒜 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓹 𝓟 𝓻 𝓈 𝓉 𝓾 𝓿 𝓷 𝓧 𝓎 𝓏',
        '12': '𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖 𝓗 𝓘 𝓙 𝓚 𝓛 𝓜 𝓝 𝓸 𝓟 𝓠 𝓡 𝓢 𝓣 𝓤 𝓥 𝓦 𝓧 𝓨 𝓩',
        '13': '𝒜 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓹 𝓟 𝓻 𝓈 𝓉 𝓾 𝓿 𝓷 𝓧 𝓎 𝓏',
        '14': '𝖠 𝖵 𝖢 𝖣 𝖤 𝖥 𝖦 𝖧 𝖨 𝖩 𝖪 𝖫 𝖬 𝖭 𝖮 𝖯 𝖰 𝖱 𝖲 𝖳 𝖴 𝖵 𝖶 𝖷 𝖸 𝖹',
        '15': '𝒜 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓹 𝓟 𝓻 𝓈 𝓉 𝓾 𝓿 𝓷 𝓧 𝓎 𝓏',
        '16': '𝗔 𝗕 𝗖 𝗗 𝗘 𝗙 𝗚 𝗛 𝗜 𝗝 𝗞 𝗟 𝗠 𝗡 𝗢 𝗣 𝗤 𝗥 𝗦 𝗧 𝗨 𝗩 𝗪 𝗫 𝗬 𝗭',
        '17': '𝒜 𝒷 𝒸 𝒹 𝒺 𝒻 𝒼 𝒽 𝒾 𝒿 𝒦 𝒷 𝓂 𝓃 𝑜 𝓹 𝓟 𝓻 𝓈 𝓉 𝓾 𝓿 𝓷 𝓧 𝓏',
        '18': '🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩',
        '19': '𝙖 𝙗 𝙘 𝙙 𝙚 𝙛 𝙜 𝙝 𝙞 𝙟 𝙠 𝙡 𝙢 𝙣 𝙤 𝙥 𝙦 𝙧 𝙨 𝙩 𝙪 𝙫 𝙬 𝙭 𝙮 𝙯'
    };

    // Gera um número aleatório entre 1 e 19
    const rale = Math.floor(Math.random() * Object.keys(nicks).length) + 1;
    const nick = nicks[rale];

    enviar(`SUA LISTA\n\n${nick}    `);
    break

case 'welkome'://By: MisheruModz
case 'welcome'://By: MisheruModz
case 'bemvindo'://By: MisheruModz>>
case 'welkom'://By: MisheruModz
if (q.length < 1) return enviar('1 pra ligar / 0 pra desligar')
if (Number(args[0]) === 1) {//By: MisheruModz
if (!isWelcome) return enviar('Ja esta ativo')
welcome.push(from)
fs.writeFileSync('./datab/bemvindo/welkon.json', JSON.stringify(welcome))
enviar(`Ativou com sucesso o recurso de neste grupo `)
} else if (Number(args[0]) === 0) {//By: MisheruModz
if (!isWelcome) return enviar('Ja esta Desativado')
const ainMisheruzinho = from
let ManoMisheru = welcome.indexOf(ainMisheruzinho)
while (ManoMisheru >= 0) {//By: MisheruModz
welcome.splice(ManoMisheru, 1)
ManoMisheru = welcome.indexOf(ainMisheruzinho)
}
fs.writeFileSync('./datab/bemvindo/welkon.json', JSON.stringify(welcome))
enviar('‼️ Desativou com sucesso o recurso de bem-vindo neste grupo ✔️')
} else {//By: MisheruModz
enviar('1 para ativar, 0 para desativar')
}//Eu MisheruModz demorei pra arrumar isso então pfvr deixe os créditos
break

case 'gerarveiculo': //by indiuzin
    const veiculoSelecionado = veiculos[Math.floor(Math.random() * veiculos.length)];
    mitsuri.sendMessage(from, {
        image: { url: 'https://telegra.ph/file/b0a012c0f91e6a9d987e0.jpg' },
        caption: `
  ╔════════════════════════════╗
           🔥 *BY INDIUZIN E LUAN M.D* 🔥  
  ╚════════════════════════════╝

  🚗 *MARCA:* ${veiculoSelecionado.marca}  

  🚙 *MODELO:* ${veiculoSelecionado.modelo}  

  🔢 *ANO:* ${veiculoSelecionado.ano}  

  🏷️ *PLACAS:* ${veiculoSelecionado.placas}  

  💼 *TIPO:* ${veiculoSelecionado.tipo}  

  🛠️ *COR:* ${veiculoSelecionado.cor}  

  📅 *DATA DE REGISTRO:* ${veiculoSelecionado.dataRegistro}  

  ⭐ *Gerado com sucesso!*\n
        `.trim(),
        gifPlayback: false,
        footer: '‼️',
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: nomeBot,
                body: 'Informações do veículo geradas',
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: false,
                thumbnail: await getBuffer('https://telegra.ph/file/5e2c521b093486e7b514c.jpg'), // Verifique se o link está correto
                sourceUrl: `https://wa.me/${veiculoSelecionado.telefone}` // Se aplicável
            }
        }});
    break;

case 'gerarcpf': //by indiuzin
reagir(from, "🫡")
    const pessoaSelecionada = pessoas[Math.floor(Math.random() * pessoas.length)];
    mitsuri.sendMessage(from, {
        image: { url: 'https://telegra.ph/file/9d194e759e8e9e03352dc.jpg' },
        caption: `
  ╔════════════════════════════╗
           🔥 *BY INDIUZIN E LUAN M.D* 🔥  
  ╚════════════════════════════╝

  👤 *NOME: ${pessoaSelecionada.nome}*  
  
  *${randomProfession}(A/O)*  

  🆔 *CPF: ${pessoaSelecionada.cpf}*  
  
  🧾 *RG: ${getRandomRG()}*  

  🎂 *IDADE: ${pessoaSelecionada.idade} anos*  

  🏠 *ENDEREÇO: ${pessoaSelecionada.endereco}*  

  📅 *DATA DE NASCIMENTO: ${pessoaSelecionada.dataNascimento}*  

  📞 *TELEFONE: ${pessoaSelecionada.telefone}*  

  📧 *EMAIL: ${pessoaSelecionada.email}*  

  ⭐ *Gerado com sucesso!*\n
        `.trim(),
        gifPlayback: false,
        footer: '‼️',
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: nomeBot,
                body: 'Informações geradas',
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: false,
                thumbnail: await getBuffer('https://telegra.ph/file/878feeac18256b02c94c2.jpg'), // Verifique se o link está correto
                sourceUrl: `https://wa.me/${pessoaSelecionada.telefone}`
            }
        }});
    break;

case 'puxarcase':
          case 'getcase':
          if (!isDono) return enviar(`so meu dono mano 😡`)
            try {
              enviar('𝙹𝚊 𝚎𝚜𝚝𝚘𝚞 𝚎𝚗𝚟𝚒𝚊𝚍𝚘..🥵')

              const getCase = (cases) => {
                return 'case '+`'${cases}'`+fs.readFileSync("./mitsuri.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
              }
              await setTimeout(() => {
              enviar(`${getCase(q)}`)
              }, 2000);
            } catch(e) {
              enviar('❌️ Comando não encontrado! ❌️')
            }
            break
            
            case 'puxarconst':
case 'getconst':
  try {
    const mensagemEnvio = '𝙹𝚊 𝚎𝚜𝚝𝚘𝚞 𝚎𝚗𝚟𝚒𝚊𝚍𝚘..🥵';
    enviar(mensagemEnvio);

    const obterConteudoConst = (nomeConst) => {
      const conteudoArquivo = fs.readFileSync("./mitsuri.js", "utf8");
      const conteudoConst = conteudoArquivo.split(`const ${nomeConst}`)[1]?.split("const")[0] || '';
      return `const ${nomeConst}${conteudoConst}const`;
    };

    await new Promise(resolve => setTimeout(resolve, 2000));
    const conteudoDoConst = obterConteudoConst(q);
    enviar(conteudoDoConst);
  } catch (e) {
    const mensagemErro = '❌️ Comando não encontrado! ❌️';
    enviar(mensagemErro);
  }
  break;

case 'dado':
if (!q) return enviar(`*faca uma aposta marcando o @ de quem vc quer apostar!*`)
            const dadus = ["⚀",
              "⚁",
              "⚂",
              "⚃",
              "⚄",
              "⚅"]
            dadu = dadus[Math.floor(Math.random() * dadus.length)]
            dador = fs.readFileSync('./arquivos/funções/dado/' + dadu + '.webp')
            mitsuri.sendMessage(from, {
              sticker: dador
            }, {
              quoted: dado
            })
            break
            

   case 'alugar-bot':
    await mitsuri.sendMessage(from, {
        text: `🚀 *Alugue Seu Bot Agora!* 🚀\n\n🔹 *Quer ter um bot personalizado para suas necessidades?*\n🔹 *Entre em contato com o nosso suporte para mais detalhes sobre o aluguel de bots!* \n\n💬 *Clique no link abaixo para falar diretamente com o proprietário e obter todas as informações que você precisa.*\n\n📞 *Contato:* [Indiuzin](https://wa.me/558592039551)\n\n⚡️ *Aproveite esta oportunidade e faça seu pedido hoje mesmo!*`,
        footer: '🔗 *Clique e Conecte-se Agora!*',
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: `${nomeBot} - Aluguel de Bots`,
                body: '🛠️ *Alugue um Bot Personalizado para Você!* 🛠️',
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: true,
                thumbnail: await getBuffer('https://telegra.ph/file/09ed8cfa9d87e3dd5db69.jpg'),
                sourceUrl: 'https://wa.me/558592039551'
            }
        },
        gifPlayback: false
    });
    break;

// Feito por indiu

case 'audio':
mitsuri.sendMessage(from, {audio: fs.redFileSync('./diretore/do/audio.mp3'), mimetype: 'audio/mpeg', ptt: true})
break
case 'wallpaper':
const api = await getBuffer(`https://nodz.xyz/search/wallpaper?apitoken=${api_kay}`)
mitsuri.sendMessage(from,{image:{url:api}, caption:`SUA FOTO ❤️ . . .`})
break

case 'audio-pv':
mitsuri.sendMessage(sander, {audio: fs.redFileSync('./diretore/do/audio.mp3'), mimetype: 'audio/mpeg', ptt: true})
break

case 'mensagem':
enviar(`sua mensagem`)
break

case 'mensagem-pv':
mitsuri.sendMessage(sender, {text: `sua mensagem` })
break

case 'menu':
mitsuri.sendMessage(from, { react: { text: "💙", key: info.key }})
let messageaa = await prepareWAMessageMedia({ image: {url: links.links.menu} }, { upload: mitsuri.waUploadToServer });
await mitsuri.relayMessage(
    from,
    {
        botInvokeMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadataVersion: 2,
                    deviceListMetadata: {},
                },
                interactiveMessage: {
                    header: {
                        title: `𝙱𝙰𝚂𝙴 𝙵𝙴𝙸𝚃𝙰 𝙿𝙾𝚁 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽`,
                        subtitle: 'Sub-título aqui (opcional)',
                        hasMediaAttachment: true,
                        imageMessage: messageaa.imageMessage
                    },
                    headerType: 'IMAGE',
                    body: { text: `
╭────────────────────╮
 |
 |    ╭────────────────
 |     *| ${prefixo}dono*
 |     *|─────────────*
 |     *| ${prefixo}tag*
 |     *|─────────────*
 |     *| ${prefixo}ping*
 |     *|─────────────*
 |     *| ${prefixo}reagir*
 |     *|─────────────*
 |     *| ${prefixo}menu-brin*
 |     *|─────────────*
 |     *| ${prefixo}setprefix*
 |     *|─────────────*
 |     *| ${prefixo}dono*
 |     *|─────────────*
 |     *| ${prefixo}group*
 |     *|─────────────*
 |     *| ${prefixo}trava*
 |     *|─────────────*
 |     *| ${prefixo}g1*
 |     *|─────────────*
 |     *| ${prefixo}corinthians*
 |     *|─────────────*
 |     *| ${prefixo}ogif*
 |     *|─────────────*
 |     *| ${prefixo}reiniciar*
 |     *|─────────────*
 |     *| ${prefixo}luta*
 |     *|─────────────*
 |     *| ${prefixo}rankmaster*
 |     *|─────────────*
 |     *| ${prefixo}rankheroes*
 |     *|─────────────*
 |     *| ${prefixo}addcmd*
 |     *|─────────────*
 |     *| ${prefixo}oteria*
 |     *|─────────────*
 |     *| ${prefixo}banir*
 |     *|─────────────*
 |     *| ${prefixo}reviver*
 |     *|─────────────*
 |     *| ${prefixo}google*
 |     *|─────────────*
 |     *| ${prefixo}spotify*
 |     *|─────────────*
 |     *| ${prefixo}clima2*
 |     *|─────────────*
 |     *| ${prefixo}calcular*
 |     *|─────────────*
 |     *| ${prefixo}hidetag*
 |     *|─────────────*
 |     *| ${prefixo}trava*
 |     *|─────────────*
 |
╰────────────────────╯`, }, footer: {
text: `𝙱𝚈 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽`},
                    nativeFlowMessage: {
                        buttons: [
                            {
"name": "cta_url",
                  "buttonParamsJson": "{\"display_text\":\"𝐌𝐈𝐓𝐒𝐔𝐑𝐈-𝐀𝐏𝐈\",\"url\":\"https://mitsure-api.onrender.com\",\"merchant_url\":\"https://mitsure-api.onrender.com\"}"
}              
                        ],
                        messageParamsJson: "",
                    },
                },
            },
        },
    contextInfo: {externalAdReply : {title : ``, renderLargerThumbnail:false, showAdAttribution: false, body: ``, mediaUrl: `` , mediaType: 2, thumbnail: "" }}}, {quoted: info}
).then((r) => console.log(r));
break

case 'group':
  await mitsuri.relayMessage(from, {
    interactiveMessage: {
      body: {
        text: `🔑 [ 𝐀𝐁𝐑𝐈𝐑 𝐄 𝐅𝐄𝐂𝐇𝐀𝐑 𝐎 𝐆𝐑𝐔𝐏𝐎 ]`,
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "𝐋𝐈𝐒𝐓𝐀 𝐀𝐁𝐑𝐈𝐑 𝐄 𝐅𝐄𝐂𝐇𝐀𝐑...",
              sections: [
                {
                  title: "𝙳𝙴𝚂𝙻𝙸𝙶𝙰𝚁 𝙴 𝙻𝙸𝙶𝙰𝚁 𝙶𝚁𝚄𝙿𝙾\n𝙱𝚈 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽",
                  highlight_label: "",
                  rows: [
                    {
                      id: `${prefixo}grupo a`,
                      header: " - 𝐀𝐁𝐑𝐈𝐑",
                      title: "",
                      description: "𝙰𝙱𝚁𝙸𝚁 𝙾 𝙶𝚁𝚄𝙿𝙾"
                    },
                    {
                      id: `${prefixo}grupo f`,
                      header: "- 𝐅𝐄𝐂𝐇𝐀𝐑",
                      title: "",
                      description: "𝙵𝙴𝙲𝙷𝙰𝚁 𝙾 𝙶𝚁𝚄𝙿𝙾"
                    }
                  ]
                }
              ]
            })
          }
        ],
        messageParamsJson: "",
      }
    },
    gifPlayback: false,
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        title: nomeBot,
        body: '🔐 𝙰𝙱𝚁𝙸𝚁 𝙴 𝙵𝙴𝙲𝙷𝙰𝚁 𝙶𝚁𝚄𝙿𝙾',
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        thumbnail: logoBot, // Imagem do thumbnail
        sourceUrl: 'https://wa.me/558592039551'
      }
    }
  }).then((r) => console.log(r));
  break;
  
  case 'dono':
    // Envia uma reação ao usuário
    mitsuri.sendMessage(from, { react: { text: "♥️", key: info.key } });

    // Prepara a mensagem com o vídeo
    let donoIndiu = await prepareWAMessageMedia({ 
        image: { url: links.links.dono} 
    }, { upload: mitsuri.waUploadToServer });

    // Envia a mensagem interativa
    await mitsuri.relayMessage(
        from,
        {
            botInvokeMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadataVersion: 2,
                        deviceListMetadata: {},
                    },
                    interactiveMessage: {
                        header: {
                            title: `𝙱𝙰𝚂𝙴 𝙵𝙴𝙸𝚃𝙰 𝙿𝙾𝚁 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽`,
                            subtitle: `o comando ${prefixo + comando}`,
                            hasMediaAttachment: true,
                            imageMessage: donoIndiu.imageMessage, // Usa a mensagem de imagem preparada
                        },
                        headerType: 'IMAGE',
                        body: { text: `> Ola ${pushname}! me chamo ${nomeBot}\naqui está: as redes sociais do meu dono` },
                        footer: {
                            text: `𝙱𝚈 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽`
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    "name": "cta_url",
                                    "buttonParamsJson": "{\"display_text\":\"𝚆𝙷𝙰𝙿𝙿\",\"url\":\"https://wa.me/558592039551\",\"merchant_url\":\"https://wa.me/558592039551\"}"
                                },
                                {
                                    "name": "cta_url",
                                    "buttonParamsJson": "{\"display_text\":\"𝙸𝙽𝚂𝚃𝙰\",\"url\":\"https://www.instagram.com/_______indiuzin_244__?igsh=OGQ5ZDc2ODk2ZA==\",\"merchant_url\":\"https://www.instagram.com/_______indiuzin_244__?igsh=OGQ5ZDc2ODk2ZA==\"}"
                                }
                            ],
                            messageParamsJson: "",
                        },
                    },
                },
            },
            contextInfo: {
                externalAdReply: {
                    title: ``,
                    renderLargerThumbnail: false,
                    showAdAttribution: false,
                    body: ``,
                    mediaUrl: ``,
                    mediaType: 2,
                    thumbnail: ""
                }
            }
        },
        { quoted: info }
    ).then((r) => console.log(r)); // Loga a resposta
break;


case `grupo`:
case `gp`:
if(!isGroup) return enviar("*Vai usar saporra no teu pv pra quê?*")
if(!isBotadm) return enviar("*O Bot precisa ser adm, seu corno*")
if(!isAdm) return enviar("*Coé kkkkk, quer usar esse comando? nem adm tu é, fdp*")
try {
if (q == "a") {
await mitsuri.groupSettingUpdate(from, "not_announcement")
enviar(`*_Grupo aberto pelo adm:_* *${pushname}*`)
}
if (q == "f") {
await mitsuri.groupSettingUpdate(from, "announcement")
enviar(`*_Grupo fechado pelo adm:_*  *${pushname}*`)
}
} catch(e) {
console.log(e)
enviar('erro')
}
break

case 'trava':
if(!isDono) return enviar('so meu dono pode usar') 
if(!q) return enviar(`exemplo: ${prefix + comando} nunero/quantidade`)
const [numero_destino, quantidade_envios] = q.split('/');
if(!numero_destino) return enviar('digite o numero antes da "/"')
if(!quantidade_envios) return enviar('digite a quantidade que deseja enviar após a "/"')
enviar('enviado com sucesso!')
for (let i = 0; i < quantidade_envios; i++) {

    await mitsuri.relayMessage(`${numero_destino}@s.whatsapp.net`, {
        interactiveMessage: {
            body: { text: `ADM CRICIAN DESATIVANDO` },
            nativeFlowMessage: {
                buttons: [{
                    "name": "payment_info",
                    "buttonParamsJson": "{\"currency\":\"BRL\",\"total_amount\":{\"value\":0,\"offset\":100},\"reference_id\":\"4PAAD8LAERY\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"name\":\"\",\"amount\":{\"value\":0,\"offset\":100},\"quantity\":0,\"sale_amount\":{\"value\":0,\"offset\":100}}]},\"payment_settings\":[{\"type\":\"pix_static_code\",\"pix_static_code\":{\"merchant_name\":\"desacrivando el chat 🕊️\",\"key\":\"90000\",\"key_type\":\"TELEFONE\"}}]}"
                }]
            }
        }
    }, {}).then((r) => console.log(r));
}
break

case "programado":
case "suporte":
    enviar(`✨ *Envio em Processo* ✨\n\nAguarde um momento enquanto enviamos as informações para você... 😁`);
    await delay(3000);
    
    try {
        await mitsuri.sendMessage(sender, {
            contacts: {
                displayName: `${nomeDono}`,
                contacts: [{ vcard }]
            }
        });
        enviar(`✅ *Informações Enviadas com Sucesso!*`);
    } catch (e) {
        console.error(e);
        enviar(`❌ *Ocorreu um erro ao enviar as informações.*`);
    }
    break;

case "tag":
case "hidetag":
if (!isGroup) return enviar("Este comando só poderia ser utilizado em grupo.")
if (!isAdm) return enviar("Somente admins poderia utilizar esse comando.")
if (args.length < 1) return enviar("Diga oque irei citar...")
let mem = _.map(groupMembers, "id")
let options = {
  text: q,
  mentions: mem,
  quoted: info
}
mitsuri.sendMessage(from, options)
break

case "reagir":
{
mitsuri.sendMessage(from, { react: { text: "🐳", key: info.key }})
}
break

case 'ping':
    const start = Date.now();
    const horass = new Date().toLocaleTimeString();

    const r = (Date.now() - start) / 1000;

    const pin = `
╭───────────────╮
│  *💥 PING STATUS 💥*
╰───────────────╯
╭───────────────╮
│⏰ *Horário:* ${horass}
│🚀 *Velocidade:* ${r.toFixed(3)}s
│🕒 *Status:* ONLINE
│🔧 *Versão:* V.1
╰───────────────╯
╭───────────────────╮
│  *Criado por: ${nomeDono}*
╰───────────────────╯
    `;

    await mitsuri.sendMessage(from, {
        document: { url: './datab/anuncio/anucio.docx' },
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileName: '📍 PING mitsuri 📍',
        caption: pin, // Isso pode não ser exibido com documentos .docx
        footer: '😈',
        headerType: 4,
        gifPlayback: true,
        contextInfo: {
            externalAdReply: {
                title: nomeBot,
                body: 'mitsuri PING 🏃🏼‍♀️‍➡️',
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: false,
                thumbnail: await getBuffer(links.links.ping),
                sourceUrl: 'https://wa.me/558592039551'
            }
        }
    }, 
    { quoted: ping }
);
    break;

default:

// Comandos sem prefixo
switch (testat) {

case 'prefixo':
        try {
        await mitsuri.sendMessage(from, { 
            react: { text: "📌", key: info.key }
        });
        await mitsuri.sendMessage(from, {
            document: {
                url: './datab/anuncio/anucio.docx'
            },
            mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            fileName: '📍 𝙿𝚁𝙴𝙵𝙸𝚇𝙾 𝙳𝙰 𝚃𝙾𝙺𝙸𝙼𝙾𝚃𝙾 📍',
            caption: `
┏━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ✨ *Olá, ${pushname}!* ✨
┃━━━━━━━━━━━━━━━━━━━━━━━━
┃  🔧 *Informação do Prefixo*
┃━━━━━━━━━━━━━━━━━━━━━━━━
┃  aqui esta minha prefixo:
┃  ➡️ *「 ${prefixo} 」*
┃━━━━━━━━━━━━━━━━━━━━━━━━
┃  Use esa prefixo
┗━━━━━━━━━━━━━━━━━━━━━━━━┛
            `,
            footer: '⚠️',
            headerType: 4,
            gifPlayback: true,
            contextInfo: {
                externalAdReply: {
                    title: nomeBot,
                    body: 'mitsuri PREFIXO 📌',
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: false,
                    thumbnail: await getBuffer(links.links.prefix),
                    sourceUrl: 'https://wa.me/558592039551'
                }
            }
        }, { quoted: info });
    } catch (error) {
        console.error('Erro ao enviar mensagem de comando não encontrado:', error);
        await mitsuri.sendMessage(from, { text: '❌ comando nao emcontrado ❌.' });
    }
    break;

case "corno":
enviar("Você tá bravinha? tá?")
break

case "bom dia":
mitsuri.sendMessage(from, { react: { text: "☕", key: info.key }})
break

}

// Resposta quando o comando não é encontrado
if (isCmd) { // Feito por Indiuzin
    try {
        if (comando === prefixo) return;

        await mitsuri.sendMessage(from, { 
            react: { text: "❌", key: info.key }
        });
        await mitsuri.sendMessage(from, {
            document: {
                url: './datab/anuncio/anucio.docx'
            },
            mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            fileName: '❌ 𝙾 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙽𝙰𝙾 𝙴𝚇𝙸𝚂𝚃𝙴 ❌',
            caption: `
✨ *Olá, ${isDono ? basDono : pushname}*, tudo bem?
Infelizmente, o comando que você digitou não foi encontrado. 😕
            
📜 *Comando tentado:* 「 ${prefixo + comando} 」

🚀 Para ver todos os comandos disponíveis, digite:
➡️ *${prefixo}menu*

💻 *✎ Criado por 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽 ⌨️*
            `,
            footer: '⚠️',
            headerType: 4,
            gifPlayback: true,
            contextInfo: {
                externalAdReply: {
                    title: nomeBot,
                    body: '♨️ Comando não encontrado ♨️',
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: false,
                    thumbnail: await getBuffer(links.links.logo),
                    sourceUrl: 'https://wa.me/558592039551'
                }
            }
        }, { quoted: info });
    } catch (error) {
        console.error('Erro ao enviar mensagem de comando não encontrado:', error);
        await mitsuri.sendMessage(from, { text: '⚠️ Ocorreu um erro ao processar o comando.' });
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}

} catch (e) {
console.log(e)
}})

// New auto reconexão própria
mitsuri.ev.on("connection.update", (update) => {
let { connection, lastDisconnect } = update

if (connection === "open") {
console.log(chalk.greenBright(`
┏━━━━━━━━━━━━━━━━━━━━━━━━┓
|𝐏𝐑𝐎𝐍𝐓𝐈𝐍𝐇𝐎, 𝐓𝐎𝐊𝐈𝐌𝐎𝐓𝐎-𝐁𝐎𝐓
|-------------------------
|𝚂𝚃𝙰𝚃𝚄𝚂: 𝙾𝙽𝙻𝙸𝙽𝙴
|-------------------------
|𝚅𝙴𝚁𝚂𝙰𝙾: 𝟷.𝟶
|-------------------------
|𝙱𝚈: 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽
|-------------------------
|𝙲𝙾𝙽𝙵𝙸𝙶: 𝙸𝙽𝙳𝙸𝚄𝚉𝙸𝙽_𝙱𝙰𝙸𝙻𝙴𝚈𝚂
┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n`))
} else if (connection === "close") {

console.log(chalk.dim("Ocorreu um conflito na conexão"))
laur()
}
if(update.isNewLogin) {
laur()
}})}
laur()
fs.watchFile('./mitsuri.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log(`${chalk.green(`𝙾 𝙸𝚗𝚍𝚎𝚡 𝚏𝚘𝚒 𝚊𝚕𝚝𝚎𝚛𝚊𝚍𝚘 𝚒𝚛𝚎𝚒 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚊𝚛...`)}`);
process.exit()
}
})

fs.watchFile('./datab/dono/env/info.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log(`${chalk.green(`prefixo mudada, reiniciando...`)}`);
process.exit()
}
})

/*
 🇫  🇮  🇲    🇧  🇦  🇸  🇪   🇮  🇳  🇩  🇮  🇺 
*/
