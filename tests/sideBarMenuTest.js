module.exports = {
    'Patient Summary -> Sidebar menu': function (browser) {
        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        patientSummaryPage.waitForElementVisible('@leftBarMenuToggle', browser.globals.wait_milliseconds)
            .click('@leftBarMenuToggle');

        //in react version menu just disappears from dom. in ang version it becomes not visible. life is hard.
        if (browser.globals.version_switch_path === undefined || browser.globals.version_switch_path.indexOf('ang') !== -1) {
            leftBarMenu.waitForElementNotVisible('@patientSummary', browser.globals.wait_milliseconds)
                .assert.hidden('@problems')
                .assert.hidden('@allergies')
                .assert.hidden('@medications')
                .assert.hidden('@contacts')
                .assert.hidden('@personalNotes')
                .assert.hidden('@vaccinations');
        } else {
            leftBarMenu.waitForElementNotPresent('@patientSummary', browser.globals.wait_milliseconds)
                .assert.elementNotPresent('@problems')
                .assert.elementNotPresent('@allergies')
                .assert.elementNotPresent('@medications')
                .assert.elementNotPresent('@contacts')
                .assert.elementNotPresent('@personalNotes')
                .assert.elementNotPresent('@vaccinations');
        }

        browser.end();
    }
};