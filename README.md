# idp-profile-ui

Identity management UI for a given IdP that will help users establish good passwords, recovery optins and 2-Step Verification.

# Getting started

Install [Docker](https://docs.docker.com/install), [Docker Compose](https://docs.docker.com/compose/install) and [Make](https://www.gnu.org/software/make)

Project is managed with [Nuxt.js](https://github.com/nuxt/nuxt.js).

## Environment

This app can be run against HTTPS if needed for U2F testing. In order to run in that mode, _traefik_ will need to be configured. Simply `cp local.env.dist local.env` and populate the traefik-related vars with the appropriate values. See [traefik docs](https://github.com/silinternational/traefik-https-proxy) for more information.

## Run locally

1.  `make`
2.  The app will be running on the localhost but may require either being referenced by the domain configured for traefik, e.g., [https://profile.gtis.guru](https://profile.gtis.guru), or simply [http://localhost:3000](http://localhost:3000).
