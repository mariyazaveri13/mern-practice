import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';
import axios from 'axios';
export default function Home() {
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading
            bgGradient="linear(to-l, #805AD5, #97266D)"
            fontWeight="extrabold"
            bgClip="text"
          >
            Person Data
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <ReactRouterLink to="/details">
            <Button colorScheme="pink" variant="solid">
              Add Person
            </Button>
          </ReactRouterLink>
        </ButtonGroup>
      </Flex>
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Sort and filter
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}></AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br></br>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Person Details</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Email</Th>
              <Th>Created Date</Th>
              <Th>Gender</Th>
              <Th isNumeric>Buttons</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{}</Td>
              <Td>{}</Td>
              <Td>{}</Td>
              <Td>{}</Td>
              <Td>{}</Td>
              <Td isNumeric>
                {/* <ButtonGroup>
                      <ReactRouterLink
                        to="/addmanagerreview"
                        state={{ manager: d, type: 'view' }}
                      >
                        <Button>View More</Button>
                      </ReactRouterLink>
                      <ReactRouterLink
                        to="/addmanagerreview"
                        state={{ manager: d, type: 'edit' }}
                      >
                        <Button>Edit</Button>
                      </ReactRouterLink>
                      <Button onClick={() => onDeleteHandler(d._id)}>
                        Delete
                      </Button>
                    </ButtonGroup> */}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
