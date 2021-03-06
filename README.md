# Errands-BE

Portfolio Piece and Usable App for Dale and Friends

## BACKEND~REST API with CYPRESS IO TESTING

### Routes/API/Endpoints

BASEURL: https://dale-errands-2.herokuapp.com/

BASE ROUTE: BASEURL/api/welcome

| USER-ROUTES     | REQUEST TYPES | ENDPOINTS |
| --------------- | ------------- | --------- |
| Register A User | POST          | /register |
| Login A User    | POST          | /login    |

BASE ROUTE: BASEURL/api/users

| USER-ROUTES         | REQUEST TYPES | ENDPOINTS                |
| ------------------- | ------------- | ------------------------ |
| Get Admins          | GET           | /admin                   |
| Get Users           | GET           | /user                    |
| Get All Users Tasks | GET           | /user/:consumer_id/tasks |
| Make a Task         | POST          | /user/:consumer_id/task  |
| Get User By Id      | GET           | /user/:user_id           |
| Delete User         | DELETE        | /delete/:user_id         |

BASE ROUTE: BASEURL/api/tasks

| USER-ROUTES    | REQUEST TYPES | ENDPOINTS     |
| -------------- | ------------- | ------------- |
| Get Task by ID | GET           | task/:task_id |
| Update Task    | PUT           | task/:task_id |
| Delete Task    | DELETE        | task/:task_id |

### Schemas

userObject = {
username: "User 1",
password: "user password",
role: "admin"
}

role choice = "admin" or "consumer"

taskObject = {
title: "Errand Example",
description: "Any Notes",
completeBy: "07-13-2021"
}
