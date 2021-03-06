# KM2
A program to help you find your preferred role in a team, created for my apprenticeship.
The program is based of a questionnaire from Stellar Leadership (http://stellarleadership.com/).

NOTE the Program isn't complete, but is in a usable state, although it does require running the mySQL database locally.

## Scripts
### Start
Start both the client and the server with 'npm start'. 'npm run client' and 'npm run server' start the server and client separately if needed.
Note: 'npm run dev' won't work.
### Test
Test both the client and the server with 'npm test'. 'npm run client:test' and 'npm run server:test' test the server and client separately if needed.

## Client
Created with the help of create-react-app. Note that after logging in you need to select the Questionnaire again, as there is a async check happening and you can't access the Questionaire unless your logged in.

## Server
A node based back-end with the following routes (to be updated with as per API documentation periodically):
- [POST] /user/test: Saves users latest test scores
- [POST] /login: Enables users to login using passport.js
- [GET] /verify: Lets you know if the user is currently logged in and if so, who they are

## Database
A mySQL database with the following tables and data:
- Users
    - ID: TinyInt, Primary Key (auto increment)
    - Role: VarChar(10), NOT NULL
    - Username: VarChar(255), Not Null
    - Password: VarChar(255), Not Null
    - Name: : VarChar(255)
    - Organisation: VarChar(255)

- Tests
    - ID: TinyInt, Primary Key (auto increment)
    - UserID: Foreign Key (Users)
    - IM: TinyInt(100), Unsigned, Not Null
    - CO: TinyInt(100), Unsigned, Not Null
    - SH: TinyInt(100), Unsigned, Not Null
    - PL: TinyInt(100), Unsigned, Not Null
    - RI: TinyInt(100), Unsigned, Not Null
    - ME: TinyInt(100), Unsigned, Not Null
    - TW: TinyInt(100), Unsigned, Not Null
    - CF: TinyInt(100), Unsigned, Not Null

## Documentation
- API: https://docs.google.com/document/d/1IqqEjRRCGs8qVa1y7qefd4sCgad9CNUGnzrefcDDGEw/edit?usp=sharing
- Database format: https://docs.google.com/spreadsheets/d/1aBtMbIPRwCg3xG-e69a2eqrTV2UqRQk_hm_EdV5_t3I/edit?usp=sharing
- PDF of original questionnaire: http://careerweb.leeds.ac.uk/download/downloads/id/250/team_roles or https://drive.google.com/file/d/1JSlL1EQfzibYRz-jOjEnSQrnTOKXXazE/view?usp=sharing
