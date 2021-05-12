import React,{useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext} from "../shared/context/auth-context";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const ShowAllEducations = () => {

    const auth = useContext(AuthContext);

    const [educations, setEducations] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [change, setChange] = useState(false);

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/resume/education/${auth.resumeId}`);
                const responseData = await response.json();

                if(responseData.message){
                    throw Error(responseData.message);
                }

                setEducations(responseData.education);
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

    const deleteHandler = async (educationId) => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/resume/education/${educationId}`,{
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

            <h1>EDUCATION</h1>
            <p>Add information about your educational background.</p>
            
            { !isLoading && educations && (
                <React.Fragment>
                    {
                        educations.map(edu => {
                            return(
                                <div className="experience" key={edu.id}>
                                    <h5>{edu.institute}</h5>
                                    <h6>{edu.degree}, {edu.graduationDate}</h6>
                                    <button>
                                        <Link to={`/education/${edu.id}`}>
                                            UPDATE
                                        </Link>
                                    </button>
                                    <button onClick={() => {deleteHandler(edu.id)}}>DELETE</button>
                                </div>
                            )
                        })
                    }

                    <button>
                        <Link to="/new/education" >
                            ADD ANOTHER DEGREE
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

export default ShowAllEducations;