class Login{
    
    // Return objects needed for tests
    get loginUsernameField(){return cy.get('input[id="Username"]')}
    get loginPasswordField(){return cy.get('input[id="Password"]')}
    get loginSubmitBtn(){return cy.get('button[type="submit"]')}
    get loginValidationError(){return cy.get('div[class="text-danger validation-summary-errors"] li')}

}
export default Login