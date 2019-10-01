import config from '../config/environment';
import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

export const encrypt = (text) => {
    const cipher = crypto.createCipher(algorithm, config.secrets["refreshToken"]);
    let crypted = cipher.update(text, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

export const decrypt = (text) => {
    const decipher = crypto.createDecipher(algorithm, "config.secrets.refTokenKey");
    let dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};