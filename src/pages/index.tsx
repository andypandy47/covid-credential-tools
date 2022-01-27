import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import RecoveryTab from '../components/recovery-tab';
import TestTab from '../components/test-tab';
import VaccinationTab from '../components/vaccination-tab';

const pageWidth = '1000px';

const Home: NextPage = () => {
  return (
    <Flex width="100%" height="100%" direction={'column'}>
      <Head>
        <title>Covid Credentials Generator</title>
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
        <Flex width={pageWidth}>
          <Heading as="h1">Covid Credentials Generator</Heading>
        </Flex>
      </Flex>
      <Flex alignItems={'center'} justifyContent={'center'} width={'100%'}>
        <Tabs size="lg" variant="enclosed" mt={5} width={pageWidth}>
          <TabList>
            <Tab fontWeight={'semibold'}>EU DCC</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Tabs size="md" variant="enclosed" mt={5} width={pageWidth}>
                <TabList>
                  <Tab>Vaccination</Tab>
                  <Tab>Recovery</Tab>
                  <Tab>Test</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VaccinationTab />
                  </TabPanel>
                  <TabPanel>
                    <RecoveryTab />
                  </TabPanel>
                  <TabPanel>
                    <TestTab />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Home;
