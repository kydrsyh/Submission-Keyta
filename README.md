## Test-Keyta

This repo is for technical assessment from keyta.id

## Please read! [For Developer]

Please read this readme file first before you start coding.

## This starter project

This starter project already contains some basic library like:

- Express
- Nodemon
- Axios
- Dotenv

## How to run the project

You need to install required dependencies (libraries) by typing in the terminal, i am not include node_modules folder so you need to install it first before start using it. Go to the file directory then do the instruction below.

```bash
npm install
```

Then you can run this project by:

Using nodemon

```bash
npm test
```

## Endpoints on this API

This API is running on localhost, you can change the port on .env file

# You can test the API using POSTMAN or any other API tester or just using browser.

This Endpoint will get the shipping rate data from keyta/api and sort it by the rule given.

```bash
GET - http://localhost:3003/shipping
```

This Endpoint will add a markup to the total price from http://localhost:3003/shipping API.

```bash
GET - http://localhost:3003/shipping/markup
```

This Endpoint will get the shiping rate data base on rule given (GrabExpress, SiCepat, & Paxel) from http://localhost:3003/shipping/markup API.

```bash
- GET - http://localhost:3003/shipping/markup/selection
```

## How to read this code

I divided the code based on

- Controller
- Routes
- Server/ index.js

If you want to read this code start with

- index.js
- Routes
- Controllers

In this API i am not making any validation input, so i don't need middleware fucntion.
