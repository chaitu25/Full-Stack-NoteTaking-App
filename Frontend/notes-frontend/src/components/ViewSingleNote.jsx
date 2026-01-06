import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import "./Glass.css"

const ViewSingleNote = ({heading,description,tag}) => {


  return (
    
    <Box className='glass' margin="auto" mt="5%" width="50%" padding="2%" borderRadius="15px">
      <Flex direction={"column"} height={"auto"} 
      gap="8%" >
          <Heading>{heading}</Heading>
          <Text fontSize={"large"} textAlign="center" >{description}</Text>
          <Text textAlign={"left"}>{tag}</Text>
      </Flex>  
    </Box>    

  )
}

export default ViewSingleNote