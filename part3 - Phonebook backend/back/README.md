## phonebook-(front+back)

****

### Mongooseless version:

Deployed at: https://hscback.herokuapp.com.  
Web page or http requests (examples in `http_reqs.http`) can be used to modify the content.  
Content will be reset upon dyno restart.

### Version with Mongoose:

Not deployed.
Usage:
 - Create .env-file in root dir
 - Write contents of .env like so:
```
DB_ADDR="<your database address here>"
USER_ID="<your user ID here>"
USER_KEY="<your password here>"
```
 - Run with `npm start` or `npm watch` if you want to use nodemon

A check for an already existing person is present in the front-end only. This can of course be bypassed using the CLI, or making an http request.

### phonebook-cli

Usage:
 - `node mongo.js` (without arguments) to display a list of all persons in phonebook
 - `node mongo.js "<1st name> <last name>" <number>` to add a new person in phonebook

## Links to other repositories

Front-end source: https://gitlab.utu.fi/jnkyto/dtek2040_part3_front (internal)