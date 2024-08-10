class Helpers{
    
    //Helper function for login so the automation can bypass using the login form 

    loginAPI(username, password){
        cy.request('/Prod/Account/LogIn').its('body').then((body) => {
            const token = Cypress.$(body).find("input[name='__RequestVerificationToken']").val();
            cy.request({
                    method: 'POST',
                    url: '/Prod/Account/LogIn',
                    form: true,
                    body: {
                        'username': username,
                        'password': password,
                        '__RequestVerificationToken': token
                    }
                })
            })
        }

    createEmployeeAPI(firstname, lastname, dependents){
        cy.request({
                method: 'POST',
                url: '/Prod/api/employees',
                body: {
                    'firstName': firstname,
                    'lastname': lastname,
                    'dependants': dependents
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                })
        }

    preTestCleanup(){
        
        var authKey = Cypress.env('paylocity_api_key')
        cy.request({
                method: 'GET',
                url: '/Prod/api/employees',
                headers: {
                    Authorization:`Basic ${authKey}`  
                }
                }).then((response) => {
                    const ids = response.body.map(item => item.id);
                    ids.forEach(id => {
                        cy.request({
                            method: 'DELETE',
                            url: `/Prod/api/employees/${id}`,
                            headers: {
                                Authorization:`Basic ${authKey}`  
                            }
                        }).then((response) => {
                            expect(response.status).to.eq(200)
                        })
                    })
                })
                //removing any resources create by previous tests in local storage
                cy.clearLocalStorage()
            }
}


export default Helpers