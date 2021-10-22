# SysCPE front-end

## Project setup
To install the front-end project, make this the active directory then run  
```bash
npm install
```

## Configure user authentication
The app is using Auth0 to handle user authencation. You need to have a *.env* 
file in **frontend project root** with the following variables:

```dosini
REACT_APP_AUTH0_DOMAIN=<domain from Auth0 project>
REACT_APP_AUTH0_CLIENT_ID=<clientID from Auth0 project>
```

## Testing
To run unit tests, make this the active directory then run  
```bash
npm run test
```
