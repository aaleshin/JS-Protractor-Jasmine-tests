let DashboardsPage = require('./pages/dashboards.page.js');
let faker = require('faker');

describe('Dashboard tests', () => {

    it('should be able create a new Dashboard Team', () => {
        const DashboardName = 'DashboardTest' + faker.random.number(10000, 10000000);
        const DashboardDescription = 'Desk';
        const Organization = 'VP';
        const GroupsName = 'QA';

        DashboardsPage.open();
        DashboardsPage.createNewDashboard(DashboardName, DashboardDescription, Organization, GroupsName);
        expect(element.all(by.css('div.ui-grid-row')).count()).toEqual(1);
    });
});