describe("Date picker Test by weguide",()=> {
    const startDate = Cypress.dayjs().format('MM/DD/YYYY');
    const endDate = Cypress.dayjs().add(5, 'days').format('MM/DD/YYYY');
    const dateIncluded = Cypress.dayjs().add(2, 'days').format('DD');
    const dateNotIncluded = Cypress.dayjs().add(6, 'days').format('DD');
    const todaysDay = Cypress.dayjs().format('D');
    const previousDay = Cypress.dayjs().add(-2, 'days').format('D');
    const previousDate = Cypress.dayjs().add(-2, 'days').format('MM/DD/YYYY');
    const outsideRangeClass = 'MuiDateRangePickerDay-dayOutsideRangeInterval'
    const insideRangeClass = 'MuiDateRangePickerDay-dayInsideRangeInterval'

    beforeEach(() => {
        cy.visit("/");
    });
    it("As a user, I should be able to see the date picker after clicking on start date", ()=>{
        
        cy.get('#mui-4').click()
        cy.get('.MuiPaper-elevation').should('be.visible')
    })

    it("As a user, I should be able to see the date picker after clicking on end date", ()=>{
        cy.get('#mui-5').click()
        cy.get('.MuiPaper-elevation').should('be.visible')
    })

    it("no date should be selected as we visit the page", ()=>{
        cy.get('#mui-5').should('have.value', '')
    })

    it("As a user, I should be able to see the entered date in the field", ()=>{
        cy.get('#mui-4').clear().type(startDate)
        cy.get('#mui-4').should('have.value', startDate)
    })

    it('As a user, I can type date into start date and end date fields', ()=>{
        cy.visit("/");
        cy.get('#mui-4').clear().type(startDate).tab().type(endDate)
        cy.get('.css-1tape97').first().within(()=> {
            cy.get('button').contains(dateNotIncluded).should('have.class', outsideRangeClass).and('not.have.class', insideRangeClass )
            cy.get('button').contains(dateIncluded).should('have.class', insideRangeClass)
        })
    })

    it('As a user, I cannot select end date that is before the start date', () => {
        cy.visit("/");
        cy.get('#mui-4').click()
        cy.get('.css-1tape97').first().within(()=> {
            cy.get('button').contains(todaysDay).click()
            cy.get('button').contains(previousDay).click()
        })
        cy.get('#mui-5').should('not.have.value', previousDate)
        cy.get('#mui-4').should('have.value', previousDate)
    });
})