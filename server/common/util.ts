import * as _ from 'lodash';
import * as crypto from 'crypto';


export function getEncAse192(str, secret = 'lqbw') {
  const cipher = crypto.createCipher('aes192', secret);
  let enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

export function getDecAse192(str, secret = 'lqbw') {
  const decipher = crypto.createDecipher('aes192', secret);
  let dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

