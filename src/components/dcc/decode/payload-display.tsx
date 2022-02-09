import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box
} from '@chakra-ui/react';
import * as React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { EUDCC } from 'services/dcc/dcc-combined-schema';

interface IPayloadDisplay {
  payload: EUDCC;
}

const PayloadDisplay: React.FC<IPayloadDisplay> = ({ payload }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton pl={0}>
            <Box textAlign="left" fontWeight={'bold'}>
              Payload:
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <CodeBlock
            text={JSON.stringify(payload ?? '', undefined, 2)}
            language={'javascript'}
            showLineNumbers={false}
            theme={dracula}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default PayloadDisplay;
