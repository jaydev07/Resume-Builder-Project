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

const UpdateEducation = () => {

    const educationId = useParams().educationId;

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [education, setEducation] = useState();

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
            const response = await fetch(`http://localhost:5000/api/resume/updateEducation/${educationId}`,{
                method:'PATCH',
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


    useEffect(() => {
        
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/resume/geteducation/${educationId}`);
                const responseData = await response.json();
    
                if(responseData.message){
                    throw Error(responseData.message);
                }
                
                setFormData(
                    {
                        institute:{
                            value:responseData.education.institute,
                            isValid:true
                        },
                        city:{
                            value:responseData.education.city,
                            isValid:true
                        },
                        state:{
                            value:responseData.education.state,
                            isValid:true
                        },
                        degree:{
                            value:responseData.education.degree,
                            isValid:true
                        },
                        graduationDate:{
                            value:responseData.education.graduationDate,
                            isValid:true
                        }
                    },
                    true
                );

                setEducation(responseData.education);
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

            { !isLoading && education && (
                <div className="myform">

                    <h3>You are editing you {education.degree} degree of {education.institute} institute</h3>
                                    
                    <form>
                        <Input
                            id="institute" 
                            element="input"
                            type="text"
                            label="Institute"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid institute name"
                            onInput={inputHandler}
                            value={education.institute}
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
                            value={education.city}
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
                            value={education.state}
                            isValid={true}
                        />
                        <Input
                            id="degree" 
                            element="input"
                            type="text"
                            label="degree"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid degree."
                            onInput={inputHandler}
                            value={education.degree}
                            isValid={true}
                        />
                        <Input
                            id="graduationDate" 
                            element="input"
                            type="text"
                            label="Graduation Date"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid date."
                            onInput={inputHandler}
                            value={education.graduationDate}
                            isValid={true}
                        />
                    </form>
                    <button onClick={submitHandler} disabled={!formState.isValid}>Save & Next</button>
                </div>
            )}

        </React.Fragment>
    )
}

export default UpdateEducation;