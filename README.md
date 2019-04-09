# Europeanstar

[![Greenkeeper badge](https://badges.greenkeeper.io/adrianblynch/europeanstar.svg)](https://greenkeeper.io/)

A single page app for viewing trains going to Europe.

## Technologies

### Frontend
- *React* via *Create React App*
- *Jest* for test...ing
- *Redux* for state management
- *Redux Thunk* for handling async actions
- *Styled Components* because 💅

### Backend
- *Koa* serves the assets
- Assets are compressed with *GZip* and *Brotli* (requires > Node 11.7.0)

### Development
- *GitHub* hosts the repo
- *CircleCI* for continuous integration 
- *Heroku* hosts the sites, review, staging and production
- *Rollbar* tracks browser errors (at least until the demo runs out!)
- Repo notifications are sent to *Slack*
- *Greenkeeper* checks for package updates
- *Prettier* keeps the code looking awesome
- *Snyk* checks for vulnerabilities

### Todo
- Add automated browser tests. Possibly Cypress
- Pre-commit hook to run Prettier
- Alternative deployment to AWS S3
- Better styling for tablets and desktop
- Close datepicker on selection
- Extract and centralise class colour styles
