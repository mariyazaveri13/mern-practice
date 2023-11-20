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
  Stack,
  NumberInputField,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import axios from 'axios';
export default function Details() {
  const location = useLocation();
  const { person, type } =
    location && location.state !== null
      ? location.state
      : { person: {}, type: '' };
  const [state, setState] = useState({
    name: person.name || '',
    email: person.email || '',
    age: person.age || '',
    readsNewspaper: person.readsNewspaper || '', //boolean checkbox
    hobbies: person.hobbies || '',
    gender: person.gender || '', //radio
    paper1: person.paper1 || '',
    paper2: person.paper2 || '',
    paper3: person.paper3 || '',
    languages: person.languages || [],
    type: type || '',
  });

  function onChangeHandler(e) {
    const { name, type, value, checked } = e.target;
    if (name == 'languages') {
      if (checked) {
        setState((preState) => ({
          ...preState,
          languages: [...preState.languages, value],
        }));
      } else {
        setState((preState) => ({
          ...preState,
          languages: state.languages.filter((d) => d != value),
        }));
      }
      return;
    } else if (name == 'readsNewspaper') {
      setState((preState) => ({
        ...preState,
        readsNewspaper: checked ? true : false,
      }));

      return;
    }
    setState((preState) => ({ ...preState, [name]: value }));
  }

  function resetHandler() {
    setState((preState) => ({
      ...preState,
      name: '',
      email: '',
      age: '',
      readsNewspaper: false, //boolean checkbox
      hobbies: '',
      gender: '', //radio
      paper1: '',
      paper2: '',
      paper3: '',
      languages: [],
    }));
  }

  function validateNumber(str) {
    return /^[0-9]\d*$/.test(str);
  }

  function validateStr(str) {
    return /^[a-zA-Z ]*$/.test(str);
  }

  async function onSubmitHandler(e) {
    try {
      e.preventDefault();
      const obj = {};
      if (
        !state.name ||
        !state.email ||
        !state.age ||
        !state.readsNewspaper || //boolean checkbox
        !state.hobbies ||
        !state.gender || //radio
        !state.paper1 ||
        !state.paper2 ||
        !state.paper3 ||
        !state.languages
      ) {
        alert('Please fill all details');
        return;
      }

      if (
        !validateNumber(state.age) ||
        !validateNumber(state.paper1) ||
        !validateNumber(state.paper2) ||
        !validateNumber(state.paper3)
      ) {
        console.log(validateNumber(state.age));
        alert('Please enter only number in number fields');
        return;
      }

      if (!validateStr(state.name)) {
        alert('Please enter only alphabets ');
        return;
      }

      setState((preState) => ({
        ...preState,
        age: Number(state.age),
        paper1: Number(state.paper1),
        paper2: Number(state.paper2),
        paper3: Number(state.paper3),
      }));

      let url = 'http://localhost:5000';

      const data = await axios.post(url, state);

      alert(data.data.message);
      resetHandler();
      console.log(data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

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
      <form onSubmit={onSubmitHandler}>
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={onChangeHandler}
                disabled={type == 'view'}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="email"
                onChange={onChangeHandler}
                disabled={type == 'view'}
                value={state.email}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input
                type="text"
                name="age"
                onChange={onChangeHandler}
                disabled={type == 'view'}
                value={state.age}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Reads newspaper</FormLabel>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox
                    name="readsNewspaper"
                    onChange={onChangeHandler}
                    disabled={type == 'view'}
                    checked={Boolean(state.readsNewspaper)}
                  >
                    {console.log(state.readsNewspaper, 'reads')}
                    Do you?
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Hobbies</FormLabel>
              <Input
                type="text"
                name="hobbies"
                disabled={type == 'view'}
                onChange={onChangeHandler}
                value={state.hobbies}
              />
              <FormHelperText>
                Please enter comma seperated values
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup name="gender" id="gender" value={state.gender}>
                <HStack spacing="1em">
                  <Radio
                    value="Male"
                    disabled={type == 'view'}
                    onChange={onChangeHandler}
                  >
                    Male
                  </Radio>
                  <Radio
                    value="Female"
                    disabled={type == 'view'}
                    onChange={onChangeHandler}
                  >
                    Female
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Paper1</FormLabel>
              <Input
                type="text"
                disabled={type == 'view'}
                name="paper1"
                value={state.paper1}
                onChange={onChangeHandler}
              ></Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Paper2</FormLabel>
              <Input
                type="text"
                disabled={type == 'view'}
                name="paper2"
                value={state.paper2}
                onChange={onChangeHandler}
              ></Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Paper3</FormLabel>
              <Input
                type="text"
                name="paper3"
                disabled={type == 'view'}
                value={state.paper3}
                onChange={onChangeHandler}
              ></Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Languages</FormLabel>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox
                    disabled={type == 'view'}
                    name="languages"
                    value="Hindi"
                    checked={state.languages.includes('Hindi')}
                    onChange={onChangeHandler}
                  >
                    Hindi
                  </Checkbox>
                  <Checkbox
                    name="languages"
                    disabled={type == 'view'}
                    onChange={onChangeHandler}
                    checked={state.languages.includes('English')}
                    value="English"
                  >
                    English
                  </Checkbox>
                  <Checkbox
                    name="languages"
                    disabled={type == 'view'}
                    value="Gujarati"
                    onChange={onChangeHandler}
                    checked={state.languages.includes('Gujarati')}
                  >
                    Gujarati
                  </Checkbox>
                  <Checkbox
                    disabled={type == 'view'}
                    name="languages"
                    value="Others"
                    onChange={onChangeHandler}
                    checked={state.languages.includes('Others')}
                  >
                    Others
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </Box>
          <Box>
            {state.type != 'view' && (
              <ButtonGroup>
                <Button colorScheme="pink" type="submit">
                  Submit
                </Button>
                {'    '}
                <Button type="reset" onClick={resetHandler}>
                  Reset
                </Button>
              </ButtonGroup>
            )}
          </Box>
        </SimpleGrid>
      </form>
    </>
  );
}
