import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
const changeAvailability = async (req, res) => {
    try{

     const {docId}=req.body
     const docData=await doctorModel.findById(docId)
    //  const doc = await doctorModel.findByIdAndUpdate(docId,{available:!docData.available}, { new: true })
     if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }
     docData.available = !docData.available;
        await docData.save();
    //  console.log("h", doc)
     res.json({success:true,message:'Availability Changed'})
    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}

const doctorList=async (req,res)=>{
    try{
        const doctors= await doctorModel.find({}).select(['-password','-email'])

        res.json({success:true,doctors})
    }catch(error){
          console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for doctor login
const loginDoctor=async(req,res)=>{
    try{
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false,message:'Invalid credentials'})
        }

        const isMatch=await bcrypt.compare(password,doctor.password)
           
        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)

            res.json({success:true,token})
        }else{
            res.json({success:false,message:'Invalid credentials'})
        }
        
    }catch(error){
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get doctor appointments for doctor panel
const appointmentsDoctor=async(req,res)=>{
    try{
        const docId=req.docId
        const appointments=await appointmentModel.find({docId})
        res.json({success:true,appointments})
    }catch(error){
          console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to mark appointment completed for doctor panel
const appoinmentComplete=async()=>{
    try{
        const docId=req.docId
        const {appointmenId}=req.body
        

    }catch(error){

    }
}
export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor}