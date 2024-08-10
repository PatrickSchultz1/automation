import Dashboard from "../../Main/dashboard"
import Helpers from "../../Main/helpers"

const dashboard = new Dashboard()
const helpers = new Helpers()

Given('I login through the api', () => {
    helpers.loginAPI(Cypress.env('paylocity_user'), Cypress.env('paylocity_pass'))
})

Given('I run resource cleanup through the api', () => {
    helpers.preTestCleanup()
})

Given('I add an employee using the API - {string} {string} - dependents: {string}',  (firstname, lastname, dependents) => {
    helpers.createEmployeeAPI(firstname, lastname, dependents)
})

Given('I navigate to the dashboard', () =>  {
    cy.visit('/Prod/Benefits')
    cy.intercept("GET", "/Prod/api/employees").as('employeeList');
    cy.wait('@employeeList')
})

Given('I click the add employee button', () => {
    dashboard.dashboardAddEmployeeBtn.click()
})

Given('I click the edit employee icon', () => {
    dashboard.editEmployeeIcon.click()
})

When('I navigate to the dashboard', () =>  {
    cy.visit('/Prod/Benefits')
    cy.intercept("GET", "/Prod/api/employees").as('employeeList');
    cy.wait('@employeeList')
})

When('I input first name:{string} last name:{string} dependents:{string} into the form', (firstname, lastname, dependents) => {
    
    //given there are tests that require passing in null value, I decided to add the if statements to verify. Without them, the .type fails
    if(firstname){
        dashboard.addEmployeeUserNameField.click().clear().type(firstname);
    }
    if(lastname){
        dashboard.addEmployeeLastNameField.click().clear().type(lastname);
    }
    if(dependents){
        dashboard.addEmployeeDependentsField.click().clear().type(dependents);
    }
})

When('I select add on the employee form',  () => {

    //Waiting for the Post to parse id from response. 
    //GET call was causing timing issues so I added an alais and wait
    cy.intercept("POST", "/Prod/api/employees").as('employeeDetails');
    cy.intercept("GET", "/Prod/api/employees").as('employeeList');
    dashboard.addEmployeeModalAddBtn.click() 
    cy.wait('@employeeDetails').then((interception) => {
        //Since id is required for future assertion, I'm putting it in local storage
        localStorage.setItem('employeeId', interception.response.body.id)
        localStorage.setItem('statusCode', interception.response.statusCode)

        //Some test require a 400 returns from the intercept, so I can't have this wait hang those tests. 
        if(interception.response.statusCode == 200){
            cy.wait('@employeeList')
        }        
    })
})

When('I select update on the employee form',  () => {

    //Waiting for the Post to parse id from response. 
    //GET call was causing timing issues so I added an alais and wait
    cy.intercept("PUT", "/Prod/api/employees").as('employeeDetails');
    cy.intercept("GET", "/Prod/api/employees").as('employeeList');
    dashboard.updateEmployeeModalBtn.click() 
    cy.wait('@employeeDetails').then((interception) => {
        //Since id is required for future assertion, I'm putting it in local storage
        localStorage.setItem('employeeId', interception.response.body.id)
    })
    cy.wait('@employeeList')
})

Then('the table displays the new employee - first name:{string} last name:{string} dependents:{string}', (firstname, lastname, dependents) => {

    //Pulling local storage from pervious step for assertion
    var employeeId = localStorage.getItem('employeeId')

    //This is ugly for now, ultimately this needs to be iterated over and support verifying multiple rows at a time. 
    //I also hate these objects don't have specific CSS data-test tags for test automation. I'm relying instead on their positioning within the tr which isn't ideal
    dashboard.employeeTableRows.each(($row) => {
        cy.wrap($row).find('td').eq(0).invoke('text').then(text => {
            expect(text).to.eq(employeeId)
        });
        cy.wrap($row).find('td').eq(1).invoke('text').then(text => {
            expect(text).to.eq(lastname)
        });
        cy.wrap($row).find('td').eq(2).invoke('text').then(text => {
            expect(text).to.eq(firstname)
        });
        cy.wrap($row).find('td').eq(3).invoke('text').then(text => {
            expect(text).to.eq(dependents)
        });
    })
})

Then('the modal throws error for invalid details', () => {
    var statusCode = localStorage.getItem('statusCode')
    expect(statusCode).to.eq('400')
})

Then('the employee benefits costs are calculated correctly - dependents: {string}', (dependents) => {
    var benefitsCost = dashboard.calculateCost(dependents)
    var roundedCost = Number(benefitsCost.toFixed(2))

    dashboard.employeeTableRows.each(($row) => {
        cy.wrap($row).find('td').eq(6).invoke('text').then(text => {
            expect(text).to.eq(roundedCost.toString())
        });
    })    
})

Then('the employee Net Pay is calculated correctly - dependents: {string}', (dependents) => {
    var benefitsCost = dashboard.calculateCost(dependents)
    var roundedNetPay = 2000 - Number(benefitsCost.toFixed(2))

    dashboard.employeeTableRows.each(($row) => {
        cy.wrap($row).find('td').eq(7).invoke('text').then(text => {
            expect(text).to.eq(roundedNetPay.toString())
        });
    })    
})
