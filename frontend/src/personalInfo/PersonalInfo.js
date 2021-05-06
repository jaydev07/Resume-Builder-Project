import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';

import  "./PersonalInfo.css";
import Input from "../shared/components/Input";
import {useForm} from "../shared/hooks/useForm";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../shared/util/validators";
import {AuthContext} from "../shared/context/auth-context";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const PersonalInfo = () => {

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
            fullName:{
                value:'',
                isValid:false
            },
            address:{
                value:'',
                isValid:false
            },
            city:{
                value:'',
                isValid:false
            },
            country:{
                value:'',
                isValid:false
            },
            email:{
                value:'',
                isValid:false
            },
            phone:{
                value:'',
                isValid:false
            },
        },
        false
    );

    const submitHandler = async () => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/resume/personalInfo/${auth.resumeId}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName:formState.inputs.fullName.value,
                    address:formState.inputs.address.value,
                    city:formState.inputs.city.value,
                    country:formState.inputs.country.value,
                    email:formState.inputs.email.value,
                    phone:formState.inputs.phone.value,
                })
            });

            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            history.push('/experience');
        }catch(err){
            console.log(err);
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
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

            <div className="myform">
                <h1>COMPLETE YOUR RESUME HEADING</h1>
                <p>Employers will use this information to contact you.</p>
            
                <form>
                    <Input
                        id="fullName" 
                        element="input"
                        type="text"
                        label="Full Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name"
                        onInput={inputHandler}
                    />
                    <Input
                        id="address" 
                        element="input"
                        type="text"
                        label="Address"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorText="Please enter a valid address"
                        onInput={inputHandler}
                    />
                    <Input
                        id="city" 
                        element="input"
                        type="text"
                        label="City"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid city name"
                        onInput={inputHandler}
                    />
                    <Input
                        id="country" 
                        element="input"
                        type="text"
                        label="Country"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid country name"
                        onInput={inputHandler}
                    />
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
                        id="phone" 
                        element="input"
                        type="text"
                        label="Phone No."
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorText="Please enter a valid phone no. of atleats 10 numbers."
                        onInput={inputHandler}
                    />
                </form>
                <button onClick={submitHandler}>Save & Next</button>
            </div>
        </React.Fragment>
    )
}

export default PersonalInfo;