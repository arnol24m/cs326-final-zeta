To set up our project and build it:
1. Clone the repo - this link is generated by going to the github repo, getting the link and running git clone [repolink]

2. Verify that node is installed and that you have the required dependencies.

3. Take out the commenting out of the following in app.js which is in the folder “server”:
    - “const dbconnection…” (around line 9)
    - “const username…” (around line 10)
    - “const password…” (around line 11)
    - “|| postgres....” (around line 24)
    - “|| dbconnection.secret…” (around line 56)

4. Make sure that in const dbconnection you have “const dbconnection = require(‘./secrets.json’);

5. The “secrets.json” file is set as a template currently with the following format:
    - “{username: “username”, password: “password”, secret: “secret”}”

6. Replace the values with your local values for connecting to the database.

7. Our server side code is set up to initialize the db tables if need be if they are not created depending on how you are running locally.

8. After setting up app.js, run the command “NODE_TLS_REJECT_UNAUTHORIZED='0' node server/app.js” to bring up the server locally.

