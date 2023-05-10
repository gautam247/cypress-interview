describe("Date picker Test by weguide",()=> {
    const startDate = Cypress.dayjs().format('MM/DD/YYYY');
    const endDate = Cypress.dayjs().add(5, 'days').format('MM/DD/YYYY');
    const dateIncluded = Cypress.dayjs().add(2, 'days').format('DD');
    const dateNotIncluded = Cypress.dayjs().add(6, 'days').format('DD');
    const outsideRangeClass = 'MuiDateRangePickerDay-dayOutsideRangeInterval'
    const insideRangeClass = 'MuiDateRangePickerDay-dayInsideRangeInterval'

    it("As a user, I should be able to see the date picker after clicking on start date", ()=>{
        cy.visit("/");
        cy.get('#mui-4').click()
        cy.get('.MuiPaper-elevation').should('be.visible')
    })

    it("As a user, I should be able to see the date picker after clicking on end date", ()=>{
        cy.visit("/");
        cy.get('#mui-5').click()
        cy.get('.MuiPaper-elevation').should('be.visible')
    })

    it("As a user, I should be able to see the date picker after clicking on end date", ()=>{
        cy.visit("/");
        cy.get('#mui-5').should('have.value', '')
    })

    it("As a user, I should be able to select the start and end date", ()=>{
        cy.visit("/");
        cy.get('#mui-4').clear().type(startDate)
        cy.get('#mui-4').should('have.value', '05/10/2023')
    })

    it('As a user, I can type date into start date and end date fields', ()=>{
        cy.visit("/");
        cy.get('#mui-4').clear().type(startDate).tab().type(endDate)
        cy.get('.css-1tape97').first().within(()=> {
            cy.get('button').contains(dateNotIncluded).should('have.class', outsideRangeClass).and('not.have.class', insideRangeClass )
            cy.get('button').contains(dateIncluded).should('have.class', insideRangeClass)
        })
    })
})