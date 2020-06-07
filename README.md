
<h3 align="center">
  PhoneBook
</h3>

* Deployed on Heroku. 
* **Website Link:** https://phone-book980-yv.herokuapp.com/

![PhoneBook](https://yatharth1706.github.io/assets/ContactsPage.png)

<h3 align="center">
  API Methods
</h3>

1. **GET /api/contacts:** : Get all the contacts stored in database

2. **POST /api/contacts:** : Create a new contact in database 

    Required: Json should be sent along with this post request which will contain details of contact 
    
    Example:

```json
  {
    "name" : "yash",
    "dob" : "1/2/1999",
    "phoneNumbers" : ["9283898999"],
    "emails" : ["yash1234@gmail.com"]
   }
```

3. **PATCH /api/contacts/:contactId** : Edit or Update specific contact usign contactId
  
    Required: Json
    
    Example: 

```json
    {
      "name" : "yash",
      "dob" : "1/2/1999",
      "phoneNumbers" : ["9283898999"],
      "emails" : ["yash1234@gmail.com"]
   }
```

4. **DELETE /api/contacts/:contactId** : Delete specific contact using ContactId

5. **GET /api/find/contacts/:contactName** : Find specific contact in database using name of person

6. **GET /api/contacts/:contactId** : Find specific contact using contactId

<h3 align="center">
  Tech Stack
</h3>

#### Backend
* [x] Nodejs
* [x] Express
* [x] MongoDb

#### FrontEnd
* [x] Angular
* [x] Bootstrap
* [x] HTML/SASS
* [x] Typescript
