class Dashboard{
    
    
    get dashboardAddEmployeeBtn(){return cy.get('button').contains('Add Employee')};
    get addEmployeeUserNameField(){return cy.get('input[id="firstName"]')};
    get addEmployeeLastNameField(){return cy.get('input[id="lastName"]')};
    get addEmployeeDependentsField(){return cy.get('input[id="dependants"]')};
    get addEmployeeModalAddBtn(){return cy.get('button[id="addEmployee"]')}
    get employeeTableRows(){return cy.get('table[id="employeesTable"] tbody tr')}
    get editEmployeeIcon(){return cy.get('i[class="fas fa-edit"]')}
    get updateEmployeeModalBtn(){return cy.get('button[id="updateEmployee"]')}
    
    //Removing resources created by previous tests
    
    calculateCost(dependents){
        const baseCost = 1000;
        const dependentCost = 500;
        const totalCost = baseCost + (dependents * dependentCost);
        return totalCost/26;
    }
}

export default Dashboard