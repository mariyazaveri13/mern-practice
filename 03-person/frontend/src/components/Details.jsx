import {
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  SimpleGrid,
  Flex,
  Spacer,
  Heading,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import axios from 'axios';
export default function Details() {
  //   const location = useLocation();
  //   const { manager, type } =
  //     location && location.state !== null
  //       ? location.state
  //       : { manager: {}, type: '' };
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading
            bgGradient="linear(to-l, #805AD5, #97266D)"
            fontWeight="extrabold"
            bgClip="text"
          >
            Add Person
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <ReactRouterLink to="/">
            <Button colorScheme="pink" variant="solid">
              Home
            </Button>
          </ReactRouterLink>
        </ButtonGroup>
      </Flex>
      <form>
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <FormControl>
              <FormLabel>
                First things first, what’s the name of the manager you’re
                evaluating today?
              </FormLabel>
              <Input type="text" name="nameOfManager" />
            </FormControl>
          </Box>
          <Box>
            <Button colorScheme="pink" type="submit">
              Submit
            </Button>
          </Box>
        </SimpleGrid>
      </form>
    </>
  );
}
