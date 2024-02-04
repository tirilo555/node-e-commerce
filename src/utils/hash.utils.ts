import crypto from 'crypto';
import bcrypt from 'bcrypt';

const SALTROUNDS = 5;

export default class HashUtil {
  public static async makeHash(password: string, algorithm: 'bcrypt' | 'sha256'): Promise<string> {
    let hash: string;
    if (algorithm === 'bcrypt') {
      hash = await bcrypt.hash(password, SALTROUNDS);
    } else {
      hash = crypto.createHash(algorithm).update(password).digest('hex');
    }
    return hash;
  }

  public static async compareHash(input: string, hash: string, algorithm: 'bcrypt' | 'sha256'): Promise<boolean> {
    return algorithm === 'bcrypt' ? bcrypt.compare(input, hash) : (await HashUtil.makeHash(input, algorithm)) === hash;
  }
}
