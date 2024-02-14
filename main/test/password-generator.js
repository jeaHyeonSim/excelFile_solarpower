const crypto = require('crypto');

console.log(hashPassword('1234', String('1234')));

function hashPassword(password, salt) {
    // const salt = crypto.randomBytes(32).toString('hex')
    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
}


