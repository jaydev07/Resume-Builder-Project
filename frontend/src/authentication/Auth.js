import React,{useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';

import "./Auth.css";
import {
        VALIDATOR_EMAIL,
        VALIDATOR_MINLENGTH,
        VALIDATOR_REQUIRE
    } from "../shared/util/validators";
import Input from "../shared/components/Input";
import {useForm} from "../shared/hooks/useForm";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import {AuthContext} from "../shared/context/auth-context";

const Auth = () => {

    const auth = useContext(AuthContext);

    const history = useHistory();

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

    const [error,setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

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

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!isLoginMode){
            setIsLoading(true);
            try{
                const response = await fetch("http://localhost:5000/api/user/signup",{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name:formState.inputs.name.value,
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value
                    })
                });
                const responseData = await response.json();

                if(responseData.message){
                    throw Error(responseData.message);
                }

                auth.login(responseData.user.id);
            }catch(err){
                console.log(err);
                setError(err.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }else{
            setIsLoading(true);
            try{
                const response = await fetch("http://localhost:5000/api/user/login",{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value
                    })
                });
                const responseData = await response.json();

                if(responseData.message){
                    throw Error(responseData.message);
                }

                auth.login(responseData.user.id);

                if(responseData.user.resumeId){
                    auth.setResumeId(responseData.user.resumeId);
                }

                if(responseData.user.latestSection){
                    history.push(`/${responseData.user.latestSection}`);
                }
                
            }catch(err){
                console.log(err);
                setError(err.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }
    }

    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    return(
        <React.Fragment>

            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}

            { isLoading && <LoadingSpinner asOverlay />}

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