# E2E and API tests at public transparency reports of Labor Court of 13th Region

![CI](https://github.com/benjaminpinto/transparency/actions/workflows/main.yml/badge.svg)

This project uses the brand new Cypress 10 to automatize API and E2E tests upon public transparency reports published by the Labor Court of 13th Region. All reports are publicly available on its [transparency page](https://www.trt13.jus.br/contaspublicasng/#/dashboard).

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I've used versions `v16.15.0` and `8.5.5` of Node.js and npm, respectively. I recommend you to use the same or later versions.

## Installation

After clone the project, run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

Run `npm test` (or `npm t` for the short version) to run the test in headless mode.

Or, run `npm run cy:open` to open Cypress in interactive mode.

## About the tests

The purpose of this project is to be an use case of how we can perform E2E and API tests upon a real application using Cypress.

### Finally, just some tips to understand the code

- Due to make tests independent and fast, all API calls are being mocked using fixture files.
- Spec files, now called cy files, are in the [`e2e folder`](cypress/e2e/).
- Custom commands are defined at [`api_commands`](cypress/support/api_commands.js) and [`gui_commands`](cypress/support/gui_commands.js), booth at [`support`](cypress/support/) folder.

---

This project was created by [Benjamin Pinto](https://www.linkedin.com/in/benjamin-pinto/).
