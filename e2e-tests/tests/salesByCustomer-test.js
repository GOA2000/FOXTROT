var page = require('../pages/salesByCustomer-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var submenu = require('../pages/submenu.js');
var D    = require('../data-provider/conf-data.js');


describe('Sales by Customer report functionalities', function () {

    beforeAll(function() {
        browser.refresh();
        loginPage.log_in();
        menu.click_Reports();
        submenu.click_Sales_by_Customer();
        page.select_start_date(D.dates_forReport[0])
            .select_end_date(D.dates_forReport[1])
            .click_SHOW_SALES_BY_CUSTOMER_button()
    });

    it('1. Verify table headers are present', function () {
        page.verify_table_headers()
    });

    it('2. Verify turnovers are present', function () {
        page.verify_turnovers_on_report()
    });

    it('3. Verify percentages are present', function () {
        page.verify_percentages_on_report()
    });

    it('4. Verify certain number of entries is present', function () {
        page.count_number_of_table_entries()
    });

});