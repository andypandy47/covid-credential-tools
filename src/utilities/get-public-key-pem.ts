import x509 from 'js-x509-utils';
import jwkToPem from 'jwk-to-pem';

const publicKeyPrefix = '-----BEGIN PUBLIC KEY-----\n';
const publicKeyPostfix = '-----END PUBLIC KEY-----';

export const removeKeyHeaders = (publicKey: string) => {
  return publicKey.replace(publicKeyPrefix, '').replace(publicKeyPostfix, '');
};

const getPublicKeyPem = async (
  dscPem: string,
  includeHeaders = true
): Promise<string> => {
  const publicJwk = await x509.toJwk(dscPem, 'pem');

  const publicKeyPem = jwkToPem(publicJwk);

  if (includeHeaders) {
    return publicKeyPem;
  }

  return removeKeyHeaders(publicKeyPem);
};

export default getPublicKeyPem;
