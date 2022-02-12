import * as React from 'react';
import { INationalBackendKeysByEnvironment } from 'services/crypto-interfaces';

const gbNationalBackendContext = React.createContext(
  {} as IGBNationalBackendContext
);

export const ProvideGBNationalBackend: React.FC = ({ children }) => {
  const providedGbNationalBackendContext = useProvideGBNationalBackend();

  return (
    <gbNationalBackendContext.Provider value={providedGbNationalBackendContext}>
      {children}
    </gbNationalBackendContext.Provider>
  );
};

export const useGBNationalBackend = (): IGBNationalBackendContext => {
  const context = React.useContext(gbNationalBackendContext);

  return context;
};

const useProvideGBNationalBackend = (): IGBNationalBackendContext => {
  const [nationalBackendData, setNationalBackendData] = React.useState(
    {} as INationalBackendKeysByEnvironment
  );

  return {
    nationalBackendData,
    setNationalBackendData
  } as IGBNationalBackendContext;
};

interface IGBNationalBackendContext {
  nationalBackendData: INationalBackendKeysByEnvironment;
  setNationalBackendData(data: INationalBackendKeysByEnvironment): void;
}
