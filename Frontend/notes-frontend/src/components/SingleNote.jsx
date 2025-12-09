import { Badge, Box, Button, Flex, Text, useToast, Collapse } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteData, getData } from '../Redux/AppReducer/action';
import { DELETE_NOTES_DATA_FAILURE, DELETE_NOTES_DATA_SUCCESS } from '../Redux/AppReducer/actionTypes';
import "./Glass.css";

export const SingleNote = ({ heading, description, tag, id, createdAt, updatedAt }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDelete = () => {
        dispatch(deleteData(id)).then((res) => {
            if (res.type === DELETE_NOTES_DATA_SUCCESS) {
                toast({
                    title: "Data deleted Successfully",
                    status: 'success',
                    duration: 8000,
                    isClosable: true,
                });
                dispatch(getData());
            } else if (res.type === DELETE_NOTES_DATA_FAILURE) {
                toast({
                    title: "Failed to delete data.",
                    description: "Try again later",
                    status: 'error',
                    duration: 8000,
                    isClosable: true,
                });
            }
        });
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box className='glass' height="auto" width="220px" borderRadius="12px" p={4}>
            <Flex direction="column" justifyContent="space-between" h="100%">
                <Box>
                    <Link to={`/update/${id}`}>
                        <Text fontSize="xl" color="black" fontWeight="bold" mb={2}>{heading}</Text>
                    </Link>
                    <Collapse startingHeight={50} in={isExpanded}>
                        <Text fontSize="md" color="white">{description}</Text>
                    </Collapse>
                    {description.length > 50 && (
                        <Button size="sm" onClick={handleToggle} mt="1rem">
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </Button>
                    )}
                    <Flex alignItems="center" mt={4}>
                        <Badge fontSize="sm" colorScheme="orange">{tag}</Badge>
                    </Flex>
                </Box>
                <Box mt={4}>
                    <Text fontSize="xs" color="gray.400">Created: {new Date(createdAt).toLocaleDateString()}</Text>
                    <Text fontSize="xs" color="gray.400">Updated: {new Date(updatedAt).toLocaleDateString()}</Text>
                    <Button size="sm" colorScheme="pink" mt="3%" onClick={handleDelete}>DELETE</Button>
                </Box>
            </Flex>
        </Box>
    );
};
