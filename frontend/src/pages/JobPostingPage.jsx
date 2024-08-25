import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Textarea,
  Spinner,
  VStack,
  Divider,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';

const JobPostingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    company: ''
  });
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('/api/job-postings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setJobPostings(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setError('Failed to fetch job postings');
        toast({
          title: "Error",
          description: "Could not fetch job postings.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await axios.post('/api/job-postings', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast({
        title: "Job Posting Created",
        description: "Your job posting has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        title: '',
        description: '',
        location: '',
        company: ''
      });
      // Refetch the job postings
      const response = await axios.get('/api/job-postings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (Array.isArray(response.data)) {
        setJobPostings(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError('Failed to create job posting');
      toast({
        title: "Error",
        description: "Could not create job posting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Box maxW="xl" mx="auto" p={4}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading mb={4}>Post a Job</Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter job title"
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter job description"
                />
              </FormControl>
              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                />
              </FormControl>
              <FormControl id="company" isRequired>
                <FormLabel>Company</FormLabel>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={creating}>Post Job</Button>
            </Stack>
          </form>
        </Box>

        <Divider my={6} />

        <Box>
          <Heading mb={4}>Job Postings</Heading>
          {loading ? (
            <Spinner size="lg" />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <Stack spacing={4}>
              {Array.isArray(jobPostings) && jobPostings.length > 0 ? (
                jobPostings.map((job) => (
                  <Box key={job._id} p={4} borderWidth={1} borderRadius="md">
                    <Text fontSize="lg" fontWeight="bold">{job.title}</Text>
                    <Text mt={2}>{job.description}</Text>
                    <Text mt={2} fontStyle="italic">Location: {job.location}</Text>
                    <Text fontStyle="italic">Company: {job.company}</Text>
                  </Box>
                ))
              ) : (
                <Text>No job postings available.</Text>
              )}
            </Stack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default JobPostingPage;
