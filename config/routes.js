const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig')
const { authenticate, newToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

//So it seems like I need extra middleware to generate a token, why the instructions would leave that out but build all of this extra shit is beyond me, but okay there is 20 minutes I'm not getting back.
//Also it's annoying to me
function register(req, res) {
  // implement user registration
  const credentials = req.body;
       const hashnum = bcrypt.hashSync(credentials.password, 14);
       credentials.password = hashnum;

       db("users")
         .insert(credentials)
         .then(users => {
           const id = users[0];
           db('users')
             .where({id})
             .first()
             .then(user => {
               const token = newToken(user);
               res.status(201).json({id: user.id, token});

             })

             .catch(err => res.status(500).send(err));
         });
     }


function login(req, res) {
  // implement user login
  const credentials = req.body;
        db("users")
          .where({
            username: credentials.username
          })
          .first()
          .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
              //pulling username off user into the cookie
              const token = newToken(user)


              res.status(200).json({
                token
              });
              //send dat token back
              //not sure why I can't get
            } else {
              res.status(401).json({
                message: "They wanna see me go AY, all you gotta do is speak on ye!"
              });
            }
          })
          .catch(err => res.status(500).send(err));
      }


function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
