 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlA3SWErUTUrS3RoemloL0gwQnZ4K2dodzdkaGR3MkZPOWtOa0tPVk1WVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFlzUnQ1YUluaWV5QW5HOTZtLzV5ejRkZVZFVlBjdVlZbzFqZjJuNTZUbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRzRlbzFReXlLRkd6V0pzRzhCeGV3MzErcEh5TTJNdHFRbHdrTHpUczFNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPdDk3Ukw3YWxML1N4azRPckJDS25FeCtsd3lNSVJPV3pVZlBYN0VRa2cwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKdHk5RGI5V1NGS2Y5c05jSmV6dEFRUTZXS2RmQ2NCV3JJTFpReE1USFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik13VlVRekZpSHowRkZ4dDNnaTdaOEM5VC9nRnhPb3RVa0JTQzVXbFZBMUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUhvQS8vdFVVMERFSm5ZdWo5aEoxNnBDMVJidkdvU3JxbWs0TFkxVTQxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUE3Sis2U1MwRUVaQ2xQMjNoWHpoeUd4bVpuYTA0RjVpS0FaQ1IzTUJ4dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUxUGUrVVYwZ3RyUjFRaDNTOTRoY3d3eTlrOGM2VWVRaFVpOFRMa1M0NWMrSFVvQ3NmL2k1Z29OYVovdnN1TFljUWxjdTNqcE5URnJtMWZhdk50Nml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiJrY3hzOTl3SWhmNitYQWRTYWxUYWJ4Ry93TzB3QzdjN1ZzbFZINmFSTkNFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJPcWdmelEyN1REeTZoWDg0SEZlb013IiwicGhvbmVJZCI6IjU5NWExZDUyLTIxNmQtNDAzNS04MmRhLTFjYmY1ODM3NmRlNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSREgrYzUxandHRjFIT2J2dGRXZStkK0haZHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEVNeUdaeWN5Ni9nR2pOSEtVaDI4am1WNlpnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBCN1A1SEJCIiwibWUiOnsiaWQiOiIyMzQ5MTU4ODc1NDAzOjQ2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLNkcveFFRaXBXUnVBWVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJoRHM1c2Z4MWtjcG9LbXZUUXllaFVNdjVLckYzTWk5TlFQdjFBZnZPbEVNPSIsImFjY291bnRTaWduYXR1cmUiOiIrNzhZVzNReTY3OGl2b0IxN0dtU281K2tnL3Foenh0T3F0RVZhYmpHNnJVM0I4YjZTMk9QYmRlSGVlaDZtdjZSV0tNeElRK0RGYUFvckloUHUrU3VBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoianFMMTN4RHJ4cmN5Wk9wS0xObUs5YlM0cDVUa0djVUFlSlpCUmxxV2hsOHp4TVFDU0dNMkk1Y3dKMGNPREQxbXhGRktIa245dDdoZUZFNnhHMzJKaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTU4ODc1NDAzOjQ2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllRN09iSDhkWkhLYUNwcjAwTW5vVkRMK1NxeGR6SXZUVUQ3OVFIN3pwUkQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjgzMzQ0ODYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRkVKIn0=' , 'Byte;;;',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "on",
    OWNER_NAME: process.env.OWNER_NAME || "ZENIN",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349158875403",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ZENIN-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
