module.exports = {
    waitForLocated: async function(driver, locator, retries) {
        try {
            await driver.wait(until.elementLocated(locator), 7000)
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Still not able to locate element ${locator.toString()} after maximum retries, Error message: ${err.message.toString()}`)
            }
            await driver.sleep(500)
            return this.waitForLocated(driver, locator, retries - 1)
        }
    },
    waitForVisible: async function(driver, locator, retries) {
        try {
            const element = await driver.findElement(locator)
            await driver.wait(until.elementIsVisible(element), 7000)
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Element ${locator.toString()} still not visible after maximum retries, Error message: ${err.message.toString()}`)
            }
            await driver.sleep(500)
            return this.waitForVisible(driver, locator, retries - 1)
        }
    },
    waitForDisplayed: async function(locator, retries) {
        await this.waitForLocated(driver, locator, retries)
        await this.waitForVisible(driver, locator, retries)
        return driver.findElement(locator)
    },
    sendKeys: async function(locator, keys, retries) {
        try {
            const element = await driver.findElement(locator)
            await element.click()
            await element.clear()
            await element.sendKeys(keys)
            return
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Unable to send keys to ${locator.toString()} after maximum retries, error : ${err.message}`)
            }
            await driver.sleep(500)
            return sendKeys(locator, keys, retries - 1)
        }
    },
    getText: async function(locator, retries) {
        try {
            const element = await driver.findElement(locator)
            const text = await element.getText()
            return text
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Unable to get ${locator.toString()} text after maximum retries, error : ${err.message}`)
            }
            await driver.sleep(500)
            return getText(locator, retries - 1)
        }
    },
    click: async function(locator, retries) {
        try {
            const element = await driver.findElement(locator)
            await element.click()
            return
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Still not able to click ${locator.toString()} after maximum retries, Error message: ${err.message.toString()}`)
            }
            await driver.sleep(500)
            return click(locator, retries - 1)
        }
    },
    checkTitle: function(driver) {
        var promise = driver.getTitle().then(function(title) {
            if (title && title.indexOf('Theme') !== -1) {
                setTimeout(function() {
                    return true;
                }, 2000);
            } else {
                console.log('fail');
            }
        })
        return promise;
    }
}