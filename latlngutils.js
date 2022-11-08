const puppeteer = require("puppeteer");
const retrieveLatLng = async (county, route, postmile) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto(`https://postmile.dot.ca.gov/PMQT/PostmileQueryTool.html?type=PM&mode=P&pm=${county} ${route} ${postmile}`, {waitUntil: "networkidle0", timeout: 0});
  
    // Latitude Decimal Value
    const lat = await page.$eval('input#latDecimal', el => el.value);

    // Longitude Decimal Value
    const lng = await page.$eval('input#lngDecimal', el => el.value);
  
    await browser.close();

    return {lat, lng}
}

module.exports = {
    retrieveLatLng
}