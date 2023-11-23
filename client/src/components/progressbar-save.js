import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
 
export default function ProgressBar() {
    return (
      <div className="container-progress mb-3">
        <div class="progress-container">
            <div class="stepper-item completed">
                <div class="step-counter">1</div>
                <div class="step-name">Cacluate</div>
            </div>
            <div class="stepper-item completed">
                <div class="step-counter">2</div>
                <div class="step-name">Result</div>
            </div>
            <div class="stepper-item completed">
                <div class="step-counter">3</div>
                <div class="step-name">Save</div>
            </div>
            </div>
      </div>
    );
  }