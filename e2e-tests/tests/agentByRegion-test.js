var page = require('../pages/agentByRegion-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var submenu = require('../pages/submenu.js');
var D = require('../data-provider/conf-data.js');

var Eyes = require('eyes.protractor').Eyes;
var eyes = new Eyes();
eyes.setApiKey('stjBSn1Nk71Jq3vywM1jOqXKsUNkhy6g0uGaXfEHaC8110');


describe('Agent by region report functionalities', function () {

    beforeAll(function () {
        loginPage.log_in();
        menu.click_Reports();
        submenu.click_Agent_By_Reports();
        page.select_start_date(D.dates_forReport[0])
            .select_end_date(D.dates_forReport[1])
            .click_SHOW_AGENTS_BY_REGION_button()
            .select_agent_on_list(0)
            .scroll_to_chart()
    });

    it('1. Visual validation', function () {

        // Start visual testing with browser viewport set to 1024x768.
        eyes.open(browser, 'Test', 'Agent by Region page');

        // Visual validation point #1
        eyes.checkWindow('Agent by Region page-default');

        // End visual testing. Validate visual correctness.
        eyes.close();
    });

});