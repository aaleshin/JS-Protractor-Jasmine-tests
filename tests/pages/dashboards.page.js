let BasePage = require('./base.page.js');

class DashboardsPage extends BasePage {

    get createNewTeam() {
        return element(by.css('button.btn.btn-lg.btn-primary.p-l-lg.p-r-lg'));
    }

    get inputDashboardName() {
        return element(by.id('dashName'));
    }

    get inputDescription() {
        return element(by.css('[ng-model="metaData.dashboardDescription"]'));
    }

    get divisionsInput() {
        return element(by.css('[ng-true-value="\'R&D\'"]'));
    }

    get orgName() {
        return element(by.css('div.form-inline')).all(by.css('[id="sponsorOrg"]'));
    }

    get groupName() {
        return element(by.css('form[name=newDashNameForm] input#teamName'));
    }

    get okButton() {
        return element(by.css('form[name=newDashNameForm] button.btn-primary'));
    }

    get navigateToDash() {
        return element(by.css('div#appHeader button.nav-dashboards'));
    }

    get dashboardNameLink() {
        return element(by.css('div.ui-grid-row'));
    }

    get teamDasboardInput() {
        return element(by.css('input[placeholder="Search..."]'));
    }

    open() {
        browser.driver.get(`http://op.triton-tek.com/test/`);
    }

    createNewDashboard(DashboardName, DashboardDescription, Organization, GroupsName) {

        this.waitElementToBeClickable(this.createNewTeam);
        this.createNewTeam.click();
        this.waitForVisibility(this.inputDashboardName);
        this.inputDashboardName.sendKeys(DashboardName);
        this.inputDescription.sendKeys(DashboardDescription);
        this.divisionsInput.click();
        this.orgName.sendKeys(Organization);
        this.selectDropdownByText(this.orgName, Organization);
        this.groupName.sendKeys(GroupsName);
        this.selectDropdownByText(this.groupName, GroupsName);
        this.inputDescription.click();
        this.waitElementToBeClickable(this.okButton);
        this.okButton.click();
        this.waitElementToBeClickable(this.navigateToDash);
        this.open();
        this.wait().waitElementToBeClickable(this.teamDasboardInput);
        this.waitAndSend(this.teamDasboardInput, DashboardName);
        this.wait().wait().wait().waitForVisibility(this.dashboardNameLink);
    }
}
module.exports = new DashboardsPage();