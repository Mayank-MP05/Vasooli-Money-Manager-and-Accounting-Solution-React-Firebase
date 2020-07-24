# Vasooli the Smart Money Manager and Accounting App

App is LIVE at `https://vasoolimoney.web.app/`

If you want to check cross functionality you can use test user

```
Email : testuser@email.com
Password : testpass
```

Reason behind this awkward hindi name is the character in the Hindi Film franchise "Golmaal", anyways this app has core features includes :

- Keeping Track of your Incomes
- Keeping track of all expenses
- Ask Money to Friends
- Categorising the Expenses and Income
- Visualize the Data
- Categorical and Time wise classifications
- Can Update User Details except Email

## Technology Stack :

```
1. App is using `React` at its Core Framework
2. Styling : `Bootstrap` is used
3. Icons : `Font Awesome Free Tier`
4. Chart Plotting : `Rechart - Charts for ReactJS`
5. Database : `Firebase Firestore`
6. Backend : `Node Express and FB functions`
```

## Structure Explaination :

I Tried to keep the App Structure very simple and scalable as at first I wanted to build the same backend with mongo Structure is very modular

There are 7 main pages
And have related sub-component as per need for that pages

1. Dashboard - Display Chart on basis of User spending by using `Recharts` I used simple charts like BarChart and Double Ring Pie Chart

2. Transactions - This pages renders the transaction based on the filter passed passed by default it renders all the transactions, Ideally It is used to sort by passing `Income /Expense` filter.

3. Vasooli : this is the core Idea Behind building this whole system. Vasooli basically means you ask your money which is borrowed by others In this page you can ask any user for the money and specify the reason for that money

4. Notifications : This page fetches all the notification realted to the User and General notification. This notifications usually involves new user joining notifications as well as payment approvals declined or paid status

5. Profile : On this page you can update your profile picture name and address I know this is out of scope of this project but I didn't removed it completely as its slighly relevent too

6. Login : Login in the User and forward to Dashboard

7. Signup : Create New User and Log that user into the system

## Backend of the Project Link :

```
https://github.com/Mayank-MP05/Vasooli-Express-Firebase-functions
```

## Screenshots:

Dashboard Page

Transaction Page

Vasooli Page

Notifications
