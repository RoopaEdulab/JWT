const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretkey="secretkey";
//get the sample jsonwebtoken

app.get('/', (req, res) => {
res.json({
     message: 'welcome to the api'
})
})
//Login with the sample jsonwebtoken

app.post('/login', (req, res) => {
       //sample user information
        const user={
          id:1,
          username: "roopa",
          email: "roopa@gmail.com"
        }
         //get the jsonwebtoken
         
         jwt.sign({user},secretkey,{expiresIn:'2*60*60*1000'},(err,token) => {
               res.json({
                token  //pass token
               })
            })
        })
app.post('/profile', verifyToken,(req, res) => {
        // verfiy the authentication data 
        
          jwt.verify(req.token,secretkey,(err,authData) => {
            //    if(authData){
            //     res.send({authData: authData})
            //     }
            //     else{
            //        res.send({message:"helllo"
            //     })
            //     }
                if(err)
                {
                    res.sendStatus(403)
                }
                else
                {
                    res.json({
                    message: 'Post created...',
                    data:authData
                    })}
        })
})
//verify token of the user
  function verifyToken(req,res,next){
        
          const bearerHeader=req.headers['authorization'];
          console.log("beare====>",bearerHeader)
           if(typeof bearerHeader !=='undefined'){
              const bearer = bearerHeader.split(' ');
              //get the token from array
              const Token = bearer[1];
              //req the token 
              req.token = Token;
              next();

             }else{
               res.send({
               result:"Token is not valid"
           })
    }
  }

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
});