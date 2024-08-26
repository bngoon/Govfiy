// src/pages/SignIn.jsx
import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuthContext'; // Adjust import if necessary

const SignIn = ({ onRegisterToggle }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(UserAuthContext); // Using context to access login function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use VITE_API_URL environment variable
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Sign in failed');
      }

      const data = await response.json();

      // Call login from context to store token and user data
      login(data.token, data.user);

      setIsSubmitted(true);
      toast({
        title: "Sign In Successful",
        description: "You have been signed in successfully. Redirecting to the dashboard...",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to Dashboard after successful sign-in
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Delay navigation to show success message

    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      {isSubmitted ? (
        <Stack spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Sign In Successful
          </Text>
          <Text>Your sign-in was successful. You will be redirected shortly.</Text>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Sign In
            </Button>
          </Stack>
        </form>
      )}
      <Button mt={4} onClick={onRegisterToggle}>
        Go to Register
      </Button>
    </Box>
  );
};

export default SignIn;
