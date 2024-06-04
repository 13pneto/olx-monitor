require('dotenv').config()
const axios = require('axios');

const ip_olx_api_urls_config = process.env.IP_OLX_API_URLS_CONFIG;
const interval_in_minutes = process.env.INTERVAL_IN_MINUTES;

console.log(`IP_OLX_API_URLS_CONFIG: ${ip_olx_api_urls_config}`);
console.log(`INTERVAL_IN_MINUTES: ${interval_in_minutes} minutes`);

let config = {};

async function fetchUrls() {
    try {
        const response = await axios.get(`http://${ip_olx_api_urls_config}/urls`);
        const urls = response.data.map(obj => obj.url);
        console.log(`Found ${urls.length} URLs to monitor: ${urls.join(", ")}`);

        return urls;
    } catch (error) {
        console.error('Erro ao obter as URLs do serviço:', error);
        // Retornar uma lista vazia em caso de erro
        return [];
    }
}

config.GetUrls = async () => {
    return await fetchUrls();
};

// this tool can help you create the interval string:
// https://tool.crontap.com/cronjob-debugger

config.interval = `*/${interval_in_minutes} * * * *` 
config.telegramChatID = process.env.TELEGRAM_CHAT_ID
config.telegramToken = process.env.TELEGRAM_TOKEN
config.dbFile = '../data/ads.db'

config.logger={
    logFilePath: '../data/scrapper.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss'
}

module.exports = config;