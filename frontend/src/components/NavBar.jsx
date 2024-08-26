// src/components/NavBar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { UserAuthContext } from '../context/UserAuthContext';
import SignOutButton from './SignOutButton'; // Assuming you created this component

const NavBar = () => {
  const { isAuthenticated } = useContext(UserAuthContext);

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Box>
          <Link to="/">
            <Button colorScheme="teal" variant="link">Home</Button>
          </Link>
        </Box>
        <Spacer />
        <Box>
          {isAuthenticated() ? (
            <>
              <Link to="/dashboard">
                <Button colorScheme="teal" variant="link">Dashboard</Button>
              </Link>
              <Link to="/candidate-list">
                <Button colorScheme="teal" variant="link">Candidates</Button>
              </Link>
              <Link to="/job-posting">
                <Button colorScheme="teal" variant="link">Job Posting</Button>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link to="/">
                <Button colorScheme="teal" variant="link">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="teal" variant="link">Register</Button>
              </Link>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
