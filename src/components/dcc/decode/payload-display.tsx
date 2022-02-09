import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text
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
        {({ isExpanded }) => (
          <>
            <AccordionButton pl={0}>
              <Flex
                textAlign="left"
                fontWeight={'bold'}
                alignItems={'center'}
                lineHeight={'1em'}
              >
                <Text height={'18px'}>Payload</Text>
                <ChevronRightIcon
                  fontSize={'lg'}
                  transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
                  transition={'all 0.1s linear'}
                />
              </Flex>
            </AccordionButton>

            <AccordionPanel pb={4}>
              <CodeBlock
                text={JSON.stringify(payload ?? '', undefined, 4)}
                language={'javascript'}
                showLineNumbers={false}
                theme={dracula}
              />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default PayloadDisplay;
