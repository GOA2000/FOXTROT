'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var newShipperButton = element(by.buttonText('NEW SHIPPER'));
var shipperNameInput = element(by.model('shipper.name'));
var shipperAddressInput = element(by.model('shipper.address'));
var townInputField = element(by.model('shipper.town'));
var saveButton = element(by.buttonText('SAVE'));
var lastShipperOnList = $$('[ng-repeat="shipper in shippers | filter:selector | orderBy:sort"]').last();
var editButton_first = $$('[ng-click="edit(shipper)"]').first();
var deleteButton_first = $$('[ng-click="delete(shipper.id)"]').first();
var table = $('#datatable');
var shipperTownDropdown = element(by.model('shipper.town'));
var searchInput = $('[type="search"]');
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var yesUpdateButton = element(by.buttonText('Yes, update it!'));


var ShippersPage = function () {

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
        helper.clearAndEnterValue(townInputField, fullTownName.substr(0,3));
        var optionElement = element.all(by.cssContainingText('option', fullTownName)).get(0);
        helper.waitAndClick(optionElement);
        return this;
    };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        return this;
    };

    this.verify_new_record_is_displayed = function (shipperName, address, town) {
        helper.verifyText(table, shipperName);
        helper.verifyText(table, address);
        helper.verifyText(table, town);
        return this;
    };

    this.click_Edit_on_first_row = function () {
        helper.waitAndClick(editButton_first);
        return this;
    };

    this.click_Delete_button_on_first_row = function () {
       // browser.sleep(5000)
        helper.waitAndClick(deleteButton_first);
        return this;
    };

    this.click_Yes_delete_it = function () {
        browser.sleep(2000)
        helper.waitAndClick(yesDeleteButton);
        return this;
    };

    this.verify_new_record_is_not_displayed = function () {
        browser.sleep(2000)
        helper.verifyTextIsNotDisplayed(table, D.shipperRandomName_edited)
        return this;
    };

    this.search_for_shipper_name = function (shipperName) {
        helper.enterValue(searchInput, shipperName);
        return this;
    };


    this.click_Yes_update_it = function () {
        browser.sleep(2000)
        helper.waitAndClick(yesUpdateButton);
        return this;
    };

    this.clear_search_input = function () {
        helper.waitVisibility(searchInput);
        searchInput.clear();
        return this;
    };

};

module.exports = new ShippersPage();

