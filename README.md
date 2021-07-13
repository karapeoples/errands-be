# errands-be

Portfolio Piece and Usable App for Dale and Friends

BE
BASEURL: 'localhost'

BASE ROUTE: BASEURL/api/welcome

| USER-ROUTES     | REQUEST TYPES | ENDPOINTS |
| --------------- | ------------- | --------- |
| Register A User | POST          | /register |
| Login A User    | POST          | /login    |

BASE ROUTE: BASEURL/api/users

| USER-ROUTES    | REQUEST TYPES | ENDPOINTS        |
| -------------- | ------------- | ---------------- |
| Get Admins     | GET           | /admin           |
| Get Users      | GET           | /user            |
| Get User By Id | GET           | /user/:user_id   |
| Delete User    | DELETE        | /delete/:user_id |

-
