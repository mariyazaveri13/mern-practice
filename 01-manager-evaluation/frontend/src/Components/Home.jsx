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
  const [state, setState] = useState({
    data: [],
    searchByName: '',
    searchByEmail: '',
    sortByRating: '',
    sortByManager: '',
    moreThanRating: '',
    lessThanRating: '',
  });

  function onChangeHandler(e, nameOfRadio) {
    //for radios
    if (nameOfRadio) {
      setState((preState) => ({
        ...preState,
        [nameOfRadio]: e,
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

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const data = await axios.get('http://localhost:5000/route');
      setState((preState) => ({ ...preState, data: data.data.data }));
    } catch (error) {}
  }

  async function onDeleteHandler(id) {
    try {
      const data = await axios.delete(`http://localhost:5000/route/${id}`);
      alert(data.data.message);

      setState((preState) => ({
        ...preState,
        data: state.data.filter((d) => d._id != id),
      }));
    } catch (error) {
      alert(error.message);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const obj = {};

      if (state.searchByEmail) obj.searchByEmail = state.searchByEmail;

      if (state.searchByName) obj.searchByName = state.searchByName;

      if (state.sortByManager) obj.sortByManager = state.sortByManager;

      if (state.sortByRating) obj.sortByRating = state.sortByRating;

      if (state.lessThanRating) obj.lessThanRating = state.lessThanRating;

      if (state.moreThanRating) obj.moreThanRating = state.moreThanRating;

      const data = await axios.get('http://localhost:5000/route', {
        params: obj,
      });

      if (data.data.count == 0) {
        alert('No Data Found');
        handleReset();
        return;
      }

      setState((preState) => ({
        ...preState,
        data: data.data.data,
        searchByEmail: '',
        searchByName: '',
        sortByRating: '',
        sortByManager: '',
        moreThanRating: '',
        lessThanRating: '',
      }));
    } catch (error) {}
  }

  function handleReset() {
    setState((preState) => ({
      ...preState,
      searchByEmail: '',
      searchByName: '',
      sortByRating: '',
      sortByManager: '',
      moreThanRating: '',
      lessThanRating: '',
    }));
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
            Manager Review Data
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <ReactRouterLink to="/addmanagerreview">
            <Button colorScheme="pink" variant="solid">
              Review Manager
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
          <AccordionPanel pb={4}>
            <form onSubmit={submitHandler}>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <FormControl>
                    <FormLabel>Search By Name</FormLabel>
                    <Input
                      type="text"
                      name="searchByName"
                      onChange={onChangeHandler}
                      value={state.searchByName}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel>Search By Email</FormLabel>
                    <Input
                      type="text"
                      name="searchByEmail"
                      onChange={onChangeHandler}
                      value={state.searchByEmail}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormLabel>Sort By Rating</FormLabel>
                  <RadioGroup
                    name="sortByRating"
                    id="sortByRating"
                    value={state.sortByRating}
                    onChange={(e) => onChangeHandler(e, 'sortByRating')}
                  >
                    <HStack spacing="1em">
                      <Radio value="asc">Ascending</Radio>
                      <Radio value="desc">Descending</Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
                <Box>
                  <FormLabel>Sort By Manager</FormLabel>
                  <RadioGroup
                    name="sortByManager"
                    id="sortByManager"
                    value={state.sortByManager}
                    onChange={(e) => onChangeHandler(e, 'sortByManager')}
                  >
                    <HStack spacing="1em">
                      <Radio value="asc">Ascending</Radio>
                      <Radio value="desc">Descending</Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
                <Box>
                  <FormLabel>Filter by more than rating</FormLabel>
                  <Input
                    type="text"
                    name="moreThanRating"
                    onChange={onChangeHandler}
                    value={state.moreThanRating}
                  />
                </Box>
                <Box>
                  <FormLabel>Filter by less than rating</FormLabel>
                  <Input
                    type="text"
                    name="lessThanRating"
                    onChange={onChangeHandler}
                    value={state.lessThanRating}
                  />
                </Box>
                <Box>
                  <Button colorScheme="pink" type="submit">
                    Submit
                  </Button>
                  {'        '}
                  <Button type="reset" onClick={handleReset}>
                    Reset
                  </Button>
                </Box>
              </SimpleGrid>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br></br>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Manager Details</TableCaption>
          <Thead>
            <Tr>
              <Th>Name of Managaer</Th>
              <Th>Rating</Th>
              <Th>Email</Th>
              <Th isNumeric>Buttons</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.data.map((d) => {
              return (
                <Tr key={d._id}>
                  <Td>{d.nameOfManager}</Td>
                  <Td>{d.rating}</Td>
                  <Td>{d.managerEmail}</Td>
                  <Td isNumeric>
                    <ButtonGroup>
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
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
