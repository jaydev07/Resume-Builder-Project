import React,{useState,useReducer} from 'react';

import "./Auth.css";
import {
        VALIDATOR_EMAIL,
        VALIDATOR_MINLENGTH,
        VALIDATOR_REQUIRE
    } from "../shared/util/validators";
import Input from "../shared/components/Input";
import {useForm} from "../shared/hooks/useForm";

const Auth = () => {

    const [formState, inputHandler, setFormData] = useForm(
        {
            email:{
                value:'',
                isValid:false,
            },
            password:{
                value:'',
                isValid:false,
            }
        },
        false
    );

    const [isLoginMode , setIsLoginMode] = useState(true);

    const switchModeHandler = () => { 
        if(isLoginMode){
            // Login -> signup
            setFormData(
            {
                ...formState.inputs,
                name:{
                    value:'',
                    isvalid:false
                }
            },
            false)
        }
        else{
            setFormData(
            {
                ...formState.inputs,
                name:undefined
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid)
        }

        setIsLoginMode(prev => !prev)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return(
        <React.Fragment>
            <div className="auth-form">
                <form onSubmit={submitHandler}>
                    { !isLoginMode && <Input 
                        id="name"
                        element="input"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name"
                        onInput={inputHandler}
                    /> }
                    <Input 
                        id="email"
                        element="input"
                        type="text"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email"
                        onInput={inputHandler}
                    />
                    <Input 
                        id="password"
                        element="input"
                        type="text"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a password of minimum 5 characters"
                        onInput={inputHandler}
                    />
                    <button type="submit" disabled={!formState.isValid}>
                        { isLoginMode ? 'Login' : 'Signup' }
                    </button>
                </form>

                <button onClick={() => {switchModeHandler()}}>
                    Switch to { isLoginMode ? 'Signup' : 'Login' }
                </button>
            </div>
        </React.Fragment>
    )
}

export default Auth;