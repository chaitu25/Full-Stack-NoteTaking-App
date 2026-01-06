import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ViewSingleNote from '../components/ViewSingleNote'
import { getData } from '../Redux/AppReducer/action'

const ViewNote = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const notesData = useSelector((store)=>store.appReducer.notesData)
    const [currentNote,setCurrentNote] = useState({})

    useEffect(()=>{
        if(notesData.length === 0){
            dispatch(getData())
        }
    },[notesData.length,dispatch])

    useEffect(()=>{
        if(id){
            const temp = notesData.find((item)=>item._id === id)
            temp && setCurrentNote(temp)
        }
    },[id,notesData])

  return (
    <div>
        <ViewSingleNote {...currentNote} />
    </div>
  )
}

export default ViewNote