'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var newSupplierButton = element(by.buttonText('NEW SUPPLIER'));
var supplierNameInput = element(by.model('supplier.name'));
var supplierAddressInput = element(by.model('supplier.address'));
var townInputField = element(by.model('supplier.town'));
var saveButton = element(by.buttonText('SAVE'));
var lastSupplierOnList = $$('[ng-repeat="supplier in suppliers | filter:selector | orderBy:sort"]').last();
var editButton_first = $$('[ng-click="edit(supplier)"]').first();
var deleteButton_first = $$('[ng-click="delete(supplier.id)"]').first();
var table = $('#datatable');
var supplierTownDropdown = element(by.model('supplier.address'));
var searchInput = $('[type="search"]');
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var yesUpdateButton = element(by.buttonText('Yes, update it!'));
var searchInput = $('[type="search"]');
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var yesUpdateButton = element(by.buttonText('Yes, update it!'));

var SuppliersPage = function () {

    this.click_NEW_SUPPLIER_button = function () {
        helper.waitAndClick(newSupplierButton);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (supplierName) {
        helper.clearAndEnterValue(supplierNameInput, supplierName);
        return this;
    };

    this.enter_new_name_in_Address_input_field = function (supplierAddress) {
        helper.clearAndEnterValue(supplierAddressInput, supplierAddress);
        return this;
    };

    this.enter_SAR_in_Town_input_field = function () {
        helper.clearAndEnterValue(townInputField,'SAR');
        return this;
    };

    this.enter_ZEN_in_Town_input_field = function () {
        helper.clearAndEnterValue(townInputField,'ZEN');
        return this;
    };

    this.select_town = function (townName) {
        helper.selectDropdownOption(supplierTownDropdown, townName);
        return this;
    };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        return this;
    };

    this.click_Yes_update_it = function () {
        browser.sleep(2000)
        helper.waitAndClick(yesUpdateButton);
        return this;
    };

    this.search_for_supplier_name = function (supplierName) {
        helper.enterValue(searchInput, supplierName);
        return this;
    };

    this.verify_new_record_is_displayed = function (supplierName, address, town) {
        helper.verifyText(table, supplierName);
        helper.verifyText(table, address);
        helper.verifyText(table, town);
        return this;
    };

    this.click_Edit_on_first_row = function () {
        helper.waitAndClick(editButton_first);
        return this;
    };

    this.click_Delete_button_on_first_row = function () {
        helper.waitAndClick(deleteButton_first);
        return this;
    };

    this.verify_new_record_is_not_displayed = function () {
        helper.verifyTextIsNotDisplayed(table, D.supplierRandomName_edited)
        return this;
    };

    this.clear_search_input = function () {
        helper.waitVisibility(searchInput);
        searchInput.clear();
        return this;
    };

    this.click_Yes_delete_it = function () {
        browser.sleep(2000)
        helper.waitAndClick(yesDeleteButton);
        return this;
    };

};

module.exports = new SuppliersPage();
