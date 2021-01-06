# Users-Library-API-JWT-encryption-
An API for adding users, querying data, and CRUD operations.

1. Embed a document in MongoDB
2. Set a JSON Web Token (x-auth-token)
3. Protect some of the routes
4. Authorize some with middleware
5. Set response headers
6. Error handling.

This API includes multiple options for querying, many schemas, and an efficient page structure for workflow.

bcrypt
  .hash(password, saltRounds)//two arguments: your password and the saltRounds. A promise.
  .then(hashedPassword=>{
    console.log("hash", hashedPassword);
    return hashedPassword //returns the password
  })
  .then(hash=>{
    return bcrypt.compare(password,hash)//boolean
  })
  .then(res=>{
    console.log("match",res)
  })
