/// <reference types="cypress" />
/// <reference types="../../cypress/support" />
import {v4 as uuidv4} from 'uuid';

context('Accept offer', () => {
    it('should show error message when lender does not have enough funds', () => {
        const testData = getTestData();

        cy.registerUser(testData.username1, testData.password1);
        cy.login(testData.username1, testData.password1);
        cy.createNewAuction(testData.description, testData.endDate, testData.loanAmount, testData.numberOfInstallments);

        cy.registerUser(testData.username2, testData.password2);
        cy.login(testData.username2, testData.password2);
        cy.submitOffer(testData.proposedAnnualPercentageRate);
        cy.login(testData.username1, testData.password1);

        cy.visit('/my-auctions').then(() => {
            cy.contains('See details')
                .click()
                .then(() => {
                    cy.wait(3000).then(() => {
                        cy.contains('Accept')
                            .click()
                            .then(() => {
                                cy.contains('Offer not accepted.');
                                cy.contains('Seems like lender does not have enough money');
                            });
                    });
                });
        });
    });
    it('should see accepted offer', () => {
        const testData = getTestData();

        cy.registerUser(testData.username1, testData.password1);
        cy.login(testData.username1, testData.password1);
        cy.createNewAuction(testData.description, testData.endDate, testData.loanAmount, testData.numberOfInstallments);

        cy.registerUser(testData.username2, testData.password2);
        cy.login(testData.username2, testData.password2);
        cy.deposit(testData.loanAmount);
        cy.submitOffer(testData.proposedAnnualPercentageRate);
        cy.login(testData.username1, testData.password1);
        cy.visit('/my-auctions').then(() => {
            cy.contains('See details')
                .click()
                .then(() => {
                    cy.wait(3000).then(() => {
                        cy.contains('Accept')
                            .click()
                            .then(() => {
                                cy.contains('Loan No.');
                                cy.contains(testData.proposedAnnualPercentageRate * 100);
                                cy.contains(testData.loanAmount);
                            });
                    });
                });
        });
    });
});

const getTestData = () => ({
    username1: uuidv4(),
    password1: uuidv4(),
    username2: uuidv4(),
    password2: uuidv4(),
    endDate: '12/12/9999 12:12',
    loanAmount: 10000,
    numberOfInstallments: 12,
    description: 'description',
    proposedAnnualPercentageRate: 10,
});
