import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSignInToggle }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your registration logic
      // Example: const response = await fetch('/register', { method: 'POST', body: JSON.stringify(formData) });

      // Mock successful registration
      setIsSubmitted(true);
      toast({
        title: "Registration Successful",
        description: "You have been registered successfully. Redirecting to the dashboard...",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to Dashboard after successful registration
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Delay navigation to show success message
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
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
          <Text fontSize="lg" fontWeight="bold">Registration Successful!</Text>
          <Text>You have been registered successfully. You will be redirected to the dashboard shortly.</Text>
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
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">Register</Button>
            <Button colorScheme="blue" onClick={onSignInToggle}>Already have an account? Sign In</Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default Register;
