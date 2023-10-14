# Countries App

Fun app for the geography lovers!

This is a final project for a React Advanced course at Business College Helsinki. The main purpose was to practice the usage of React Redux, React Redux toolkit and Firebase authentication :)

This app displays all countries and territories from the [REST Countries API](https://restcountries.com/), which can be filtered and sorted. The app uses Firestore Authentication to let users register, log in and log out.

Users can favourite countries, and see them separately on a favourites page. The favourites are saved to Firestore Database along with the basic user data.

## Live page

[markusvjh.github.io/countries-app](https://markusvjh.github.io/countries-app)

If you don't want to make a new account, you can log in as 'demo@demo.com' with the password 'password'.

## Local machine setup

If you want to set up the project on your local machine instead, you need to:

- clone the repository

- create a .env file in the root of the project with the necessary api keys for google api, openweather and firebase (.env.example)

- run npm install
- run npm start

## Technologies used

- HTML
- JS
- CSS
- Bootstrap
- React
- React Router Dom
- React Redux and React Redux Toolkit
- Firebase authentication
- Firestore Databse

## Acknowledgement

Initial idea and guidance [@martin-holland](https://github.com/martin-holland)

Countries API [REST Countries](https://restcountries.com/)

[Google maps API](https://developers.google.com/maps/documentation/embed/get-started) for country maps

[Unsplash.com](https://unsplash.com/) for cool images for countries

[OpenWeather API](https://openweathermap.org/api) for weather data for capital cities

Background image by Clker-Free-Vector-Images at [ Pixabay](https://pixabay.com/vectors/globe-earth-continents-planet-296471/)
