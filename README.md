# idp-profile-ui

Identity management UI for a given IdP that will help users establish good passwords, recovery optins and 2-Step Verification.

# Getting started

Install [Docker](https://docs.docker.com/install), [Docker Compose](https://docs.docker.com/compose/install) and [Make](https://www.gnu.org/software/make)

Project is managed with [Nuxt.js](https://github.com/nuxt/nuxt.js).

## Environment

This app can be run against HTTPS if needed for U2F testing. In order to run in that mode, _traefik_ will need to be configured. Simply `cp development/local.env.dist development/local.env` and populate the traefik-related vars with the appropriate values. See [traefik docs](https://github.com/silinternational/traefik-https-proxy) for more information.

## Run locally

1.  Run `make` from the project root.
1.  The app will be running on the localhost but may require either being referenced by the domain configured for traefik, e.g., [https://profile.gtis.guru](https://profile.gtis.guru), or simply [http://localhost:8000](http://localhost:8000).

### Authentication

1.  If authentication is required, visit [https://profile-api.gtis.guru/auth/login?client_id=abc123](https://profile-api.gtis.guru/auth/login?client_id=abc123)
1.  Username: **a**
1.  Password: **a**
