'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');
var db = require('../helpers/database-connection.js');

var newShipperButton = element(by.buttonText('NEW SHIPPER'));
var shipperNameInput = element(by.model('shipper.name'));
var shipperAddressInput = element(by.model('shipper.address'));
var townInputField = element(by.model('shipper.town'));
var saveButton = element(by.buttonText('SAVE'));
var lastShipperOnList = $$('[ng-repeat="shipper in shippers | filter:selector | orderBy:sort"]').last();
var allShippersOnList = $$('[ng-repeat="shipper in shippers | filter:selector | orderBy:sort"]');
var editButton_last = $$('[ng-click="edit(shipper)"]').last();
var deleteButton_last = $$('[ng-click="delete(shipper.id)"]').last();
var table = $('#datatable');
var shipperTownDropdown = element(by.model('shipper.town'));

var DatabasePage = function () {

    this.verify_new_record_is_saved_to_database = function () {
        db.verify_number_of_records_is_increased_by_1(lastShipperOnList, 'Select * from Shippers');
        return browser.getCurrentUrl();
    };

    this.verify_all_values_in_database_for_new_record = function () {
        db.get_all_table_values(lastShipperOnList, 'Select * from Shippers').then(function () {
            expect(JSON.stringify(db.tableValues)).toContain(D.shippers_dbValues[0])
        });
        return browser.getCurrentUrl();
    };

    this.click_NEW_SHIPPER_button = function () {
        helper.waitAndClick(newShipperButton);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (shipperName) {
        helper.clearAndEnterValue(shipperNameInput, shipperName);
        return this;
    };

    this.enter_new_name_in_Address_input_field = function (shipperAddress) {
        helper.clearAndEnterValue(shipperAddressInput, shipperAddress);
        return this;
    };

    this.select_town = function (fullTownName) {
        helper.clearAndEnterValue(townInputField, fullTownName.substr(0, 3));
        var optionElement = element.all(by.cssContainingText('option', fullTownName)).get(0);
        helper.waitAndClick(optionElement);
        return this;
    };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        return this;
    };

    this.verify_new_record_is_displayed = function (shipperName, address, town) {
        helper.verifyText(lastShipperOnList, shipperName);
        helper.verifyText(lastShipperOnList, address);
        helper.verifyText(lastShipperOnList, town);
        return this;
    };

};

module.exports = new DatabasePage();


