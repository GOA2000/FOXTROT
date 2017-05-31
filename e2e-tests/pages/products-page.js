'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var newProductButton = element(by.buttonText('NEW PRODUCT'));
var productNameInput = element(by.model('product.name'));
var productUnitInput = element(by.model('product.unit'));
var productPriceInput = element(by.model('product.price'));
var productsCategoryDropdown = element(by.model('product.categoryId'));
var saveButton = element(by.buttonText('SAVE'));
var lastProductOnList = $$('[ng-repeat="item in products | filter:selector | orderBy:sort"]').last();
var editButton_last = $$('[ng-click="getProduct(item)"]').last();
var deleteButton_last = $$('[ng-click="deleteProduct(item)"]').last();
var table = $('#datatable');
var yesAllertButton = $('.sa-confirm-button-container');
var OKbutton = element(by.buttonText('OK'));
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var searchInput = $('[type="search"]');
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var yesUpdateButton = element(by.buttonText('Yes, update it!'));

var ProductsPage = function () {

    this.click_NEW_PRODUCT_button = function () {
        browser.sleep(2000)
        helper.waitAndClick(newProductButton);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (productName) {
        // browser.sleep(5000)
        helper.clearAndEnterValue(productNameInput, productName);
        return this;
    };

    this.enter_pcs_in_Unit_input_field = function () {
        helper.clearAndEnterValue(productUnitInput,'pcs');
        return this;
    };

    this.enter_price_in_Price_input_field = function (productPrice) {
        helper.clearAndEnterValue(productPriceInput, productPrice);
        return this;
    };

    this.select_category = function (productName) {
        helper.selectDropdownOption(productsCategoryDropdown, productName);
        return this;
    };

    //  this.select_category = function (category) {
    //    var optionElement = element.all(by.cssContainingText('option', category)).get(2);
    //    helper.waitAndClick(optionElement);
    //   return this;
    // };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        return this;
    };

    this.click_Yes_insert_it = function () {
        helper.waitAndClick(yesAllertButton);
        return this;
    };

    this.click_OK = function () {
        //browser.wait(EC.elementToBeClickable(OKbutton),7000);
        helper.waitAndClick(OKbutton);
        return this;
    };

    this.click_Yes_update_it = function () {
        browser.sleep(2000)
        helper.waitAndClick(yesUpdateButton);
        return this;
    };

    this.verify_new_record_is_displayed = function (productName, price, category) {
        helper.verifyText(table, productName);
        helper.verifyText(table, price);
        helper.verifyText(table, category);
        return this;
    };

    this.click_Edit_on_last_row = function () {
        helper.waitAndClick(editButton_last);
        return this;
    };

    this.click_Delete_button_on_last_row = function () {
        helper.waitAndClick(deleteButton_last);
        return this;
    };

    this.verify_new_record_is_not_displayed = function () {
        helper.verifyTextIsNotDisplayed(table, D.productRandomName_edited)
        return this;
    };

    this.click_Yes_delete_it = function () {
        helper.waitAndClick(yesDeleteButton);
        return this;
    };

    this.search_for_product_name = function (productName) {
        helper.enterValue(searchInput, productName);
        return this;
    };
};

module.exports = new ProductsPage();

