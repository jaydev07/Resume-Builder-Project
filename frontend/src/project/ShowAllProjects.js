import React,{useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext} from "../shared/context/auth-context";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const ShowAllProjects = () => {

    const auth = useContext(AuthContext);

    const [projects, setProjects] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [change, setChange] = useState(false);

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/resume/project/${auth.resumeId}`);
                const responseData = await response.json();

                if(responseData.message){
                    throw Error(responseData.message);
                }

                setProjects(responseData.projects);
            }catch(err){
                console.log(err);
                setError(err);
            }
            setIsLoading(false);
        }
        
        sendRequest();
    },[change]);

    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    const deleteHandler = async (projectId) => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/resume/project/${projectId}`,{
                method:'DELETE'
            });

            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message)
            }
            setChange(prev => !prev);
        }catch(err){
            console.log(err);
            setError(err);
        }
        setIsLoading(false);
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

            <h1>PROJECTS</h1>
            <p>Add information about your projects.</p>
            
            { !isLoading && projects && (
                <React.Fragment>
                    {
                        projects.map(pro => {
                            return(
                                <div className="experience" key={pro.id}>
                                    <h5>{pro.name}</h5>
                                    <h6>{pro.description}</h6>
                                    <button>
                                        <Link to={`/project/${pro.id}`}>
                                            UPDATE
                                        </Link>
                                    </button>
                                    <button onClick={() => {deleteHandler(pro.id)}}>DELETE</button>
                                </div>
                            )
                        })
                    }

                    <button>
                        <Link to="/new/project" >
                            ADD ANOTHER PROJECT
                        </Link>
                    </button>

                    <button>
                        <Link to="" >
                            Next
                        </Link>
                    </button>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default ShowAllProjects;