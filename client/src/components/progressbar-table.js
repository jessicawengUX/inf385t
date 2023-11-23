import React from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

export default function ProgressBar() {
 return (
   <div className="container-progress mb-3">
     <div class="progress-container">
       <div class="stepper-item completed">
         <div class="step-counter">1</div>
         <div class="step-name">Calculate</div>
       </div>
       <div class="stepper-item completed">
         <div class="step-counter">2</div>
         <div class="step-name">Result</div>
       </div>
       <div class="stepper-item active">
         <div class="step-counter">
            <BiLock size={16}/>
         </div>
         <div class="step-name">Save</div>
       </div>
     </div>
   </div>
 );
}
