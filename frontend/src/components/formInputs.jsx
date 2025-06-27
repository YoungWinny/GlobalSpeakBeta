import React from "react";
import "../assets/css/formInputStyles/formInput.css"


const FormImput = (props) => {
    return (
        <div className="FormInput">
            <div className="formInputLeft">
                <div className="formInputLeft_left">
                    <div className="inputIcons">
                        <img src={props.leftIcon} style={{width:'41px', height:'41px'}} />
                    </div>
                    <div className="controls-in">
                        <label>{props.label}</label>
                        <input 
                            type={props.type}
                            value={props.state}
                            onChange={(e)=> props.setState(e.target.value)}
                           placeholder={props.placeholder}
                        />
                    </div>
                </div>
            </div>
            <div className="formInputRight">
                {props.rightIcon && <img onClick={props.onClick} src={props.rightIcon} style={{width:'41px', height:'41px'}} />}
                {/* {props.rightIcon ? <img src={props.rightIcon} style={{width:'41px', height:'41px'}} /> : null} */}
            </div>
        </div>
    )
}

export default FormImput;