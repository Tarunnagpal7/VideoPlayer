import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localpath)=>{
    try{
         if(!localpath) return null;

         //upload file on cloudinary
         const response = await cloudinary.uploader.upload(localpath,
            {
                resource_type:"auto" //detct auto which file type
            }
          )
 
          console.log("File is uploaded on cloudinary" , response.url);
          return  response; 

    }catch(error){
        fs.unlinkSync(localpath) // remove the local save file from server as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}