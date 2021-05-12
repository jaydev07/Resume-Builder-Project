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

const UpdateProject = () => {

    const projectId = useParams().projectId;
    console.log(useParams().projectId);
    console.log("ProjectID is",projectId);

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [project, setProject] = useState();

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
            const response = await fetch(`http://localhost:5000/api/resume/updateProject/${projectId}`,{
                method:'PATCH',
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


    useEffect(() => {
        
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/resume/getproject/${projectId}`);
                const responseData = await response.json();
    
                if(responseData.message){
                    throw Error(responseData.message);
                }
                
                setFormData(
                    {
                        name:{
                            value:responseData.project.name,
                            isValid:true
                        },
                        description:{
                            value:responseData.project.description,
                            isValid:true
                        },
                        link:{
                            value:responseData.project.link,
                            isValid:true
                        }
                    },
                    true
                );

                setProject(responseData.project);
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

            { !isLoading && project && (
                <div className="myform">

                    <h3>You are editing you {project.name} project</h3>
                                    
                    <form>
                        <Input
                            id="name" 
                            element="input"
                            type="text"
                            label="Project Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid project name"
                            onInput={inputHandler}
                            value={project.name}
                            isValid={true}
                        />
                        <Input
                            id="description" 
                            element="input"
                            type="text"
                            label="Description"
                            validators={[VALIDATOR_MINLENGTH(8)]}
                            errorText="Please enter a valid description of minimum 8 characters."
                            onInput={inputHandler}
                            value={project.description}
                            isValid={true}
                        />
                        <Input
                            id="link" 
                            element="input"
                            type="text"
                            label="Project Link"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid link."
                            onInput={inputHandler}
                            value={project.link}
                            isValid={true}
                        />
                    </form>
                    <button onClick={submitHandler} disabled={!formState.isValid}>Save & Next</button>
                </div>
            )}

        </React.Fragment>
    )
}

export default UpdateProject;