import express from 'express';
import mysql from 'mysql';
import { setup } from './setup';
import * as utils from './databaseUtils';
import passport from 'passport';
import { passportConfig } from './passport';

const router = express.Router();

const connection = mysql.createConnection({ // Connect to database
    host     : 'localhost',
    user     : 'root',
    password : 'root1234',
    database : 'KM2 Project'
  })

setup(connection); // initialise database
passportConfig(passport, connection); // initialise passport (for authentication)

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/Questionnaire', failureRedirect: '/login'
}));

router.get('/verify', function(req, res) { // checks if your logged in
  if (req.isAuthenticated()) return res.status(200).send({ user: req.user, loggedIn: true });
  return res.status(200).send({ user: null, loggedIn: false });
});

router.post('/user/test', ensureAuthenticated, function(req, res) {
    // TODO: add timestamp
    const { ID } = req.user;
    const { results } = req.body;

    const sumWeights = results.reduce((acc, cur) => acc + cur);
    if (sumWeights !== 70) return res.status(412).send('Weights must sum to 70'); // Check again

    connection.query(utils.insertTests(ID, results),
        function (err, results) {
            if (err) res.status(500).send(err)
            const testId = results.insertId; // the key of this test
            res.status(200).send({testId : testId});
        });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
    res.status(401).send('Unauthorized');
};

export default router;