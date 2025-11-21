import React from 'react'
import { Text } from '@chakra-ui/react'
import Glass from './Glass'
import Navbar from './Navbar'

const RequestPasswordReset = () => {
  return (
    <div>
      <Navbar />
      <Glass>
        <Text fontSize="4xl">Request Password Reset</Text>
        <Text mt="4%">This feature is coming soon.</Text>
      </Glass>
    </div>
  )
}

export default RequestPasswordReset