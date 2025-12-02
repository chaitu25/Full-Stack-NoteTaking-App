import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const navigate=useNavigate()

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0,transition:{duration:0.5}}}
      >
    <Box 
     height={"100vh"}
     backgroundImage={"https://user-images.githubusercontent.com/101392591/193494962-789f5443-5e7e-429b-aecd-b612ec937c6b.jpg"}
     backgroundSize="cover"
     overflowY="hidden"
     display="flex"
     justifyContent="center"
     alignItems="center"
     >
        <VStack spacing={8}>
          <Heading as="h1" size="4xl" color="white">The Notes App</Heading>
          <Button size={"lg"} colorScheme="teal" onClick={()=>navigate("/notes")}>Get Started</Button>
        </VStack>
    </Box>
    </motion.div>
  )
}

export default HomePage