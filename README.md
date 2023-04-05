# Rental Reviews Application
[![Client](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml/badge.svg)](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml)
[![Client pipeline](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml/badge.svg)](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml)

<img src="https://user-images.githubusercontent.com/46719079/230217500-b4c36017-a894-442d-bf20-801d0b5d5cc3.png" alt="preview" width="860" height="703">

Available live at [rentalranking.surge.sh](https://rentalranking.surge.sh/)

This repo is hosted on Github and can be found at [github.com/RentalReviews/Rental-App](https://github.com/RentalReviews/Rental-App)

## Running locally 
To run the application locally, please follow the steps below:
- Create a `.env` file in `api` directory and add the following lines (replace the values with your own)
  ```shell
  DATABASE_URL= ...
  JWT_ACCESS_SECRET= ...
  JWT_REFRESH_SECRET= ...
  ```
- Run the following commands in the root directory
  ```shell
  npm run install:client
  npm run install:server
  npm run server
  ```

- Ensure that the server is running at `http://localhost:3000`

- Create a `.env` file in the root directory and add the following line
  ```shell
  VITE_API_URL=http://localhost:3000
  VITE_MAP_API_KEY= ...
  ```

- Run the following commands in the root directory
  ```shell
  npm run client
  ```

- Vite will serve the application at `http://127.0.0.1:5173`
