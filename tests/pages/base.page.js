let EC = protractor.ExpectedConditions;

const DEFAULT_TIMEOUT = 30000;

class BasePage {

    get blockUIScreen() { return element(by.css('.blockUI')); }
    get modalWindow() { return element(by.css('.modal-content')); }

    constructor() {
        browser.ignoreSynchronization = true;
    }

    selectDropdownByText(element, item, milliseconds) {
        let desiredOption;
        element.all(by.tagName('option'))
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText().then(function doesOptionMatch(text) {
                        if (text.indexOf(item) != -1) {
                            desiredOption = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                if (desiredOption) {
                    desiredOption.click();
                }
            });
        if (typeof milliseconds != 'undefined') {
            browser.sleep(milliseconds);
        }
    }

    urlIs(url) {
        browser.wait(EC.urlIs(url), DEFAULT_TIMEOUT);
    }

    urlContains(substring) {
        browser.wait(EC.urlContains(substring), DEFAULT_TIMEOUT);
    }

    waitElementToBeClickable(element) {
        browser.wait(EC.elementToBeClickable(element), DEFAULT_TIMEOUT);
    }

    waitForVisibility(element) {
        browser.wait(EC.visibilityOf(element), DEFAULT_TIMEOUT);
    }

    waitAndClick(element) {
        if (process.env.SLOW) {
            this.wait().wait();
        }

        this.waitForVisibility(element);
        this.waitElementToBeClickable(element);
        return element.click();
    }

    waitAndSend(element, input) {
        if (process.env.SLOW) {
            this.wait().wait();
        }

        this.waitForVisibility(element);
        element.sendKeys(input);
    }

    _waitForStaleness(element) {
        browser.wait(EC.stalenessOf(element), DEFAULT_TIMEOUT);
    }

    waitForInvisibility(element) {
        browser.wait(EC.invisibilityOf(element), DEFAULT_TIMEOUT);
    }

    waitModalClose() {
        browser.manage().timeouts().implicitlyWait(1000);
        this._waitForStaleness(this.modalWindow);
        browser.manage().timeouts().implicitlyWait(5000);
    }

    waitOverlayHidden() {
        browser.manage().timeouts().implicitlyWait(1000);
        this._waitForStaleness(this.blockUIScreen);
        browser.manage().timeouts().implicitlyWait(5000);
    }

    scrollDown() {
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            browser.sleep(100);
        });
    }

    wait() {
        browser.sleep(1500);
        return this;
    }

    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    clickAndWaitForModal(button) {
        browser.manage().timeouts().implicitlyWait(100);

        browser.wait(() => {
            const waitForModal = () => {
            return browser.wait(
                EC.and(
                    EC.presenceOf($('.modal-open')),
                    EC.stalenessOf($('.blockUI'))
                ),
                100
            ).then(() => true, () => {})
    };

        return this.waitAndClick(button)
            .then(waitForModal, waitForModal);

    });

        browser.manage().timeouts().implicitlyWait(DEFAULT_TIMEOUT);
    }

    waitForTextToBePresentInElement(element, text) {
        browser.wait(EC.textToBePresentInElement(element, text), DEFAULT_TIMEOUT);
    }
}
module.exports = BasePage;