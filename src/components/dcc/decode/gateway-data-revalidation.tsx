import { RepeatIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useGBNationalBackend } from 'hooks/useGBNationalBackend';
import * as React from 'react';

const GatewayDataRevalidation: React.FC = () => {
  const { nationalBackendData, setNationalBackendData } =
    useGBNationalBackend();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDataUpdate = async () => {
    setIsLoading(true);

    try {
      //const prodDataResponse = await fetch(process.env.NEXT_PUBLIC_NB_PROD ?? '');

      const accDataResponse = await fetch(process.env.NEXT_PUBLIC_NB_ACC ?? '');

      //const prodKeys = await prodDataResponse.json();
      const accKeys = await accDataResponse.json();

      const newDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

      setNationalBackendData({
        PROD: [],
        ACC: accKeys,
        lastFetched: newDate
      });

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Flex flexDirection={'column'} alignItems={'flex-start'}>
      <Text>
        Gateway last fetched:{' '}
        {dayjs(nationalBackendData.lastFetched)?.format?.(
          'YYYY-MM-DD HH:mm:ss'
        ) ?? ''}
      </Text>
      <IconButton
        aria-label="refresh-gateway-data"
        icon={<RepeatIcon />}
        variant={'outline'}
        onClick={handleDataUpdate}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default GatewayDataRevalidation;
