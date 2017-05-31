'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var resultsContainer = $$('.container').get(1);
var filterInputField = element(by.model('select'));
var optionsOnSortingDropdown = element(by.model('sort')).all(by.tagName('option'));
var newCustomerButton = element(by.buttonText('NEW CUSTOMER'));
var customerNameInput = element(by.model('customer.name'));
var customerAddressInput = element(by.model('customer.address'));
var townInputField = element(by.model('customer.town'));
var customerTownDropdown = element(by.model('customer.townId'));
var saveButton = element(by.buttonText('SAVE'));
var searchInput = $('[type="search"]');
var customerTownBugojno = element.all(by.model('customer.townId')).get(9);
var customerTownDrvetine = element.all(by.model('customer.townId')).get(12);
var thirdCustomerOnList = $$('[ng-repeat="customer in customers"]').get(2);
var table = $('#datatable');
var editButton_first = $$('[ng-click="edit(customer)"]').first();
var deleteButton_first = $$('[ng-click="delete(customer.id)"]').get(0);
var yesAllertButton = $('.sa-confirm-button-container');
var OKbutton = element(by.buttonText('OK'));
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var yesUpdateButton = element(by.buttonText('Yes, update it!'));
var deleteButtons = $$('[ng-click="delete(customer.id)"]');

var allSortingDropdownElements = [
    optionsOnSortingDropdown.get(1),
    optionsOnSortingDropdown.get(2),
    optionsOnSortingDropdown.get(3),
    optionsOnSortingDropdown.get(4)
]

var CustomersPage = function () {

    this.verify_current_url = function () {
        helper.verifyCurrentUrl('/customers')
        return this;
    };

    this.verify_Filter_input_field_is_enabled_and_blank = function () {
        helper.verifyElementIsEnabled(filterInputField);
        helper.verifyInputFieldIsBlank(filterInputField);
        return this;
    };

    this.verify_available_sorting_options = function () {
        helper.verifyTextFields(allSortingDropdownElements, D.sortingOptions)
        return this;
    };

    this.enter_word_on_Filter = function () {
        helper.clearAndEnterValue(filterInputField, 'VOGOŠĆA');
        return this;
    };

    this.click_Yes_insert_it = function () {
        helper.waitAndClick(yesAllertButton);
        return this;
    };

    this.click_Yes_update_it = function () {
        helper.waitAndClick(yesUpdateButton);
        return this;
    };

    this.click_OK = function () {
        browser.wait(EC.elementToBeClickable(OKbutton),5000);
        helper.waitAndClick(OKbutton);
        return this;
    };


    this.verify_filter_is_applied_properly = function () {
        helper.verifyText(resultsContainer, 'VOGOŠĆA');
        helper.verifyElementDoesNotContainText(resultsContainer, 'SARAJEVO');
        return this;
    };

    this.click_NEW_CUSTOMER_button = function () {
        helper.waitAndClick(newCustomerButton);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (customerName) {
        helper.clearAndEnterValue(customerNameInput, customerName);
        return this;
    };

    this.enter_new_name_in_Address_input_field = function (customerAddress) {
        helper.clearAndEnterValue(customerAddressInput, customerAddress);
        return this;
    };

    this.enter_DRV_in_Town_input_field = function () {
        helper.clearAndEnterValue(townInputField,'DRV');
        return this;
    };

    this.enter_BUG_in_Town_input_field = function () {
        helper.clearAndEnterValue(townInputField,'BUG');
        return this;
    };

    this.select_town = function (townName) {
        var optionElement = element.all(by.cssContainingText('option', townName)).get(0);
        helper.waitAndClick(optionElement);
        return this;
    };

    this.click_Edit_on_first_row = function () {
        helper.waitAndClick(editButton_first);
        return this;
    };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        browser.sleep(2000);
        return this;
    };

    this.search_for_customer_name = function (customerName) {
        helper.enterValue(searchInput, customerName);
        return this;
    };

    this.clear_search_input = function () {
        helper.waitVisibility(searchInput);
        searchInput.clear();
        return this;
    };

    this.verify_new_record_is_displayed = function (customerName, address, town) {
        helper.verifyText(table, customerName);
        helper.verifyText(table, address);
        helper.verifyText(table, town);

        return this;
    };

    this.click_Delete_button_on_third_row = function () {
        helper.waitAndClick(yesAllertButton);
        helper.waitVisibility(deleteButtons.get(2))
        helper.waitAndClick(deleteButtons.get(2));
        return this;
    };

    this.verify_new_record_is_not_displayed = function () {
       // browser.sleep(1000)
        helper.verifyTextIsNotDisplayed(table, D.customerRandomName_edited)
        return this;
    };

    this.click_Delete_button_on_first_row = function () {
        helper.waitAndClick(deleteButtons.first());
        return this;
    };

    this.click_Yes_delete_it = function () {
        browser.sleep(2000)
        helper.clickByJavaScriptExecutor(yesDeleteButton);
        //helper.waitAndClick(yesDeleteButton);
        return this;
    };

};

module.exports = new CustomersPage();
