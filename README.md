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

i18n support is built-in however the translation files must be generated and dropped into the `src/locales` folder with the appropriate name, e.g., `en.json`, `fr.json`, `ko.json` before the app is built. (TODO: automate this via crowdin api's)

## Run locally

1.  Run `make` from the project root.
1.  The app will be running on the domain configured for traefik, e.g., [https://profile.gtis.guru](https://profile.gtis.guru).

### Authentication

1.  An IdP infrastructure will be running locally and is required for authentication into the app. If needed, it can be accessed at the traefik-configured domain, e.g., [https://profile-api.gtis.guru/auth/login?client_id=abc123](https://profile-api.gtis.guru/auth/login?client_id=abc123).
1.  Username: **a**
1.  Password: **a**

## Local development

1.  When the `make` is run, the project will be in development mode and any updates made othe code will automatically be reloaded.

# Build for deployment

1.  `make dist` will produce the production-ready app in the project root's `dist` folder.
