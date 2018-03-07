require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { login, gstr1, config } = require('./polyfills');
var driver = config.build(Builder);
driver.manage().window().maximize();
// (async function example() {
//     try {
//         await driver.get(config.appUrl);
//         await login.loginFlow(driver);
//         await gstr1.gstrFlow(driver, By, Key, until);
//     } finally {
//         // await driver.quit();
//     }
// })();


describe("XATTAX Automation", function() {
    it('XATTAX SAVE RECORD', async function(done) {
        new Promise(async function(resolve, reject) {
            await driver.get(config.appUrl)
            await login.loginFlow(driver)
            await gstr1.gstrFlow(driver, By, Key, until).then(function() {
                resolve('final');
            });
        }).then(function(result) {
            console.log('====================Finally Successfully done..====================');
            driver.quit();
        });
        done();
    })
});