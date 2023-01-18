## JSONWEBTOKEN

  JSON Web Tokens are most commonly used to identify an authenticated user. They are issued by an authentication server and are consumed by the client-server (to secure its APIs). 
  
## Install
    
    $ npm install express
    $ npm install jsonwebtoken
    
### Importing express and jsonwebtoken

```sh
   const express = require('express');
   const jwt = require('jsonwebtoken');
   
### Calls the express function   

```sh
const app = express();
```

### Created Simple api to check the routing is working properly.
```sh
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});
app.listen(5000, () => console.log('Server started on port 5000'));
```
### Created  a post method API For Login With Mock User Data
```sh
app.post('/api/login', (req, res) => {
    const user = {
    id: 1, 
    username: 'francis',
    email: 'francis@edulab.in',
    role:'admin'
    }
```
 ###   Signing a token with 3 minute of expiration
```sh
jwt.sign({user}, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
    console.log("login token => ",token);
    res.json({
      token
    });
 });
});
```

### verify the Token 
```sh
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
  console.log("bearerHeader =>",bearerHeader);
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    console.log("bearer====> ",bearer);
    const bearerToken = bearer[1];
    console.log("bearerToken ==>",bearerToken);
    req.token = bearerToken;
    next();
    } else
    {
    res.sendStatus(403);
    }
 }
```

###  Getting User Data Using Login Token
```sh
app.post('/api/createPosts', verifyToken, (req, res) => {  
    console.log("token => ",req.token);
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    console.log("err ",err)
    console.log("authdata ",authData);
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});
```
    
