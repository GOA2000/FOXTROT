'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var datePickerStart = element(by.model('requestData.startDate'));
var datePickerEnd = element(by.model('requestData.endDate'));
var showAgentsByRegionButton = $('[ng-click="getAgentsByRegions()"]');
var table = $('#datatable');
var tableHeader = element(by.tagName('thead'));
var tableRows = element.all(by.repeater('item in agentByRegionData.agents'));
var chart = $('#salesChart');
var agents = $$('[ng-click="showAgent(item)"]');

var agentByRegionPage = function () {

    this.select_start_date = function (startDate) {
        helper.waitAndEnterValue(datePickerStart, startDate);
        return this;
    };

    this.select_end_date = function (endDate) {
        helper.waitAndEnterValue(datePickerEnd, endDate);
        return this;
    };

    this.click_SHOW_AGENTS_BY_REGION_button = function () {
        helper.waitAndClick(showAgentsByRegionButton);
        return this;
    };

    this.scroll_to_chart = function () {
        helper.scrollTo(chart);
        return this;
    };

    this.select_agent_on_list = function (agentNumber) {
        helper.waitAndClick(agents.get(agentNumber));
        return this;
    };

};

module.exports = new agentByRegionPage();
