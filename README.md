# Europeanstar

[![Greenkeeper badge](https://badges.greenkeeper.io/adrianblynch/europeanstar.svg)](https://greenkeeper.io/)

A single page app for viewing trains going to Europe.

## Technologies

### Frontend

- _React_ via _Create React App_
- _Jest_ for test...ing
- _Redux_ for state management
- _Redux Thunk_ for handling async actions
- _Styled Components_ because 💅

### Backend

- _Koa_ serves the assets
- Assets are compressed with _GZip_ and _Brotli_ (requires > Node 11.7.0)

### Development

- _GitHub_ hosts the repo
- _CircleCI_ for continuous integration
- _Heroku_ hosts the sites, review, staging and production
- _Rollbar_ tracks browser errors (at least until the demo runs out!)
- Repo notifications are sent to _Slack_
- _Greenkeeper_ checks for package updates
- _Prettier_ keeps the code looking awesome
- _Snyk_ checks for vulnerabilities

### Todo

- Add automated browser tests. Possibly Cypress
- ~~Heroku notification to Slack on Production deployments~~
- Pre-commit hook to run Prettier
- Alternative deployment to AWS S3
- Better styling for tablets and desktop
- Close datepicker on selection
- Extract and centralise class colour styles
- ~~Start using styled-tools~~
- ~~Highlight the chosen fare in class colour~~
- Hide classes until trains are shown
- ~~Stop Redux Logger from outputting in tests~~
- Refactor selectors.getBasket()
- Style and selectively render the basket
