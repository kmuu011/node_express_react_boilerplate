const cipher = {};
const config = require(`config`);

const crypto = require('crypto');

// 반드시 32글자 해야함
const cipher_key = config.cipher.key;

cipher.encrypt = async (text) => {
    let cipher_iv = crypto.randomBytes(16);
    let enc = crypto.createCipheriv(config.cipher.two_way_algorithm, Buffer.from(cipher_key), cipher_iv);
    let encrypted = enc.update(text);

    encrypted = Buffer.concat([encrypted, enc.final()]);

    return cipher_iv.toString('hex') + ':' + encrypted.toString('hex');
};

cipher.decrypt = async (text) => {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(config.cipher.two_way_algorithm, Buffer.from(cipher_key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};


module.exports = cipher;
