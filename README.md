# Confident Drivers Trainig

## Table of Contents

- [Features](#features)
- [File Structures](#file-structure)
- [Usage](#usage)

## Features

### User Features

- Creating User Profile.
- Email Notification on success.
- Submitting Appointment Request through home page.
- Making Payments for appointments.
- Managing appointments through profile.
- Purchaing courses through profile.

### Admin Features

- Verifying User Profile.
- Email Notification once the user has been confirmed.
- Verifying Appointments.
- Verifying Payments.
- Suggesting Courses to purchase to user.
- Assessing Users while providing lesson.
- Creating Admin Profile.
- Managing User.
- Managing Courses.
- Managing Payments.

### System Features

- Dynamic Appointment time and date verification.
- Dynamic Paywall for dues after lesson.
- Dynamic Appointment status update.
- Dynamic notification life cycle for each appointment.

## File Structure

### Landing Components

- The landing page and realted components are located under `src` folder in `frontend` folder within `home` folder.

### Admin Components

- The admin page and related components are located under `src` folder in `frontend` folder within `admin` folder.

### Dashboard Components

- The admin page and related components are located under `src` folder in `frontend` folder within `dashboard` folder.

### Shared Components

- The admin page and related components are located under `src` folder in `frontend` folder within `shared` folder.
- The `context` folder under the shared folder contains all of the contexts that are shared amongst multiple views, like `Selector` context.
- The `elements` folder under the shared folder contains all of the contexts that are shared amongst multiple views, like `ErrorModal` component.
- The `hooks` folder under the shared folder contains all of the contexts that are shared amongst multiple views.
- This folder contains `date-hook`, which converts time strings like `12:30 PM` to `12.5` and returns `1:30 PM` from integers `13.5`.
- This folder contains `form-hook`, which provides two functionalities one to set initial value of the forms which contain these values. Secondly, it takes in the values from form inputs and sets the validity of that individual component and overall form.
- This folder contains `http-hook`, which sends the fetch requests to the provided url in the format provided, along with a abort controller that aborts if another request comes in before the first one executes.

## Usage

### Step 1

- Clone Repository to local machine.

### Step 2

- Run `npm install`

### Step 3

#### Set Up environement variables.

- `VITE_STRIPE_PUBLIC_KEY` . This is the public key from your stripe account. This can be seen under the dashboard section. Type `String`.

- `VITE_SERVER_NAME` . This holds the backend server addrsess. Type `String`. Format `http://localhost:5000/`.

### Step 4

- Run `npm run dev` to run development server.
- Run `npm run build` to get the production build.
