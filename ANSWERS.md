<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions allow the db manager to store user related info on the backend which can keep track of a user's acivity throughout a domain by authenticating with a cookie stored on the client side (passed by the server, during login)
2. What does bcrypt do to help us store passwords in a secure manner.
it hashes the password which encrypts it in the database store meaning if an outside attempts to access the db they won't get access to each user's password immediately
3. What does bcrypt do to slow down attackers?
by forcing the attacker the decrypt the hashed values.
4. What are the three parts of the JSON Web Token?
The header, which contains information regarding the algorithm used to encode the token, the payload which contains the options and information stored in the token and the signature which is the token's secret hashed by particular function in our case HMAC-SHA256 (that way you can't just read off the secret key and pretend to be the user in question)
