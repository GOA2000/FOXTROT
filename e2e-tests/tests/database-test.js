var page = require('../pages/database-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');
var db   = require('../helpers/database-connection.js');

describe('Verifying new record is present in database', function () {

    beforeAll(function() {
        loginPage.log_in();
        menu.click_Shippers();
        db.countDbRecordsBeforeAction('Select * from Shippers');
    });

    xit('1. Verify record is present after creating it', function () {
        page.click_NEW_SHIPPER_button()
            .enter_new_name_in_Name_input_field(D.shipperRandomName)
            .enter_new_name_in_Address_input_field(D.shipperRandomAddress)
            .select_town(D.Town[2])
            .click_Save()
            .verify_new_record_is_displayed(D.shipperRandomName, D.shipperRandomAddress, D.Town[2]);

        browser.sleep(2000)
    });

    xit('2. Verify new shipper is saved to database', function (done) {
        page.verify_new_record_is_saved_to_database().then(function () {
            done()
        })
    });

    xit('3. Verify all records for new shipper are saved to database', function (done) {
        page.verify_all_values_in_database_for_new_record(D.shippers_dbValues).then(function () {
            done()
        })
    });

});


