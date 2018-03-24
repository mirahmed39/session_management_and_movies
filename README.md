# session_management_and_movies
An express.js application that implments middleware functions to perform session management. Second application creates a movie application using non-relational database for data storage.

### This repository contains two applications

+ **Session Management** Application: This application loads with a default background-color the first time and gives user the option
to use a different color. With the help of session management middlware I implemented on this project, the middleware assigns a session id to
the client and passes it back to the server via cookies along with the backgorund-color. Therefore, the page shows the chosen color (not the default) if the client
opens the webpage from another tab.

+ **Movies** Application: An improvement on the movie application I created previously which used in-memory as a storge. This time I am
using MongoDB as the database to keep the application data persistent at all times as opposed to the "in-memory" feature where the data
is wiped when the webpage is closed. Some features client can perform are adding, filtering, deleting movies.
