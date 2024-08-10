import EmployeesAPI from "../../Main/employeesAPI"
import Helpers from "../../Main/helpers"

const helpers = new Helpers()
const employees = new EmployeesAPI()

Given('I send a GET request to /employees - token: {string}',  (tokenType) =>{{
    employees.getEmployees(tokenType)
}})

Given('I submit POST request /employees - token: {string} employee details: {string}:{string}',  (tokenType, key, value) =>{
    employees.postEmployees(tokenType, key, value)
})

When('I submit PUT request /employees - token: {string} employee details: {string}:{string}',  (tokenType, key, value) =>{
    employees.putEmployees(tokenType, key, value)
})

Then('I expect the status code to be {string} on {string}', (statusCode, endpoint) => {
    cy.window().then((win) => {
    const status = win.localStorage.getItem(endpoint);
    expect(status).to.eq(statusCode)
    })
})

Then('the GET request returns new employee details from {string}', (employeeDetails) => {

    //Get employees returns a list and the first item should match the created employee
    var getDetails = JSON.parse(localStorage.getItem('getEmployeesResponse'))
    var postDetails = JSON.parse(localStorage.getItem(employeeDetails))
    delete getDetails[0].expiration

    expect(JSON.stringify(getDetails[0])).to.eq(JSON.stringify(postDetails))
})
