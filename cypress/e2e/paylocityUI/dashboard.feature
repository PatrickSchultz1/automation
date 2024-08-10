Feature: Dashboard

    Initial dashboard tests

Background: Setup
    Given I login through the api 
    And I run resource cleanup through the api

#Frontend is displaying the table incorrectly. Last/First names are flipped. POST /employee is submitting the correct payload
Scenario Outline: New employee is displayed on table - '<firstname>','<lastname>',dependents-'<dependents>'
Given I navigate to the dashboard
And I click the add employee button
And I input first name:'<firstname>' last name:'<lastname>' dependents:'<dependents>' into the form
When I select add on the employee form
Then the table displays the new employee - first name:'<firstname>' last name:'<lastname>' dependents:'<dependents>'

Examples:
| firstname | lastname | dependents |
| Patrick   | Schultz  | 2          |
| John      | Doe      | 25         |

#I love this - "errorMessage": "The field Dependants must be between 0 and 32." If 32 is accepted, why not 50? Who decided this ha?
#Frontend still has the same issue as above with this test
Scenario: Employee details are updated on the table
Given I add an employee using the API - 'Patrick' 'Schultz' - dependents: '2'
And I navigate to the dashboard 
And I click the edit employee icon
And I input first name:'John' last name:'Doe' dependents:'20' into the form
And I select update on the employee form
Then the table displays the new employee - first name:'John' last name:'Doe' dependents:'20'

Scenario Outline: Error thrown when submitting invalid details:'<firstname>','<lastname>',dependents-'<dependents>'
Given I navigate to the dashboard
And I click the add employee button
And I input first name:'<firstname>' last name:'<lastname>' dependents:'<dependents>' into the form
When I select add on the employee form
#This is currently verifying a 400 is thrown, but realistically, a toast notification or something should display
Then the modal throws error for invalid details

Examples:
| firstname | lastname | dependents | 
| 123       | Schultz  | 2          | 
| Patrick   | 123      | 2          |
| Patrick   | Schultz  | 40         |
|           | Schultz  | 2          |
| Patrick   |          | 2          |
| Patrick   | Schultz  |            |
| ?         | Schultz  | 2          |
| Patrick   | !!!!!!!  | 2          |
| Patrick   | Schultz  | -2         |
| Patrick   | Schultz  | .5         |


Scenario Outline: Employee benefits cost is calculated correctly - dependents-'<dependents>'
Given I add an employee using the API - '<firstname>' '<lastname>' - dependents: '<dependents>'
When I navigate to the dashboard 
Then the employee benefits costs are calculated correctly - dependents: '<dependents>'


Examples:
| firstname | lastname | dependents |
| Patrick   | Schultz  | 0          |
| Patrick   | Schultz  | 5          |
| Patrick   | Schultz  | 10         |

Scenario Outline: Employee Net Pay is calculated correctly - dependents-'<dependents>'
Given I add an employee using the API - '<firstname>' '<lastname>' - dependents: '<dependents>'
When I navigate to the dashboard 
Then the employee Net Pay is calculated correctly - dependents: '<dependents>'


Examples:
| firstname | lastname | dependents |
| Patrick   | Schultz  | 0          |
| Patrick   | Schultz  | 5          |
| Patrick   | Schultz  | 10         |



