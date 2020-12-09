[![Crowdin](https://d322cqt584bo4o.cloudfront.net/idp-profile-ui/localized.svg)](https://crowdin.com/project/idp-profile-ui)

# idp-profile-ui

Identity management UI for a given IdP that will help users establish good passwords, recovery optins and 2-Step Verification.

# Getting started

Install [Docker](https://docs.docker.com/install), [Docker Compose](https://docs.docker.com/compose/install) and [Make](https://www.gnu.org/software/make)

Project is managed with [vue-cli](https://github.com/vuejs/vue-cli).

## Environment

This app is setup to run against HTTPS for U2F testing. In order to facilitate this _traefik_ must be configured. Some values are located in the `.env.local` and some are located in the `docker-compose.yml` under the `proxy` service. See [traefik docs](https://github.com/silinternational/traefik-https-proxy) for more information.

1.  `cp .env.dist .env.local` and populate with appropriate values.
1.  `cp app-id.dist.json public/app-id.json` and ensure the UI's name will work for your U2F configuration.

## i18n

i18n support is built-in however the translation files must be generated and dropped into the `src/locales` folder with the appropriate name, e.g., `en.json`, `fr.json`, `ko.json` before the app is built.

## Run the full app locally

1.  Run `make` from the project root.
1.  The app will be running on the domain configured for traefik, e.g., [https://profile.gtis.guru](https://profile.gtis.guru).

### Authentication

An IdP infrastructure will be running locally and is required for authentication into the app's protected pages.

#### Existing user
1.  Username: **a**
1.  Password: **a**

#### New user (has no password yet)
1. Enter app with a special "invitation" link, e.g., [https://profile.gtis.guru/#/profile/intro?invite=2b2d424e-8cb0-49c7-8c0b-7f6603INVITE](https://profile.gtis.guru/#/profile/intro?invite=2b2d424e-8cb0-49c7-8c0b-7f6603INVITE)
1. if needed, this user's username is **b**

## Run the UI as a Docker container

See notes in Environment section regarding HTTPS and _traefik_ configuration.  

1.  Image (`silintl/idp-profile-ui`) is located on [Docker Hub](https://hub.docker.com/r/silintl/idp-profile-ui)
1.  `VUE_APP_API_BASE_URL` must be populated as an environment variable so the UI knows how to communicate to the API.

## Local development

1.  When the `make` is run, the project will be in development mode and any updates made to the code will automatically be reloaded.

### Running production version of the app locally

1. Within `docker-compose.yml` change the `ui:` container's `command: npm run serve` to `command: npm run serve:prod`
1. Run `make dist`
1. Run `make`

# Build for deployment

## Step 1 – Environment variables

Copy `.env.dist` to `env.local` and update the relevant values, e.g., a UI deployment would only require the UI-related variables be present and populated.

## Step 2 – Customizations

The following files can/should be replaced before running the build.

* `cp app-id.dist.json public/app-id.json` and update the ids appropriately for U2F usage
* `public/favicon.ico`
* `src/assets/logo.png`

## Step 3 – Build for deployment

`make dist` can be used in a docker environment, otherwise the following steps can be used in a node environment:

1. `npm install` will install dependencies
1. `npm run build` will produce the production-ready app in the project root's `dist` folder.
1. The contents of `dist` can then be deployed.
