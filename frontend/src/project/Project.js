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

const Project = () => {
    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
            name:{
                value:'',
                isValid:false
            },
            description:{
                value:'',
                isValid:false
            },
            link:{
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
            const response = await fetch(`http://localhost:5000/api/resume/project/${auth.resumeId}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:formState.inputs.name.value,
                    description:formState.inputs.description.value,
                    link:formState.inputs.link.value
                })
            });

            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            history.push('/allProjects');
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
                <h1>PROJECT</h1>
                <p>Give the description of your project and link so that employers can see them.</p>
            
                <form>
                    <Input
                        id="name" 
                        element="input"
                        type="text"
                        label="Project Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid project name"
                        onInput={inputHandler}
                    />
                    <Input
                        id="description" 
                        element="input"
                        type="text"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter a valid description of minimum 8 characters."
                        onInput={inputHandler}
                    />
                    <Input
                        id="link" 
                        element="input"
                        type="text"
                        label="Project Link"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid link."
                        onInput={inputHandler}
                    />
                </form>
                <button onClick={submitHandler} disabled={!formState.isValid}>Save & Next</button>
            </div>
        </React.Fragment>
    )
}

export default Project;