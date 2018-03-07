const chai = require('chai');
var expect = chai.expect
const { By, Key, until } = require('selenium-webdriver');

module.exports = {
    loginFlow: async function(driver) {
        let username = await driver.findElement(By.name('username'))
        await username.sendKeys('sailotechtn2').then(function() {
            return username.getAttribute('value');
        }).then(function(value) {
            try {
                expect(value).to.equal('sailotechtn2');
            } catch (err) {
                console.log('=====================case 1 Error=======================');
                console.log(err);
                console.log('=====================case 1 Error=======================');
                driver.quit();
            }
        });
        await driver.takeScreenshot().then(function(image, err) {
            require('fs').writeFile('./screenshot/case-1/login.png', image, 'base64', function(err) {});
        });
        let password = await driver.findElement(By.name('password'));
        await password.sendKeys('1234').then(function() {
            return password.getAttribute('value');
        }).then(function(value) {
            try {
                expect(value).to.equal('1234');
            } catch (err) {
                console.log('=====================case 2 Error=======================');
                console.log(err);
                console.log('=====================case 2 Error=======================');
                driver.quit();
            }
        });
        await driver.sleep(500)
        await driver.findElement(By.id('loginId')).click();
        await driver.sleep(500)
    }
}