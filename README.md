netlify-copy-env-vars
=====================

Copy env vars from one site to another

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/netlify-copy-env-vars.svg)](https://npmjs.org/package/netlify-copy-env-vars)
[![Downloads/week](https://img.shields.io/npm/dw/netlify-copy-env-vars.svg)](https://npmjs.org/package/netlify-copy-env-vars)
[![License](https://img.shields.io/npm/l/netlify-copy-env-vars.svg)](https://github.com/morrislaptop/netlify-copy-env-vars/blob/master/package.json)

# Usage

    npx netlify-copy-env-vars from-site-domain to-site-domain --token=23453153asdfasfdadcacafrfdafdasffdsa

## About site IDs

Whenever the API requires a :site_id, you can either use the id of a site obtained through the API, or the domain of the site (for example, mysite.netlify.app or www.example.com). These two are interchangeable whenever they're used in API paths.

GET /api/v1/sites/3970e0fe-8564-4903-9a55-c5f8de49fb8b returns the site with a matching id.

GET /api/v1/sites/www.example.com returns the site matching the domain www.example.com.
