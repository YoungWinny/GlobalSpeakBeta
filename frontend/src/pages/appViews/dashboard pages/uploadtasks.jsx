import React from "react";
import background from "../../../assets/images/blue.jpg"
import { FaFileUpload, FaUpload, } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdOutlineFileUpload } from 'react-icons/md';
import { AiOutlineCloseCircle,AiOutlineFile } from 'react-icons/ai';


export const  UploadTasks = () => {
    return (
    <>
      <div className="bg-[#BEBEBE]  h-full w-full flex items-center justify-center flex flex-col">
        {/* <div className="lefImage"></div> */}
        <div className="uploadSection bg-[whitesmoke] h-[95%] w-[80%] shadow-2xl border rounded-2xl ">
          <div className="flex justify-between">
              <div>
                   <button className="mt-10 border-2 border-[#BEBEBE] border-solid ml-4 rounded-full">cancel</button>
              </div>
              <div>
                   <button className="mt-10 bg-[#BEBEBE] border-none rounded-full">save as draft</button>&nbsp;&nbsp;
                   <button className="mt-10  rounded-full mr-4 bg-black text-white mt-10" >continue</button>
              </div>
           </div>
           <h1 className="text-3xl text-center">What have you been working on?</h1>
           <p className="text-center">Add your documents here and upload them</p>
            <div className="w-full h-3/4 flex flex-col items-center justify-center">
                <div className=" border-4 border-dashed border-[#BEBEBE] w-[90%] h-[75%] flex flex-col items-center justify-center mt-20">
                    
                                         <MdOutlineFileUpload size={32} />
                    <p>Drag and Drop or</p>&nbsp;<button className="border-2 border-[#BEBEBE] border-solid rounded-full">Browse</button><p>files</p>
                </div>
                <div className="border-2 border-solid border-[#BEBEBE] h-[25%] w-[90%] mt-2">
                  <div className="flex justify-between items-center ">
                  <div className="flex p-3 ">
                  <AiOutlineFile size={32} />
                    <span>filename</span>
                  </div>
                  <div className="mr-4">
                    <AiOutlineCloseCircle size={26}/>
                  </div>
                  </div>
                </div>
           
            <div>

           </div>
           </div>
        </div>
      </div>
      </>
      // <span>This is where you upload the completed task </span>






    );
};


   export default UploadTasks;