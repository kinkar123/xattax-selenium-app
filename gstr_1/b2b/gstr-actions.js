// var robot = require("robotjs");
var Excel = require('exceljs');
var path = require('path');
module.exports = {
    setReturnDate: async function(driver, By, Keys, until) {
        await driver.findElement(By.xpath('//*[@id="chooseGSTIN"]/tbody/tr/td[9]/button')).click();
        await driver.sleep(1000)
        await driver.findElement(By.id('fp-datepicker')).click();
        await driver.sleep(1000)
        await driver.findElement(By.xpath('/html/body/div[9]/div[2]/table/tbody/tr/td/span[2]')).click();
        await driver.takeScreenshot().then(function(image, err) {
            require('fs').writeFile('./screenshot/case-1/return-period.png', image, 'base64', function(err) {});
        });
        await driver.sleep(1000)
    },
    import: async function(driver, By, Keys, until) {
        await driver.findElement(By.xpath('//*[@id="sidebar"]/div/nav/ul/li[3]/a')).click();
        await driver.sleep(1000)
        await driver.findElement(By.xpath('//*[@id="sidebar"]/div/nav/ul/li[3]/ul/li[2]/a')).click();
        await driver.sleep(1000)
        await driver.findElement(By.id('fp')).click();
        await driver.sleep(1000)
        await driver.findElement(By.xpath('/html/body/div[9]/div[2]/table/tbody/tr/td/span[2]')).click();
        await driver.findElement(By.xpath('//*[@id="dataImp"]/div[2]/div[1]/div/label[1]')).click()
        await driver.sleep(1000);
        var ele = await driver.findElement(By.css('.file'));
        var elm = await driver.findElement(By.id("dataImport"));
        await driver.executeScript('arguments[0].removeAttribute("readonly");', elm);
        await ele.sendKeys(path.resolve(__dirname, '../../GSTN_Template TN3.xlsx'));
        await driver.findElement(By.id('gstinformat')).click();
        await driver.sleep('3000');
        await driver.findElement(By.className('confirm')).click();
        await driver.sleep('4000');

    },
    addRecord: async function(driver, By, Keys, until) {
        var invoiceDetail = [];
        var itemDetail = [];
        var bankDetail = [];
        var workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(__dirname + '/../../GSTR1_B2B_XLS_1.xlsx')
            .then(function() {
                var worksheet1 = workbook.getWorksheet('Sheet1');
                var worksheet2 = workbook.getWorksheet('Sheet2');
                var worksheet3 = workbook.getWorksheet('Sheet3');
                //  console.log('worksheet1', worksheet1[0]);

                worksheet1.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                    if (rowNumber === 2)
                        invoiceDetail = JSON.parse(JSON.stringify(row.values));
                });
                worksheet2.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                    itemDetail.push(JSON.parse(JSON.stringify(row.values)));
                });
                worksheet3.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                    if (rowNumber === 2)
                        bankDetail = JSON.parse(JSON.stringify(row.values));
                });
                // console.log('invoiceDetail', invoiceDetail);
                // console.log('itemDetail', itemDetail);
                // console.log('bankDetail', bankDetail);
            });
        // var date = new Date('24/08/2017');
        function click(xpath, id) {
            var elem = {};
            if (xpath) {
                elem = driver.findElement(By.xpath(xpath)).click();
            } else if (id) {
                elem = driver.findElement(By.id(id)).click();
            }
            return elem;
        }

        function passText(xpath, id, value) {
            var elem = {};
            if (xpath) {
                elem = driver.findElement(By.xpath(xpath)).sendKeys(value);
            } else if (id) {
                elem = driver.findElement(By.id(id)).sendKeys(value);
            }
            return elem;
        }

        await click('//*[@id="sidebar"]/div/nav/ul/li[3]/a', '');
        await driver.sleep(1000);
        await click('//*[@id="sidebar"]/div/nav/ul/li[3]/ul/li[4]/a', '');
        await click('//*[@id="container"]/div[4]/div/div/div/div[1]/div/div/a', '');
        await click('//*[@id="Classify"]/div/div[1]/div/div[2]/a', '');
        await passText('', 'inum', invoiceDetail[1])
        await click('', 'idt');
        await driver.sleep(1000);
        await click('/html/body/div[8]/div[1]/table/tbody/tr[3]/td[3]', '');
        await passText('', 'invoiceType', invoiceDetail[6]);
        await passText('', 'rchrg', invoiceDetail[7]);
        await passText('', 'cname', invoiceDetail[3]);
        await passText('', 'ctin', invoiceDetail[4])
        await passText('', 'cAddress', invoiceDetail[5]);
        await passText('', 'pos', invoiceDetail[8]);
        await driver.takeScreenshot().then(function(image, err) {
            require('fs').writeFile('./screenshot/case-1/invoice-detail.png', image, 'base64', function(err) {});
        });
        await driver.sleep(2000);
        // //addLine
        for (let i in itemDetail) {
            if (i > 0) {
                await click('//*[@id="app"]/div[2]/div/div/form/div[2]/div[4]/div[1]/div/div[1]/div/button', '');
                await passText('//*[@id="fixTable"]/tbody/tr[' + i + ']/td[2]/div/input', '', itemDetail[i][2]);
                await driver.sleep(1000);
                await passText('//*[@id="fixTable"]/tbody/tr[' + i + ']/td[3]/select', '', itemDetail[i][3]);
                await passText('//*[@id="fixTable"]/tbody/tr[' + i + ']/td[4]/div/input', '', itemDetail[i][4]);
                await passText('//*[@id="fixTable"]/tbody/tr[' + i + ']/td[5]/div/input', '', itemDetail[i][5]);
                await passText('//*[@id="fixTable"]/tbody/tr[' + i + ']/td[6]/div/select', '', itemDetail[i][6]);
                await passText('//*[@id="fixTable"]/tbody/tr[' + i + ']/td[7]/div/input', '', itemDetail[i][7]);
            }
        }
        await driver.sleep(2000);
        await passText('', 'bankName', bankDetail[1])
        await passText('//*[@id="app"]/div[2]/div/div/form/div[2]/div[4]/div[4]/div[2]/div[2]/div/input', '', bankDetail[2])
        await passText('//*[@id="app"]/div[2]/div/div/form/div[2]/div[4]/div[4]/div[1]/div[4]/div/input', '', bankDetail[3])
        await passText('//*[@id="app"]/div[2]/div/div/form/div[2]/div[4]/div[4]/div[2]/div[4]/div/input', '', bankDetail[4])
        await driver.sleep(2000);
        await driver.takeScreenshot().then(function(image, err) {
            require('fs').writeFile('./screenshot/case-1/bank-detail.png', image, 'base64', function(err) {});
        });
        await driver.findElement(By.xpath('//*[@id="page-title"]/div/div/div[3]/button[2]')).submit();
        await driver.takeScreenshot().then(function(image, err) {
            require('fs').writeFile('./screenshot/case-1/success-save-detail.png', image, 'base64', function(err) {});
        });
        await driver.sleep(2000);
        await click('//*[@id="page-title"]/div/div/div[3]/a', '');
    },
    editRecord: async function(driver, By) {
        await driver.findElement(By.xpath('//*[@id="ClassifyTable"]/tbody/tr[1]/td[11]/button[1]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.id('etin')).sendKeys('GSTIN100');
        await driver.findElement(By.xpath('//*[@id="app"]/div[2]/div/div/form/div[2]/div[4]/div[1]/div/div[1]/div/button')).click();
        await driver.findElement(By.xpath('//*[@id="fixTable"]/tbody/tr[2]/td[2]/div/input')).sendKeys('Automobile');
        await driver.sleep(1500);
        await driver.findElement(By.xpath('//*[@id="ui-id-3"]/li')).click();
        await driver.sleep(2200);
        await driver.findElement(By.xpath('//*[@id="fixTable"]/tbody/tr[2]/td[7]/div/input')).sendKeys(10);
        await driver.sleep(2200);
        await driver.findElement(By.xpath('//*[@id="fixTable"]/tbody/tr[2]/td[10]/div/select')).sendKeys(18);
        await driver.sleep(2200);
        await driver.findElement(By.xpath('//*[@id="page-title"]/div/div/div[3]/button[2]')).submit();
        await driver.sleep(2200);
        await driver.findElement(By.xpath('//*[@id="page-title"]/div/div/div[3]/a')).submit();


    }
}