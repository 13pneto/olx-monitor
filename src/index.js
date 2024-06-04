const config = require("./config")
const cron = require("node-cron")
const { initializeCycleTLS } = require("./components/CycleTls")
const $logger = require("./components/Logger")
const { scraper } = require("./components/Scraper")
const { createTables } = require("./database/database.js")

const runScraper = async () => {

  var urls = await config.GetUrls();

console.log(`config.urls.length ==== ${urls.length}`);

  for (let i = 0; i < urls.length; i++) {
    try {
      scraper(urls[i])
    } catch (error) {
      $logger.error(error)
    }
  }
}

const main = async () => {
  $logger.info("Program started")
  await createTables()
  await initializeCycleTLS()
  runScraper()
}

main()

cron.schedule(config.interval, () => {
  console.log('awaiting time to start again');
  runScraper()
})
