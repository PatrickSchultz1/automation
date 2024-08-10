class EmployeesAPI{

    getEmployees(tokenType){
        switch(tokenType){
            case 'valid':
                var authKey = Cypress.env('paylocity_api_key')
                break
            case 'invalid':
                var authKey = 'test'
                break
        }
        cy.request({
                method: 'GET',
                url: 'Prod/api/employees',
                headers: {
                    Authorization:`Basic ${authKey}`  
                },
                //Need to verify statuscodes outside of 200, so this test needs to continue when response is 401/400/403/500
                failOnStatusCode: false
            }).then((response) => {
                localStorage.setItem('getEmployeesStatus', response.status)
                localStorage.setItem('getEmployeesResponse', JSON.stringify(response.body))
            })
        }

    postEmployees(tokenType, payloadKey, payloadValue){
        switch(tokenType){
            case 'valid':
                var authKey = Cypress.env('paylocity_api_key')
                break
            case 'invalid':
                var authKey = 'test'
                break
        }
        cy.fixture('postEmployee.json').then((payload) => {
            
            //Some test cases don't require changes to the default payload
            if(payloadKey != 'default'){
                payload[payloadKey] = payloadValue
            }
            cy.request({
                method: 'POST',
                url: 'Prod/api/employees',
                body: payload,
                headers: {
                    Authorization:`Basic ${authKey}`  
                },
                //Need to verify statuscodes outside of 200, so this test needs to continue when response is 401/400/403/500
                failOnStatusCode: false
            }).then((response) => {
                localStorage.setItem('postEmployeesStatus', response.status)
                localStorage.setItem('postEmployeesResponse', JSON.stringify(response.body))
                localStorage.setItem('postEmployeesId', response.body.id)
            })
        })
    }

    putEmployees(tokenType, payloadKey, payloadValue){
        switch(tokenType){
            case 'valid':
                var authKey = Cypress.env('paylocity_api_key')
                break
            case 'invalid':
                var authKey = 'test'
                break
        }
        cy.fixture('putEmployee.json').then((payload) => {
            
            //Some test cases don't require changes to the default payload
            cy.window().then((win) => {
                const employeesId = win.localStorage.getItem('postEmployeesId');
                payload['id'] = employeesId
                payload[payloadKey] = payloadValue
            })
            cy.request({
                method: 'PUT',
                url: 'Prod/api/employees',
                body: payload,
                headers: {
                    Authorization:`Basic ${authKey}`  
                },
                //Need to verify statuscodes outside of 200, so this test needs to continue when response is 401/400/403/500
                failOnStatusCode: false
            }).then((response) => {
                localStorage.setItem('putEmployeesStatus', response.status)
                localStorage.setItem('putEmployeesResponse', JSON.stringify(response.body))
                localStorage.setItem('putEmployeesId', response.status.id)
            })
        })
    }
}
export default EmployeesAPI