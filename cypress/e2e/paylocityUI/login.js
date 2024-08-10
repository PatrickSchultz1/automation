import Login from "../../Main/login.js";

const login = new Login();

Given("I fill out the login form with {string} credentials", (typeOfCreds) =>{
    cy.visit('/Prod/Account/Login')
    switch (typeOfCreds) {
        case 'valid':
            var username = Cypress.env('paylocity_user')
            var password = Cypress.env('paylocity_pass')
            break;
        case 'invalid password':
            var username = Cypress.env('paylocity_user')
            var password = 'invalidpassword'
            break;
        case 'empty password':
            var username = Cypress.env('paylocity_user')
            var password = ""
            break;
        case 'empty username':
            var username = ""
            var password = Cypress.env('paylocity_pass')
            break;
    }
    
    //.type doesn't handle empty stings, therefore, if the var doesn't exist it isn't used
    if(username){
        login.loginUsernameField.click().type(username);
    }
    if(password){
        login.loginPasswordField.click().type(password);
    }
})

When("I click the login submit button", () =>{
    login.loginSubmitBtn.click()
})

Then("the login returns error - {string}", (error) =>{
    switch(error){
        case 'invalid credentials':
            login.loginValidationError.should('have.text', 'The specified username or password is incorrect.')
            break;
        case 'username required':
            login.loginValidationError.should('have.text', 'The Username field is required.')
            break;
        case 'password required':
            login.loginValidationError.should('have.text', 'The Password field is required.')
            break;
    }
})

Then("I'm redirected to the dashboard", () =>{
    cy.url().should('include', '/Prod/Benefits')
})
