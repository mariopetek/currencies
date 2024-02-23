# Currencies

Simple web application that helps in conversion between different currencies and provides information about exchange rates for most popular currencies in the world.

Developed as part of Advanced Web Software Development course at Faculty of Electrical Engineering and Computing in Zagreb.

## Tools

Application code is written using [Vue.js](https://vuejs.org/) framework with official [Vue Router](https://router.vuejs.org/) for routing and [Pinia](https://pinia.vuejs.org/) for global store. Created project is using build setup based on [Vite](https://vitejs.dev/) that makes development and deployment easier.

All components are using Options API for JavaScript logic definition. Feching inside components is done using [Axios](https://axios-http.com/docs/intro) library and all the data is gathered from [EchangeRate-API](https://app.exchangerate-api.com/).

Deployment is managed with [Vercel](https://vercel.com/).

## Routes

-   `/` - home page that holds currency converter with live conversion between two selected currencies
-   `/rates` - page that holds exchange rates for all major currencies
-   `/*` - dynamic route that catches everything except two of the above pages and holds custom Not Found page

## Local setup

```sh
git clone https://github.com/mariopetek/currencies.git
cd currencies
npm install
```

### Compile and hot-reload for development

```sh
npm run dev
```

### Compile and minify for production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
