import React,{useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';

import Input from "../shared/components/Input";
import {useForm} from "../shared/hooks/useForm";
import {
    VALIDATOR_REQUIRE
} from "../shared/util/validators";
import {AuthContext} from "../shared/context/auth-context";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const Education = () => {
    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
            institute:{
                value:'',
                isValid:false
            },
            city:{
                value:'',
                isValid:false
            },
            state:{
                value:'',
                isValid:false
            },
            degree:{
                value:'',
                isValid:false
            },
            graduationDate:{
                value:'',
                isValid:false
            }
        },
        false
    );

    const submitHandler = async () => {
        console.log(auth.resumeId);
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/resume/education/${auth.resumeId}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    institute:formState.inputs.institute.value,
                    city:formState.inputs.city.value,
                    state:formState.inputs.state.value,
                    degree:formState.inputs.degree.value,
                    graduationDate:formState.inputs.graduationDate.value
                })
            });

            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            history.push('/allEducations');
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
                <h1>EDUCATION</h1>
                <p>Add information about your educational background.</p>
            
                <form>
                    <Input
                        id="institute" 
                        element="input"
                        type="text"
                        label="Institute"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid institute name"
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
                        id="state" 
                        element="input"
                        type="text"
                        label="State"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid state name"
                        onInput={inputHandler}
                    />
                    <Input
                        id="degree" 
                        element="input"
                        type="text"
                        label="degree"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid degree."
                        onInput={inputHandler}
                    />
                    <Input
                        id="graduationDate" 
                        element="input"
                        type="text"
                        label="Graduation Date"
                        placeholder="03/05/2020"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid date."
                        onInput={inputHandler}
                    />
                </form>
                <button onClick={submitHandler} disabled={!formState.isValid}>Save & Next</button>
            </div>
        </React.Fragment>
    )
}

export default Education;