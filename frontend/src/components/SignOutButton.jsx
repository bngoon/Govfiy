import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { UserAuthContext } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const { logout } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate('/'); // Redirect to home or sign-in page
    };

    return (
        <Button onClick={handleSignOut} colorScheme="teal">
            Sign Out
        </Button>
    );
};

export default SignOutButton;