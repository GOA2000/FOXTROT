// An example configuration file.
//exports.baseUrl = 'localhost_nekiPort'
exports.config = {


    // Capabilities to be passed to the webdriver instance.
    /*  capabilities: {
     'browserName': 'chrome',
     "runtimeArgs": [
     "--disable-session-crashed-bubble",
     "--disable-infobars"
     ],
     'chromeOptions': {
     'args': ['no-sandbox']
     }
     },*/


    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',


    onPrepare: function () {
        browser.ignoreSynchronization = true;
        var D = require('./data-provider/conf-data.js');

    },


    //  browser.driver.manage().window().setSize(1700, 750);

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: [
       //'./tests/agents-test.js'
        // './tests/login-test.js'
        // './tests/agents-crud-test.js'
        //'./tests/customers-crud-test.js'
        // './tests/customers-test.js'
        // './tests/categories-crud-test.js'
        // './tests/shippers-crud-test.js'
        // './tests/suppliers-crud-test.js'
        //'./tests/sorting-test.js'
        //'./tests/database-test.js'
        // './tests/filter-test.js'
        // './tests/salesByCustomer-test.js'
        // './tests/agentByRegion-test.js'
       //  './tests/customersByCategories-test.js'
      //  './tests/products-crud-test.js'
      './tests/*'

    ],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },

    'prefs': {
        'credentials_enable_service': false
    },

    plugins: [{
        package: 'protractor-screenshoter-plugin',
        screenshotPath: './report-with-screenshots',
        screenshotOnExpect: 'failure+success',
        screenshotOnSpec: 'none',
        withLogs: 'true',
        writeReportFreq: 'asap',
        imageToAscii: 'none',
        clearFoldersBeforeTest: true
    }]



    /* multiCapabilities: [
     {
     browserName: 'chrome',
     chromeOptions: {mobileEmulation: {deviceName: 'Google Nexus 5'}},
     specs: ['./tests/agents-crud-test.js'],
     params: 'mobile version'
     },
     {
     browserName: 'chrome',
     specs: ['./tests/agents-crud-test.js'],
     params: 'Desktop'
     },
     {
     browserName: 'chrome',
     specs: ['./tests/agents-crud-test.js'],
     params: 'Tablet'
     }
     ]*/
};