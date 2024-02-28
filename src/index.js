import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-svg.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-design-system.scss?v1.0.0";

import Index from "views/Index.js";
import Sections from "views/Sections.js";
import Presentation from "views/Presentation.js";
import AboutUs from "views/examples/AboutUs.js";
import AccountSettings from "views/examples/AccountSettings.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ChatPage from "views/examples/ChatPage.js";
import CheckoutPage from "views/examples/CheckoutPage.js";
import ContactUs from "views/examples/ContactUs.js";
import Ecommerce from "views/examples/Ecommerce.js";
import Error from "views/examples/Error.js";
import Error500 from "views/examples/Error500.js";
import InvoicePage from "views/examples/InvoicePage.js";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage.js";
import PricingPage from "views/examples/PricingPage.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ResetPage from "views/examples/ResetPage.js";
import EmailConfirmation from "views/confirmation/EmailConfirmation";
import ResetPasswordSections from "views/ResetPassword/ResetPasswordSections";
import PricingPage2 from "views/examples/PricingPage2";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-_si85FraDQRPBjBk4KiuwEeuIS3zLz0",
  authDomain: "vortex-7d9bc.firebaseapp.com",
  projectId: "vortex-7d9bc",
  storageBucket: "vortex-7d9bc.appspot.com",
  messagingSenderId: "57704857709",
  appId: "1:57704857709:web:6e75ebbe5c1edd97bb3f64",
  measurementId: "G-FMQP92WF1X"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" exact render={(props) => <Index {...props} />} />
      <Route
        path="/sections"
        exact
        render={(props) => <Sections {...props} />}
      />
      <Route
        path="/presentation"
        exact
        render={(props) => <Presentation {...props} />}
      />
      <Route
        path="/about-us"
        exact
        render={(props) => <AboutUs {...props} />}
      />
      <Route
        path="/account-settings"
        exact
        render={(props) => <AccountSettings {...props} />}
      />
      <Route
        path="/blog-post"
        exact
        render={(props) => <BlogPost {...props} />}
      />
      <Route
        path="/blog-posts"
        exact
        render={(props) => <BlogPosts {...props} />}
      />
      <Route
        path="/chat-page"
        exact
        render={(props) => <ChatPage {...props} />}
      />
      <Route
        path="/checkout-page"
        exact
        render={(props) => <CheckoutPage {...props} />}
      />
      <Route
        path="/contact-us"
        exact
        render={(props) => <ContactUs {...props} />}
      />
      <Route
        path="/ecommerce"
        exact
        render={(props) => <Ecommerce {...props} />}
      />
      <Route path="/error" exact render={(props) => <Error {...props} />} />
      <Route
        path="/error-500"
        exact
        render={(props) => <Error500 {...props} />}
      />
      <Route
        path="/invoice-page"
        exact
        render={(props) => <InvoicePage {...props} />}
      />
      <Route
        path="/landing-page"
        exact
        render={(props) => <LandingPage {...props} />}
      />
      

      {/* --------------------------------------------------------------------------- */}

      {/* login and registration screen */}
      <Route
        path="/login"
        exact
        render={(props) => <LoginPage {...props} />}
      />

      {/* confirm assistance screen */}
      <Route
        path="/confirm" //http://teamgroundapp.com:3030/confirm?{matchId}
        exact
        component={PricingPage}
      />

      {/* confirm training */}
      <Route
        path="/confirm-training" //http://teamgroundapp.com:3030/confirm?{trainingId}
        exact
        component={PricingPage2}
      />
      {/* field information page */}
      <Route
        path="/field" // http://teamgroundapp.com:3030/field?{fieldId}
        exact
        component={ProductPage}
      />

      {/* confirm email screen */}
      <Route
        path="/confirm-email" //http://teamgroundapp.com:3030/confirm-email?{userId}
        exact
        component={EmailConfirmation}
      />

      {/* reset password screen */}
      <Route
        path="/reset-password" // http://teamgroundapp.com:3030/reset-password?{userId}
        exact
        component={ResetPasswordSections}
      />

      {/* --------------------------------------------------------------------------- */}
      <Route
        path="/product-page"
        exact
        render={(props) => <ProductPage {...props} />}
      />
      <Route
        path="/profile-page"
        exact
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/reset-page"
        exact
        render={(props) => <ResetPage {...props} />}
      />
      <Redirect to="/confirm" />
    </Switch>
  </BrowserRouter>
);
