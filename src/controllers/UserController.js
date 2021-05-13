const userModel = require('../model/UserModel');
const { secret } = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

class userController {
    updateUser(req, res) {
        userModel.update({
            updateData: { name: req.body.name },
            where: [{ email: req.body.email }]
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.affectedRows > 0) {
                    res.json({ error: false });
                } else {
                    res.send({ error: true });
                }
            }
        });
    }

    deleteUser(req, res) {
        userModel.delete(
            [{ email: req.body.email }],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.affectedRows > 0) {
                        res.json({ error: false });
                    } else {
                        res.json({ error: true });
                    }
                }
            }
        );
    }

    login(req, res) {
        if (req.body.email && req.body.password) {
            userModel.select({
                where: [{ email: req.body.email }]
            }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.length > 0) {
                        bcrypt.compare(req.body.password, result[0].password, (error, isMatch) => {
                            if (error) {
                                res.send(error);
                            } else {
                                if (isMatch) {
                                    const payload = { loginDate: Date.now(), id: result[0].id };
                                    const token = jwt.sign(payload, secret, { algorithm: 'HS512' });
                                    res.json({ error: false, token });
                                } else {
                                    res.status(401).json({ message: "The password is incorrect!" });
                                }
                            }
                        });
                    } else {
                        res.status(401).json({ message: "The email is incorrect!" });
                    }
                }
            });
        }
        else {
            res.status(404).json({ error: true, message: "The name and passworld did not complete!" });
        }
    }

    singup(req, res) {
        if (req.body.name && req.body.password && req.body.email) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    userModel.insert({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send({ error: true });
                        } else {
                            if (result.affectedRows > 0) {
                                res.send({ error: false });
                            } else {
                                res.send({ error: true });
                            }
                        }
                    });
                });
            });
        }
        else {
            res.status(404).json({ error: true, message: "The name and passworld did not complete!" });
        }
    }

    test(req, res) {
        userModel.myFunction(`0' ; --`, (result) => {
            res.send(result);
        });
    }
}

module.exports = new userController();