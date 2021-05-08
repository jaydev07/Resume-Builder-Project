import React,{useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';

import Input from "../shared/components/Input";
import {useForm} from "../shared/hooks/useForm";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../shared/util/validators";
import {AuthContext} from "../shared/context/auth-context";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const Experience = () => {
    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
            company:{
                value:'',
                isValid:false
            },
            jobTitle:{
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
            startDate:{
                value:'',
                isValid:false
            },
            endDate:{
                value:'',
                isValid:false
            },
            jobDescription:{
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
            const response = await fetch(`http://localhost:5000/api/resume/experience/${auth.resumeId}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company:formState.inputs.company.value,
                    jobTitle:formState.inputs.jobTitle.value,
                    city:formState.inputs.city.value,
                    state:formState.inputs.state.value,
                    startDate:formState.inputs.startDate.value,
                    endDate:formState.inputs.endDate.value,
                    jobDescription:formState.inputs.jobDescription.value,
                })
            });

            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            history.push('/allExperiences');
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
                <h1>EXPERIENCE</h1>
                <p>List your work experience, from the most recent to the oldest.</p>
            
                <form>
                    <Input
                        id="company" 
                        element="input"
                        type="text"
                        label="Company"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid company name"
                        onInput={inputHandler}
                    />
                    <Input
                        id="jobTitle" 
                        element="input"
                        type="text"
                        label="Job Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid job title."
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
                        id="startDate" 
                        element="input"
                        type="text"
                        label="Start Date"
                        placeholder="Eg: 02/10/2020"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter a valid date"
                        onInput={inputHandler}
                    />
                    <Input
                        id="endDate" 
                        element="input"
                        type="text"
                        label="End Date"
                        placeholder="Eg: Currently working"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter a valid date."
                        onInput={inputHandler}
                    />
                    <Input
                        id="jobDescription" 
                        element="textarea"
                        type="text"
                        label="Job Description"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorText="Please enter the job description of atleast 10 characters."
                        onInput={inputHandler}
                    />
                </form>
                <button onClick={submitHandler}>Save & Next</button>
            </div>
        </React.Fragment>
    )
}

export default Experience;