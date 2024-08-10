Feature: Employees endpoint 

    Initial endpoint tests

Background: Setup
    Given I run resource cleanup through the api

Scenario Outline:GET /employee retrieves new employee details
Given I submit POST request /employees - token: 'valid' employee details: 'default':'default'
And I send a GET request to /employees - token: 'valid'
Then the GET request returns new employee details from 'postEmployeesResponse'


Scenario Outline: Verify GET /employees status code - '<status>'
Given I send a GET request to /employees - token: '<tokenType>'
Then I expect the status code to be '<status>' on '<endpoint>'

Examples:
| tokenType | status | endpoint           |
| valid     | 200    | getEmployeesStatus |
| invalid   | 401    | getEmployeesStatus | 

Scenario Outline:POST /employees status: '<status>' employee details: '<key>'='<value>'
Given I submit POST request /employees - token: '<tokenType>' employee details: '<key>':'<value>'
Then I expect the status code to be '<status>' on '<endpoint>'

#There are tons of validation tests you could add here, but I'll move on to the PUT call
Examples:
| tokenType | status | endpoint            | key        | value       |
| valid     | 200    | postEmployeesStatus | default    | default     |      
| valid     | 200    | postEmployeesStatus | dependants | 5           |     
| valid     | 400    | postEmployeesStatus | dependants | 33          |
| valid     | 400    | postEmployeesStatus | dependants | -1          |
| valid     | 400    | postEmployeesStatus | dependants | .5          |
| valid     | 400    | postEmployeesStatus | firstname  |             |
| valid     | 400    | postEmployeesStatus | lastname   |             |
| valid     | 400    | postEmployeesStatus | lastname   | ??          |
| valid     | 400    | postEmployeesStatus | firstname  | ??          |
| invalid   | 401    | postEmployeesStatus | default    | default     |

Scenario Outline:PUT /employee status: '<status>' employee details: '<updatekey>'='<updatevalue>'
Given I submit POST request /employees - token: 'valid' employee details: 'default':'default'
When I submit PUT request /employees - token: '<tokenType>' employee details: '<updatekey>':'<updatevalue>'
Then I expect the status code to be '<status>' on '<endpoint>'

Examples:
| tokenType | status | endpoint           | updatekey  | updatevalue | 
| valid     | 200    | putEmployeesStatus | firstname  | ValidTest   |   
| valid     | 200    | putEmployeesStatus | lastname   | ValidTest   |  
| valid     | 200    | putEmployeesStatus | dependants | 5           |  
| valid     | 400    | putEmployeesStatus | salary     | 130000      |
| valid     | 400    | putEmployeesStatus | dependants | 33          | 
| valid     | 400    | putEmployeesStatus | firstname  |             | 
| valid     | 400    | putEmployeesStatus | lastname   |             | 
| invalid   | 401    | putEmployeesStatus | Default    | Default     | 

