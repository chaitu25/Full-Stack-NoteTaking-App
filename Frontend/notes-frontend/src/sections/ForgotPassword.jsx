import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Glass from './Glass';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <Navbar />
      <Glass bgimg={"https://user-images.githubusercontent.com/101392591/193494994-66849985-36cd-4612-a93a-a8cc08b1ee17.jpg"}>
        <Text fontSize={"4xl"}>Forgot Password</Text>
        <Text mt="5%">Forgot password functionality will be implemented here.</Text>
      </Glass>
    </motion.div>
  );
};

export default ForgotPassword;
