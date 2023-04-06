# Rental Reviews Application
[![Client](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml/badge.svg)](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml)
[![Client pipeline](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml/badge.svg)](https://github.com/RentalReviews/Rental-App/actions/workflows/client.yml)

<img src="https://user-images.githubusercontent.com/46719079/230218492-8a4ee36f-f9f3-4ace-a601-25f1329974b1.png" alt="preview" height="550">

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
