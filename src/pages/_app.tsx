import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ProvideGBNationalBackend } from 'hooks/useGBNationalBackend';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideGBNationalBackend>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideGBNationalBackend>
  );
};

export default App;
