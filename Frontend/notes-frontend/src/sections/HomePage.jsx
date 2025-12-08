import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'
import Glass from './Glass'

const HomePage = () => {

  const navigate=useNavigate()

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0,transition:{duration:0.5}}}
      >
    <Glass bgimg={"https://user-images.githubusercontent.com/101392591/193494962-789f5443-5e7e-429b-aecd-b612ec937c6b.jpg"}>
      <VStack spacing={8} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        <Heading size={"2xl"} color="white" >The Notes App</Heading>
        <Button size={"lg"} colorScheme="teal" onClick={()=>navigate("/notes")}>Get Started</Button>
      </VStack>
    </Glass>
    </motion.div>
  )
}

export default HomePage
