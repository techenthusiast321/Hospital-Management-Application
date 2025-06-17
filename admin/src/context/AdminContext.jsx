import { createContext } from "react";
import React from 'react'
export const AdminContext =createContext()
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AdminContextProvider = ({children}) => {

    const [aToken,setAToken]=useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken')  :  null)
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([]);
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)   
    const getAllDoctors=async()=>{
        try{
            const {data}=await axios.post((backendUrl + '/api/admin/all-doctors'),{},{headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }
    const changeAvailability=async(doctId)=>{
        try{
            const {data} =await axios.post(backendUrl + '/api/admin/change-availability',{docId:doctId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    const getAllAppointments=async()=>{

        try{
            const {data}=await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    
    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const getDashData=async()=>{
        try{
            const {data}=await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(data.message)
        }
    }
    
    const value={
        aToken,setAToken,
        backendUrl,doctors,getAllDoctors,
        changeAvailability,appointments,getAllAppointments,
        setAppointments,cancelAppointment,dashData,getDashData
    }
    
    return (
        <AdminContext.Provider value={value}>
            {children}
            </AdminContext.Provider>
    )
}

export default AdminContextProvider