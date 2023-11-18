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

export default function ManagerEval() {
  /**
   *
   * To do
   *
   * apply state
   *
   * validation on name field - only alphabets
   * validate email
   * all radios should be in number format
   * onchange handlers - done
   * validation before on submit so that all fields are mandatory and filled
   * onsubmit handler
   *
   * email verification
   *
   */
  const location = useLocation();
  const { manager, type } =
    location && location.state !== null
      ? location.state
      : { manager: {}, type: '' };
  const [state, setState] = useState({
    nameOfManager: manager.nameOfManager || '',
    workExp: manager.workExp || '',
    rating: manager.rating || '',
    workEnvRating: manager.workEnvRating || '',
    responsibilityRating: manager.responsibilityRating || '',
    profDev: manager.profDev || '',
    oneToOneRating: manager.oneToOneRating || '',
    favoritesRating: manager.favoritesRating || '',
    strengths: manager.strengths || '',
    weakness: manager.weakness || '',
    managerEmail: manager.managerEmail || '',
    type: type || '',
    id: manager._id || '',
  });

  function onChangeHandler(e, nameOfRadio) {
    //for radios
    if (nameOfRadio) {
      setState((preState) => ({
        ...preState,
        [nameOfRadio]: Number(e),
      }));
      return;
    }

    //for normal fields
    const { name, value, type, checked } = e.target;
    setState((preState) => ({
      ...preState,
      [name]: value,
    }));
  }
  function containsNumbers(str) {
    //return /\d/.test(str);
    return /^[0-9]*$/.test(str);
  }
  function containsSplChar(str) {
    /** /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str) */
    return /[\d`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
  }

  function validateEmail(str) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    const {
      nameOfManager,
      workExp,
      rating,
      workEnvRating,
      responsibilityRating,
      profDev,
      oneToOneRating,
      favoritesRating,
      strengths,
      weakness,
      managerEmail,
    } = state;

    if (
      !nameOfManager ||
      !workExp ||
      !rating ||
      !workEnvRating ||
      !responsibilityRating ||
      !profDev ||
      !oneToOneRating ||
      !favoritesRating ||
      !strengths ||
      !weakness ||
      !managerEmail
    ) {
      alert('Please fill all data');
      return;
    }

    if (containsSplChar(nameOfManager)) {
      alert('Please enter only alpha numeric in Name');
      return;
    }

    if (!validateEmail(managerEmail)) {
      alert('Proper format for manager email not found');
      return;
    }

    sendData();

    setState((preState) => ({
      ...preState,
      nameOfManager: '',
      workExp: '',
      rating: '',
      workEnvRating: '',
      responsibilityRating: '',
      profDev: '',
      oneToOneRating: '',
      favoritesRating: '',
      strengths: '',
      weakness: '',
      managerEmail: '',
    }));
  }

  async function sendData() {
    try {
      const data = {
        nameOfManager: state.nameOfManager,
        workExp: state.workExp,
        rating: state.rating,
        workEnvRating: state.workEnvRating,
        responsibilityRating: state.responsibilityRating,
        profDev: state.profDev,
        oneToOneRating: state.oneToOneRating,
        favoritesRating: state.favoritesRating,
        strengths: state.strengths,
        weakness: state.weakness,
        managerEmail: state.managerEmail,
      };

      let res;
      if (!state.type)
        res = await axios.post('http://localhost:5000/route', data);

      if (state.type == 'edit') {
        res = await axios.patch(
          `http://localhost:5000/route/${state.id}`,
          data
        );
      }
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
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
            Manager Review
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
              <FormLabel>
                First things first, what’s the name of the manager you’re
                evaluating today?
              </FormLabel>
              <Input
                type="text"
                name="nameOfManager"
                onChange={onChangeHandler}
                value={state.nameOfManager}
                disabled={state.type == 'view'}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                And how long have you been working with{' '}
                {state.nameOfManager ? state.nameOfManager : '_____'}?
              </FormLabel>
              <Select
                placeholder="Select"
                onChange={onChangeHandler}
                name="workExp"
                value={state.workExp}
                disabled={state.type == 'view'}
              >
                <option>Less than a year</option>
                <option>2 - 3 years</option>
                <option>4 - 6 years</option>
                <option>7-10 years</option>
                <option>10+ years</option>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                And how would you rate{' '}
                {state.nameOfManager ? state.nameOfManager : '_____'}'s overall
                management skills?
              </FormLabel>
              <NumberInput
                min={1}
                max={5}
                value={state.rating}
                disabled={state.type == 'view'}
              >
                <NumberInputField
                  name="rating"
                  onChange={onChangeHandler}
                ></NumberInputField>
              </NumberInput>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                {state.nameOfManager ? state.nameOfManager : '_____'} creates a
                work environment in which everyone can give their best
              </FormLabel>
              <RadioGroup
                name="workEnvRating"
                id="workEnvRating"
                value={state.workEnvRating.toString()}
                onChange={(e) => onChangeHandler(e, 'workEnvRating')}
              >
                <HStack spacing="1em">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                  <Radio value="6">6</Radio>
                  <Radio value="7">7</Radio>
                  <Radio value="8">8</Radio>
                  <Radio value="9">9</Radio>
                  <Radio value="10">10</Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>
                1 - extremely unlikely 10 - extremely likely
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                {state.nameOfManager ? state.nameOfManager : '_____'} takes
                responsibility for their mistakes
              </FormLabel>
              <RadioGroup
                name="responsibilityRating"
                id="responsibilityRating"
                value={state.responsibilityRating.toString()}
                onChange={(e) => onChangeHandler(e, 'responsibilityRating')}
              >
                <HStack spacing="1em">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                  <Radio value="6">6</Radio>
                  <Radio value="7">7</Radio>
                  <Radio value="8">8</Radio>
                  <Radio value="9">9</Radio>
                  <Radio value="10">10</Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>
                1 - extremely unlikely 10 - extremely likely
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                {state.nameOfManager ? state.nameOfManager : '_____'} is
                interested in my personal and professional development
              </FormLabel>
              <RadioGroup
                name="profDev"
                id="profDev"
                onChange={(e) => onChangeHandler(e, 'profDev')}
                value={state.profDev.toString()}
              >
                <HStack spacing="1em">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                  <Radio value="6">6</Radio>
                  <Radio value="7">7</Radio>
                  <Radio value="8">8</Radio>
                  <Radio value="9">9</Radio>
                  <Radio value="10">10</Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>
                1 - extremely unlikely 10 - extremely likely
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                I have regular 1:1s with{' '}
                {state.nameOfManager ? state.nameOfManager : '_____'}
              </FormLabel>
              <RadioGroup
                name="oneToOneRating"
                id="oneToOneRating"
                onChange={(e) => onChangeHandler(e, 'oneToOneRating')}
                value={state.oneToOneRating.toString()}
              >
                <HStack spacing="1em">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                  <Radio value="6">6</Radio>
                  <Radio value="7">7</Radio>
                  <Radio value="8">8</Radio>
                  <Radio value="9">9</Radio>
                  <Radio value="10">10</Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>
                1 - extremely unlikely 10 - extremely likely
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                {state.nameOfManager ? state.nameOfManager : '_____'} respects
                us all equally and doesn’t have favorites
              </FormLabel>
              <RadioGroup
                name="favoritesRating"
                id="favoritesRating"
                onChange={(e) => onChangeHandler(e, 'favoritesRating')}
                value={state.favoritesRating.toString()}
              >
                <HStack spacing="1em">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                  <Radio value="6">6</Radio>
                  <Radio value="7">7</Radio>
                  <Radio value="8">8</Radio>
                  <Radio value="9">9</Radio>
                  <Radio value="10">10</Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>
                1 - extremely unlikely 10 - extremely likely
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                Could you tell us a bit about{' '}
                {state.nameOfManager ? state.nameOfManager : '_____'}'s
                strengths?
              </FormLabel>
              <Input
                name="strengths"
                onChange={onChangeHandler}
                value={state.strengths}
                disabled={state.type == 'view'}
              ></Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                What could {state.nameOfManager ? state.nameOfManager : '_____'}{' '}
                improve on?
              </FormLabel>
              <Input
                name="weakness"
                onChange={onChangeHandler}
                value={state.weakness}
                disabled={state.type == 'view'}
              ></Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Manager Email</FormLabel>
              <Input
                type="email"
                name="managerEmail"
                onChange={onChangeHandler}
                value={state.managerEmail}
                disabled={state.type == 'view'}
              ></Input>
            </FormControl>
          </Box>
          {state.type == 'view' ? (
            ''
          ) : (
            <Box>
              <Button colorScheme="pink" type="submit">
                {state.type == 'edit' ? 'Update' : 'Submit'}
              </Button>
            </Box>
          )}
        </SimpleGrid>
      </form>
    </>
  );
}
