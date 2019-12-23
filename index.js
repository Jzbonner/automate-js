/**This web scraper pulls in popular stock price data from CNN */

/**Puppeteer initialization */
const puppeteer = require("puppeteer"); 
const browserFetcher = puppeteer.createBrowserFetcher({ platform: 'linux' });
const revision = require('puppeteer/package').puppeteer.chromium_revision;

browserFetcher.download(revision)
    .then(() => console.log('Done, with revision number: ', revision))
    .catch(error => console.log('Error', error));

/**Headless browser functionality */
async function main() {
    const browser = await puppeteer.launch({
        headless: false, // -> this is set to false for visual purposes
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 
    })
    let stockURL = "https://money.cnn.com/data/hotstocks/index.html";    
    const page = await browser.newPage(); 
    await page.goto(stockURL);
    

    let data = await page.evaluate(() => {
        let stockAbbr = document.querySelector('td a[class="wsod_symbol"]').innerText; 
        let stockName = document.querySelector('td a[class="wsod_symbol"] + span').innerText; 
        let stockPrice = document.querySelector('td[class="wsod_aRight"] > span').innerText; 
        return {
            stockAbbr, 
            stockName, 
            stockPrice
        }
        
    });

    /**Displays returned data in debug console*/
    console.log(data); 
    await browser.close();
}; 

main(); 