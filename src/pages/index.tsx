import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import DCCTab from '../components/dcc-tab';
import { Styles } from '../services/constants';
const Home: NextPage = () => {
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
