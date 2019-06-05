# Europeanstar

[![Greenkeeper badge](https://badges.greenkeeper.io/adrianblynch/europeanstar.svg)](https://greenkeeper.io/)

A single page app for viewing trains going to Europe.

An app to play with various libs, modules and technologies.

Limitations:

- Return journeys only
- Four possible routes
- Lightweight error handling

## Technologies

### Frontend

- _React_ via _Create React App_
- _Jest_ for test...ing
- _Redux_ for state management
- _Redux Thunk_ for handling async actions
- _Styled Components_ because 💅
- _Styled Tools_ to simplify using _Styled Components_

### Backend

- _Koa_ serves the assets (at least on Heroku)
- Assets are compressed with _GZip_ and _Brotli_ (requires > Node 11.7.0)

### Development

- _GitHub_ hosts the repo
- _CircleCI_ for continuous integration
- _Heroku_ hosts the sites, review, [staging](https://europeanstar-stg.herokuapp.com/) and [production](https://europeanstar-prod.herokuapp.com/)
- _Rollbar_ tracks browser errors (at least until the demo runs out!)
- Repo notifications are sent to _Slack_
- _Greenkeeper_ checks for package updates
- _Prettier_ keeps the code looking awesome
- _Snyk_ checks for vulnerabilities
- _AWS S3_ as an alternative host ([Production only](http://europeanstar.s3-website.eu-west-2.amazonaws.com/))

### Todo

- Use hooks for search form
- Update title on search
- Don't upload compressed files to S3
- ~~Output file size from _scripts/compress.js_~~
- Implement caching in CircleCI
- Deploy to Netlify
- ~~Add automated browser tests. Possibly Cypress~~
- Better styling between mobile, tablet and desktop
- Close datepicker on selection
- Extract and centralise class colour styles
- Use custom domain
- Put behind a CDN
- Customise compression to ignore files under a certain size
- Set up an SSL cert for S3 deployment
- Add routing for next sub-app
- Deploy to EC2
- Internationalise
- Translate
- Merge `lint-staged`, `yarn format` and VS Code's config for Prettier into one of the [available config files](https://prettier.io/docs/en/configuration.html)
- ~~Hide Basket until relevant~~
- ~~Refactor display logic into selectors~~
- ~~Only show the selected trains~~
- ~~Force HTTPS~~
- ~~Heroku notification to Slack on Production deployments~~
- ~~Pre-commit hook to run Prettier~~
- ~~Start using styled-tools~~
- ~~Highlight the chosen fare in class colour~~
- ~~Hide classes until trains are shown~~
- ~~Stop Redux Logger from outputting in tests~~
- ~~Refactor selectors.getBasket()~~
- ~~Style and selectively render the basket~~
- ~~Alternative deployment to AWS S3~~
