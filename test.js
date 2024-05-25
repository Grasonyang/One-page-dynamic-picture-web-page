const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--ignore-certificate-errors'); // 忽略证书错误
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(chromeOptions)
        .build();
    try {
        await driver.get('https://deepai.org/machine-learning-model/text2img');
        let log = await driver.wait(until.elementLocated(By.id('headerLoginButton')));
        await log.click();
        let switch_email = await driver.wait(until.elementLocated(By.id('switch-to-email')));
        await switch_email.click();
        let email = await driver.wait(until.elementLocated(By.id('user-email')));
        await email.sendKeys("grasonyang@gmail.com");
        let pwd = await driver.wait(until.elementLocated(By.id('user-password')));
        await pwd.sendKeys("Aa035181510");
        let login = await driver.wait(until.elementLocated(By.id('login-via-email-id')));
        await login.click();
        let generate_text = "milk";
        let textarea = await driver.wait(until.elementLocated(By.className('model-input-text-input')));
        await textarea.sendKeys(generate_text);
        let button = await driver.wait(until.elementLocated(By.id('modelSubmitButton')));
        await button.click();
        await driver.sleep(100000);
    } finally {
        await driver.quit();
    }
})();