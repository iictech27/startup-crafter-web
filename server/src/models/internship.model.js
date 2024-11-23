import mongoose from "mongoose"
import { MdDescription } from "react-icons/md"

const internshipSchema = mongoose.Schema({
    description:{
        type:String,
        required:true 
    },

    company:{
        type:"String",
        required:true 
    },

    stipend:{
        type:Number, 
        default:0 
    }, 

    domain:{
       type:String, 
    },

    startDate:{
        type:String, 
    },

    endDate:{
        type:String
    ,

    totalSeats:{
        type:Number,
        required:true 
    },

    vacantSeats:{
        type:Number,
        required:true 
    },

    appliedUsers:
                    [
                        {
                            type:mongoose.Schema.Types.ObjectId,
                            ref:"User"
                        }
                    ],
    

    selectedUsers:[
        {
              type:mongoose.Schema.Types.ObjectId,
              ref:"User"

        }
    ]
}


})

export const Internship = mongoose.model('Internship',internshipSchema);
