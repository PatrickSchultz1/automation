Feature: Login

    Initial Login tests

Scenario: accepts valid credentials 
Given I fill out the login form with 'valid' credentials
When I click the login submit button
Then I'm redirected to the dashboard

Scenario Outline: returns '<response>' error
Given I fill out the login form with '<typeOfCreds>' credentials
When I click the login submit button
Then the login returns error - '<response>'

Examples:
| typeOfCreds	   | response            | 
| invalid password | invalid credentials |
| empty username   | username required   |
| empty password   | password required   |