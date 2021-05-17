# Nodejs, express, mysql, api starter
<br>

# sql querys

Extend your Model with `DefaultMySQLModel` to get acces select, insert, update, delete method.

```JavaScript
class userModel extends defaultMySQLModel {
    ...
}
```
### SELECT

Give you all propery from the row(s).

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.select({
                where: [{ email: 'example@example.com' }]
            }, (err, result) => {
            ...
        });
        ...
    }
}
```

Give you selected propery from the row(s).

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.select({
                columNames: ['id', 'name'],
                where: [{ email: 'example@example.com' }, { name: 'Bob' }]
            }, (err, result) => {
            ...
        });
        ...
    }
}
```

### INSERT

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.insert({
            name: 'example',
            email: 'example@example.com',
            password: 'password'
        }, (err, result) => {
            ...
        });
        ...
    }
}
```

### UPDATE

Update one row in database.

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.update({
            updateData: { name: 'Joe' },
            where: [{ email: 'example@example.com' }]
        }, (err, result) => {
            ...
        });
        ...
    }
}
```

Update multiple row in database. This time all row will updated same property. (Joe)

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.update({
            updateData: { name: 'Joe' },
            where: [{ email: 'example@example.com', }, { email: 'example2@example.com' }, { name: 'Bob', age: 35 }]
        }, (err, result) => {
            ...
        });
        ...
    }
}
```

### Delete

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.delete(
            [{ email: 'example@example.com' }],
            (err, result) => {
            ...
        });
        ...
    }
}
```

Multiple condition.

```JavaScript
class userModel extends defaultMySQLModel {
    myFunction(...) {
        ...
        userModel.delete(
            [{ email: 'example@example.com', name: 'Joe' }, { email: 'example2@example.com' }, { name: 'Bob' }],
            (err, result) => {
            ...
        });
        ...
    }
}
```

# Requirements

- [Node.js](https://nodejs.org/) v14
- Mysql database or Mariadb database. Use [XAMPP](https://www.apachefriends.org/index.html)
- [Postman](https://www.postman.com/pricing/)
- [VS Code](https://code.visualstudio.com/) editor

# Getting Started

Run sql [script](create.sql) on your database.

```SQL
CREATE DATABASE test
CHARACTER SET latin1
COLLATE utf8_general_ci;

USE test;

CREATE TABLE test.user (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  email varchar(50) UNIQUE,
  password varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;
``` 

Install Requirements above. Then clone the repo and run `npm i`:

```bash
$ git clone --origin=seed --branch=main --single-branch \
    https://github.com/LaposaDaniel/Nodejs-express-api-starter-mysql.git example
$ cd ./example                     # Change current directory to the newly created one
$ npm i                            # Install project dependencies
```

Set in [config.json](config.json) your security key, token expiration date and your database conection.

```json
{
    "secret": "YourSecretKey",
    "timeGate": {
        "day": 1,
        "hour": 0,
        "minute": 0,
        "seconds": 0
    },
    "createConnection": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "test"
    }
}
```

Then start api with this command.

```bash
$ npm run start                    # Launch GraphQL API and web application
```

The API server must be available at [http://localhost:3000](http://localhost:3000).

# Routes

Use `Postman` to testing your api. If you use `Postman` first time check the link below.<br>
[Sending your first request](https://learning.postman.com/docs/getting-started/sending-the-first-request/)

**http://localhost:3000/registration**<br>
- name: example <br>
- email: example@example.com <br>
- password: secret

 **http://localhost:3000/login**<br>
 - email: example@example.com <br>
 - password: secret
 - Give you the Authorization token

 **http://localhost:3000/users/updateUser**<br>
 - set Authorization Bearer token after you login<br>
 - name: example <br>
 - email: example@example.com

 **http://localhost:3000/users/updateUser**<br>
 - set Authorization Bearer token after you login<br>
 - name: example <br>
 - email: example@example.com

# License

The MIT License (MIT)