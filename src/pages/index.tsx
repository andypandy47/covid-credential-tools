import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import DCCTab from 'components/dcc-tab';
import { useGBNationalBackend } from 'hooks/useGBNationalBackend';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { Styles } from 'services/crypto-constantsnstants';
import { INationalBackendKeysByEnvironment } from 'services/crypto-interfaces';

interface IHomeProps {
  publicKeys: INationalBackendKeysByEnvironment;
}

const Home: NextPage<IHomeProps> = ({ publicKeys }) => {
  const { setNationalBackendData } = useGBNationalBackend();

  useEffect(() => {
    setNationalBackendData(publicKeys);
  }, []);

  return (
    <Flex width="100%" height="100%" direction={'column'}>
      <Head>
        <title>Covid Credential Tools</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        width="100%"
        height="4rem"
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor={'#005EB8'}
        color={'white'}
        p={4}
      >
        <Flex width={Styles.PageWidth}>
          <Heading as="h1">Covid Credential Tools</Heading>
        </Flex>
      </Flex>
      <Flex alignItems={'center'} justifyContent={'center'} width={'100%'}>
        <Tabs
          size="lg"
          variant="enclosed"
          mt={5}
          width={Styles.PageWidth}
          isLazy
        >
          <TabList>
            <Tab fontWeight={'semibold'}>EU DCC</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <DCCTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const prodKeys = await fetch(process.env.NEXT_PUBLIC_NB_PROD ?? '');
    const accKeys = await fetch(process.env.NEXT_PUBLIC_NB_ACC ?? '');

    const publicKeys: INationalBackendKeysByEnvironment = {
      PROD: await prodKeys.json(),
      ACC: await accKeys.json(),
      lastFetched: new Date().toString()
    };

    return {
      props: {
        publicKeys
      },
      revalidate: 60 * 60 * 12 //Every 12 hours
    };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {}
  };
};
