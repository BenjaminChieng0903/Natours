# Natours

## Table of Contents

- [Intro](#Intro)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
  
## Intro
Natours is a tourism website that introduces exciting tours in America to customers. It consists of many trending packages from the NPM library and advanced web features such as payment APIs, email functionality, file upload, and maps among others. Additionally, the website includes authorization and authentication that meet industry criteria for security purposes.
Regarding web styling design, the website incorporates numerous dynamic effects and follows current trends in web design. Usability test has been conducted for each functionality, ensuring both effectiveness and efficiency.

## Project Structure
```
project-root/
│
├── client/
│   ├── public/
│   │    └── img/
│   │    │    ├── tours/
│   │    │    ├── users/
│   │    │
│   │    ├── index.html
│   │  
│   ├── src/
│   │   └── components/
│   │   │   └── account/
│   │   │   │      ├── accountDetails.jsx
│   │   │   │      ├── accountDetails.css
│   │   │   │
│   │   │   ├── customerReview/
│   │   │   │      ├── customerReivew.css
│   │   │   │      ├── customerReview.jsx
│   │   │   │
│   │   │   ├── errorPage/
│   │   │   │      ├── errorPage.css
│   │   │   │      ├── errorPage.jsx
│   │   │   │
│   │   │   ├── footer/
│   │   │   │      ├── footer.jsx
│   │   │   │      ├── footer.css
│   │   │   │
│   │   │   ├── mapBox/
│   │   │   │      ├── mapBox.css
│   │   │   │      ├── mapBox.jsx
│   │   │   │
│   │   │   ├── routes/
│   │   │   │      └── Card/
│   │   │   │      │      ├── card.css
│   │   │   │      │      ├── card.jsx
│   │   │   │      │
│   │   │   │      ├── authentication/
│   │   │   │      │      ├── login.css
│   │   │   │      │      ├── login.jsx
│   │   │   │      │      ├── signin.css
│   │   │   │      │      ├── signin.jsx
│   │   │   │      │
│   │   │   │      ├── home/
│   │   │   │      │      ├── home.jsx
│   │   │   │      │      ├── home.css
│   │   │   │      │
│   │   │   │      ├── navigation/
│   │   │   │             ├── navigationBar.css
│   │   │   │             ├── navigationBar.jsx
│   │   │   │
│   │   │   ├── store/
│   │   │   │      └── booking/
│   │   │   │      ├── reviews/
│   │   │   │      ├── tours/
│   │   │   │      ├── user/
│   │   │   │
│   │   │   ├── tourDetails
│   │   │          ├── tourDetails.jsx   
│   │   │  
│   │   └── assets/
│   │   │     └── style.css
│   │   │ 
│   │   ├── AxiosAPI/
│   │   ├── utils/
│   │
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── server/
│   │   └── controllers/
│   │   │        ├── ToursController.js
│   │   │        ├── UsersController.js
│   │   │        ├── authController.js
│   │   │        ├── bookingController.js
│   │   │        ├── errorController.js
│   │   │        ├── reviewsController.js
│   │   │
│   │   ├── models/
│   │   │        ├── bookingModel.js
│   │   │        ├── reviewsModel.js
│   │   │        ├── tourModel.js
│   │   │        ├── userModel.js
│   │   │
│   │   ├── routes/
│   │   │        ├── BookingRoutes.js
│   │   │        ├── ReviewsRoutes.js
│   │   │        ├── ToursRoutes.js
│   │   │        ├── UsersRoutes.js
│   │   │
│   │   ├── utils/
│   │            ├── appError.js
│   │            ├── catchAsync.js
│   │            ├── sendEmail.js
│   │            
│   └── README.md
│   ├── app.js
│   └── .gitignore
│   └── package-lock.json
│   └── config.env
│   └── server.js
│   └── test.js
│
│
└── README.md
```
## Installation

## Usage

