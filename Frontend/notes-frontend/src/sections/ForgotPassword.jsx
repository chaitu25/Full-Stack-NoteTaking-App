import { Box, Button, Input, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import Glass from './Glass'

const ForgotPassword = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <Navbar />
      <Glass bgimg={"https://user-images.githubusercontent.com/101392591/193494994-66849985-36cd-4612-a93a-a8cc08b1ee17.jpg"}>
        <Text fontSize={"4xl"}>Request password reset</Text>
        <Input width={"350px"} mt="5%" name="email" placeholder="type your email" />
        <Button size={"lg"} colorScheme="green" display={"block"} m={"auto"} mt="3%">Submit</Button>
      </Glass>
    </motion.div>
  )
}

export default ForgotPassword