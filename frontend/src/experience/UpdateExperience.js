import React,{useContext,useState,useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';

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

const UpdateExperience = () => {

    const experienceId = useParams().experienceId;

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [experience, setExperience] = useState();

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
                method:'PATCH',
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


    useEffect(() => {
        
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/resume/getexperience/${experienceId}`);
                const responseData = await response.json();
    
                if(responseData.message){
                    throw Error(responseData.message);
                }
                
                setFormData(
                    {
                        company:{
                            value:responseData.experience.company,
                            isValid:true
                        },
                        jobTitle:{
                            value:responseData.experience.jobTitle,
                            isValid:true
                        },
                        city:{
                            value:responseData.experience.city,
                            isValid:true
                        },
                        state:{
                            value:responseData.experience.state,
                            isValid:true
                        },
                        startDate:{
                            value:responseData.experience.startDate,
                            isValid:true
                        },
                        endDate:{
                            value:responseData.experience.endDate,
                            isValid:true
                        },
                        jobDescription:{
                            value:responseData.experience.jobDescription,
                            isValid:true
                        }
                    },
                    true
                );

                setExperience(responseData.experience);
            }catch(err){
                console.log(err);
                setError(err);
            }
            setIsLoading(false);
        }
        sendRequest();
    },[]);

    return(
        <React.Fragment>

            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}

            { !isLoading && experience && (
                <div className="myform">

                    <h1>You are editing you {experience.jobTitle} post of {experience.company} company</h1>
                                    
                    <form>
                        <Input
                            id="company" 
                            element="input"
                            type="text"
                            label="Company"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid company name"
                            onInput={inputHandler}
                            value={experience.company}
                            isValid={true}
                        />
                        <Input
                            id="jobTitle" 
                            element="input"
                            type="text"
                            label="Job Title"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid job title."
                            onInput={inputHandler}
                            value={experience.jobTitle}
                            isValid={true}
                        />
                        <Input
                            id="city" 
                            element="input"
                            type="text"
                            label="City"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid city name"
                            onInput={inputHandler}
                            value={experience.city}
                            isValid={true}
                        />
                        <Input
                            id="state" 
                            element="input"
                            type="text"
                            label="State"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid state name"
                            onInput={inputHandler}
                            value={experience.state}
                            isValid={true}
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
                            value={experience.startDate}
                            isValid={true}
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
                            value={experience.endDate}
                            isValid={true}
                        />
                        <Input
                            id="jobDescription" 
                            element="textarea"
                            type="text"
                            label="Job Description"
                            validators={[VALIDATOR_MINLENGTH(10)]}
                            errorText="Please enter the job description of atleast 10 characters."
                            onInput={inputHandler}
                            value={experience.jobDescription}
                            isValid={true}
                        />
                    </form>
                    <button onClick={submitHandler}>Save & Next</button>
                </div>
            )}

        </React.Fragment>
    )
}

export default UpdateExperience;