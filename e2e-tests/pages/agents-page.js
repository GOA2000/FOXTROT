'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var agentsLink = $('[href="#/agents"]');
var firstAgentOnList = $('[ng-repeat="agent in agents"]');
var newAgentButton = element(by.buttonText('NEW AGENT'));
var saveButton = element(by.buttonText('SAVE'));
var agentNameInput = element(by.model('agent.name'));
var customersLink = $('[href="#/customers"]');
var lastAgentOnList = $$('[ng-repeat="agent in agents"]').last();
//var lastAgentOnList = $$('[ng-repeat="agent in agents | filter:selector | orderBy:sort"]').last();
var agentsOnList = $$('[ng-repeat="agent in agents | filter:selector | orderBy:sort"]');
var table = $('#datatable');
var editButton_last = $$('[ng-click="edit(agent)"]').last();
var editButton_first = $$('[ng-click="edit(agent)"]').first();
var deleteButtons = $$('[ng-click="delete(agent.id)"]');
var modalContainer = $('[show="modalShown"]');
var totalNumberOfAgents;
var lastAgentName;
var yesUpdateButton = element(by.buttonText('Yes, update it!'));

var AgentsPage = function () {

    this.verify_current_url = function () {
        helper.verifyCurrentUrl('/agents');
        return this;
    };


    this.click_Edit_for_first_agent = function () {
        helper.waitAndClick(editButton_first);
        return this;
    };

    this.change_name_of_first_agent = function () {
        helper.clearAndEnterValue(agentNameInput, 'Antonio B');
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

    this.verify_new_agent_name_is_displayed = function () {
        helper.verifyText(table, 'Antonio B');
        return this;
    };

    this.enter_and_save_old_name_again = function () {
        helper.clearAndEnterValue(agentNameInput, 'Antonio Banderas');
        helper.waitAndClick(saveButton);
        return this;
    };

    this.click_NEW_AGENT_button = function () {
        helper.waitAndClick(newAgentButton);
        return this;
    };

    this.enter_new_name_in_Name_input_field = function (agentName) {
        helper.clearAndEnterValue(agentNameInput, agentName);
        return this;
    };

    this.click_Save = function () {
        helper.waitAndClick(saveButton);
        return this;
    };

    this.verify_new_record_is_displayed = function (agentName) {
        helper.verifyText(table, agentName);
        return this;
    };

    this.click_Edit_button_on_first_row = function () {
        helper.waitAndClick(editButton_first);
        return this;
    };

    this.click_Delete_button_on_first_row = function () {
        helper.waitAndClick(deleteButtons.first());
        return this;
    };

    this.verify_new_record_is_not_displayed = function () {
        helper.verifyTextIsNotDisplayed(table, D.agentRandomName_edited)
        return this;
    };


    // this.count_all_agents = function () {
    //     agentsOnList.count().then(function (totalNumber) {
    //         totalNumberOfAgents = totalNumber
    //         agentsOnList.get(totalNumber - 1).getText().then(function (text) {
    //             lastAgentName = text;
    //         })
    //     })
    //     return this;
    // };


};


module.exports = new AgentsPage();
