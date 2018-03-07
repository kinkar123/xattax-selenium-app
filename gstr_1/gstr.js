const { By, Key, until } = require('selenium-webdriver');
const actions = require('./b2b/gstr-actions.js');
module.exports = {
    gstrFlow: async function(driver) {
        await actions.setReturnDate(driver, By, Key, until);
        //   await actions.import(driver, By, Key, until);
        await actions.addRecord(driver, By, Key, until);
        //await actions.editRecord(driver, By);

    }
}