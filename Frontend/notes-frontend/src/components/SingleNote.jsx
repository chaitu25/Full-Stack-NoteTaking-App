import { Badge, Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteData, getData } from '../Redux/AppReducer/action'
import { DELETE_NOTES_DATA_FAILURE, DELETE_NOTES_DATA_SUCCESS } from '../Redux/AppReducer/actionTypes'
import "./Glass.css"

export const SingleNote = ({heading,description,tag,id,createdAt,updatedAt}) => {
  
    const dispatch=useDispatch()
    const [isExpanded, setIsExpanded] = useState(false);
    const toast=useToast()

  const handleDelete=()=>{

    
    dispatch(deleteData(id)).then((res)=>{
          if(res.type===DELETE_NOTES_DATA_SUCCESS){
              toast({
                title: "Data deleted Successfully",
                
                status: 'success',
                duration: 8000,
                isClosable: true,
              })
              dispatch(getData())
          }else if(res.type===DELETE_NOTES_DATA_FAILURE){
            toast({
              title: "Failed to delete data.",
              description:"Try again later",
              status: 'error',
              duration: 8000,
              isClosable: true,
            })
          }
    })

  }

  return (
    <Box  className='glass' height={"auto"} width="220px" borderRadius="12px" p={4}>
        <Link to={`/update/${id}`}>
          <Flex  direction={"column"}  borderRadius={"10px"}
                justifyContent="space-between" gap={3}>
              <Box>
                <Text fontSize={"xl"} color={"black"} fontWeight="bold">{heading}</Text>
              </Box> 
              <Box>
                <Text fontSize={"md"} color={"white"} noOfLines={isExpanded ? undefined : 3}>{description}</Text>
                {description.length > 100 && (
                  <Button size="sm" onClick={() => setIsExpanded(!isExpanded)} variant="link">
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </Button>
                )}
              </Box>  
              <Flex alignItems="center" justifyContent="space-between">
                <Badge fontSize={"md"} colorScheme="purple">{tag}</Badge>
              </Flex>
              <Box mt={3}>
                <Text fontSize="sm" color="gray.500">Created: {new Date(createdAt).toLocaleDateString()}</Text>
                <Text fontSize="sm" color="gray.500">Updated: {new Date(updatedAt).toLocaleDateString()}</Text>
              </Box>
          </Flex>
        </Link>
        <Button size={"sm"} colorScheme={"pink"} mt="3%" mb={"1%"} onClick={handleDelete}>DELETE</Button>
    </Box>
  )
}
