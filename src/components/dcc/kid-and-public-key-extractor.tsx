import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import CopyableResultValue from 'components/copyable-result-value';
import * as React from 'react';
import { DefaultValues } from 'services/dcc/constants';
import extractKid from 'utilities/extract-kid';
import getPublicKeyPem from 'utilities/get-public-key-pem';

interface IKidPublicKeyObject {
  kid: string;
  publicKey: string;
}

const KidAndPublicKeyExtractor: React.FC = () => {
  const [certificateValue, setCertificateValue] = React.useState(
    DefaultValues.SigningDetails.dscPem
  );
  const [extractionResultValue, setExtractionResultValue] = React.useState(
    null as IKidPublicKeyObject
  );

  const { onCopy: onKidCopy } = useClipboard(
    extractionResultValue?.kid,
    10000000
  );
  const { onCopy: onPublicKeyCopy } = useClipboard(
    extractionResultValue?.publicKey,
    10000000
  );

  const toast = useToast();

  const extractValue = async () => {
    try {
      const kid = extractKid(certificateValue);
      const publicKey = await getPublicKeyPem(certificateValue, false);

      setExtractionResultValue({
        kid: Buffer.from(kid).toString('base64'),
        publicKey
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Key Id or Public Key could not be extracted',
        description: 'Check the certificate data has been copied correctly',
        position: 'bottom-right',
        isClosable: true,
        status: 'error',
        variant: 'subtle'
      });
    }
  };

  return (
    <Stack direction={'column'} spacing={3}>
      <Text fontSize={'xl'} fontWeight={'semibold'} mb={2}>
        Extract Key Id and Public Key from x509 certificates
      </Text>
      <FormControl>
        <FormLabel>Certificate</FormLabel>
        <Textarea
          size={'xs'}
          value={certificateValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCertificateValue(e.target.value)
          }
          minHeight={'150px'}
        />
      </FormControl>
      <Button width={'100px'} onClick={extractValue}>
        Extract
      </Button>
      <Divider />
      {extractionResultValue ? (
        <>
          <CopyableResultValue
            label="Key Id"
            value={extractionResultValue.kid}
            height="50px"
            onCopy={onKidCopy}
          />
          <CopyableResultValue
            label="Public Key"
            value={extractionResultValue.publicKey}
            height="110px"
            onCopy={onPublicKeyCopy}
          />
        </>
      ) : null}
    </Stack>
  );
};

export default KidAndPublicKeyExtractor;
