import { Base64 } from 'js-base64';
import sha256 from 'sha256';

const certPrefix = '-----BEGIN CERTIFICATE-----\n';
const certPostfix = '-----END CERTIFICATE-----';

const removeCertHeaders = (cert: string) => {
  return cert.replace(certPrefix, '').replace(certPostfix, '');
};

const extractKid = (cert: string): Uint8Array => {
  const certNoTags = removeCertHeaders(cert);
  const decodedCert = Base64.toUint8Array(certNoTags);

  const hashBuffer = sha256(decodedCert, { asBytes: true }) as Uint8Array;

  return hashBuffer.slice(0, 8);
};

export default extractKid;
