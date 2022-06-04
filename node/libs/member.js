const member = {};

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Message = require(`libs/message`);
const config = require(`config`);
const cipher = require(`libs/cipher`);

const dao_member = require(`dao/member/member`);

const salt = config.member.salt;

const jwt_secret = config.member.jwt_secret;
const expire_time = 60*60*24*30;

let login_check = async (req, res) => {
    let check;
    const token = req.headers['x-token'];

    if(token === undefined || token === null || token === 'undefined' || token === 'null'){
        throw Message.UNAUTHORIZED
    }

    check = await member.decode_token(token);

    if(check == null){
        throw Message.UNAUTHORIZED;
    }

    req.member = await dao_member.select_member(check.idx);

    if(check.keep_check === true){
        const now = Date.now()/1000;
        const time = check.time/1000;

        req.member.keep_check = true;

        if(now - time > (60*60*24)) {
            const new_token = await member.token(req.member);
            res.header('x-new-token', new_token);
        }
    }
};

member.encrypt = async (password) => {
    return crypto.createHash(config.member.hash_algorithm).update(password+salt).digest('hex');
};

member.token = async (member) => {
    const { idx, id, nickname, created_at } = member;
    const time = Date.now();

    const token = jwt.sign({ id, idx, nickname, created_at, time }, jwt_secret, { expiresIn : expire_time });

    return await cipher.encrypt(token);
};

member.decode_token = async (token) => new Promise(async (resolve) => {
    try {
        token = await cipher.decrypt(token);
    }catch (e) {
        resolve(null);
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if(err){
            resolve(null);
        }
        resolve(decoded);
    });
});

member.login_check = () => async(req, res, next) => {
    await login_check(req, res);

    if(next) next();
};


member.login_checker = async(req, res) => {
    await login_check(req, res);
};




module.exports = member;
