# Rental Reviews Application
[![Client](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml/badge.svg)](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml)
[![Client pipeline](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml/badge.svg)](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml)

This repo is hosted on Github and ca
n be found at [github.com/RentalReviews/Rental-App](https://github.com/RentalReviews/Rental-App)

## Running locally 
To run the client side locally
```shell
npm run install:client
npm run client
```
Vite will serve the client app at port `5173`

To run the server side locally
```shell
cd api
echo PORT=4466 > .env
cd .. 
npm run install:server
npm run server
```
Nodemon will serve the server at port `4466`
