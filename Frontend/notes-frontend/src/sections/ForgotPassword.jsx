import { Box, Button, Input, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import Glass from './Glass'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleClick = () => {
    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setLoading(false)
      if (email === 'test@example.com') {
        toast({
          title: 'Reset link sent',
          description: 'A password reset link has been sent to your email.',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Please enter a valid email address.',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top',
        })
      }
    }, 2000)
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <Navbar />
      <Glass bgimg={"https://user-images.githubusercontent.com/101392591/193494994-66849985-36cd-4612-a93a-a8cc08b1ee17.jpg"}>
        <Text fontSize={"4xl"}>Forgot Password</Text>
        <Input
          width={"350px"}
          mt="5%"
          name="email"
          onChange={handleChange}
          placeholder="type your email"
        />
        <Button
          size={"lg"}
          colorScheme="green"
          onClick={handleClick}
          display={"block"}
          m={"auto"}
          mt="3%"
          isLoading={loading}
        >
          Send Reset Link
        </Button>
        <Box mt={"4%"}>
          <NavLink to={"/login"}>
            <Text fontSize={"large"} color="Highlight">
              Back to Login
            </Text>
          </NavLink>
        </Box>
      </Glass>
    </motion.div>
  )
}

export default ForgotPassword
