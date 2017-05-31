'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var newCategoryButton = element(by.buttonText('NEW CATEGORY'))
var categoryNameInput = element(by.model('category.name'));
var saveButton = element(by.buttonText('SAVE'));
var categoriesOnList = $$('[ng-repeat="category in categories | filter:selector | orderBy:sort"]');
var lastCategoryOnList = $$('[ng-repeat="category in categories | filter:selector | orderBy:sort"]').last();
var editButton_first = $$('[ng-click="getCategory(category)"]').first();
var deleteButton_first = $$('[ng-click="deleteCategory(category)"]').first();
var table = $('#datatable');
var searchInput = $('[type="search"]');
var yesDeleteButton = element(by.buttonText('Yes, delete it!'));
var yesUpdateButton = element(by.buttonText('Yes, update it!'));


var CategoriesPage = function () {

    this.click_NEW_CATEGORY_button = function () {
        helper.waitAndClick(newCategoryButton);
        return this;
    };

    this.search_for_category_name = function (categoryName) {
        helper.enterValue(searchInput, categoryName);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (categoryName) {
        helper.clearAndEnterValue(categoryNameInput, categoryName);
        return this;
    };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        return this;
    };

    this.verify_new_record_is_displayed = function (categoryName) {
        browser.sleep(4000)
        helper.verifyText(table, categoryName);
        return this;
    };

    this.click_Yes_update_it = function () {
        helper.waitAndClick(yesUpdateButton);
        return this;
    };

    this.click_Edit_on_first_row = function () {
        helper.waitAndClick(editButton_first);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (categoryName) {
        helper.clearAndEnterValue(categoryNameInput, categoryName);
        return this;
    };

    this.click_Delete_button_on_first_row = function () {
        helper.waitAndClick(deleteButton_first);
        return this;
    };

    this.click_Yes_delete_it = function () {
        helper.clickByJavaScriptExecutor(yesDeleteButton);
       // helper.waitAndClick(yesDeleteButton);
        return this;
    };

    this.verify_new_record_is_not_displayed = function () {
        browser.sleep(2000)
        helper.verifyTextIsNotDisplayed(table, D.categoryRandomName_edited)
        return this;
    };

};

module.exports = new CategoriesPage();