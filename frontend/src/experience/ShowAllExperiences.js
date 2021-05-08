import React,{useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom';

import "./ShowAllExperiences.css";
import {AuthContext} from "../shared/context/auth-context";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const ShowAllExperiences = () => {

    const auth = useContext(AuthContext);

    const [experiences, setExperiences] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [change, setChange] = useState(false);

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/resume/experience/${auth.resumeId}`);
                const responseData = await response.json();

                if(responseData.message){
                    throw Error(responseData.message);
                }

                setExperiences(responseData.experiences);
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

    const deleteHandler = async (experienceId) => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/resume/experience/${experienceId}`,{
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

            <h1>EXPERIENCE</h1>
            <p>List your work experience, from the most recent to the oldest.</p>
            
            { !isLoading && experiences && (
                <React.Fragment>
                    {
                        experiences.map(exp => {
                            return(
                                <div className="experience" key={exp.id}>
                                    <h5>{exp.company}</h5>
                                    <p>{exp.state}, {exp.city}</p>
                                    <h6>{exp.jobTitle}, {exp.startDate}-{exp.endDate}</h6>
                                    <button>
                                        <Link to={`/experience/${exp.id}`}>
                                            UPDATE
                                        </Link>
                                    </button>
                                    <button onClick={() => {deleteHandler(exp.id)}}>DELETE</button>
                                </div>
                            )
                        })
                    }

                    <button>
                        <Link to="/new/experience" >
                            ADD ANOTHER POSITION
                        </Link>
                    </button>

                    <button>
                        <Link to="/projectTips" >
                            Next
                        </Link>
                    </button>
                </React.Fragment>
            )}
            
            

        </React.Fragment>
    )
}

export default ShowAllExperiences;