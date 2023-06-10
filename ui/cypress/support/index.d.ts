// /cypress/support/index.d.ts
/// <reference  types="cypress" />

type Method = "POST" | "GET" | "DELETE";

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
      interceptRequest(method: Method): Chainable<null>;
    }
  }
}
