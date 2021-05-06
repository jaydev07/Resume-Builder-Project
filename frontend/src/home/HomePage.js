import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';

import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import {AuthContext} from "../shared/context/auth-context";

const HomePage = () => {

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [error,setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // const [submit, setSubmit] = useState(false);

    const createResumeHandler = async () => {
        setIsLoading(true);
        try{
            const response = await fetch("http://localhost:5000/api/resume/",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId:auth.userId
                })
            });

            const responseData = await response.json();

            if(responseData.message){
                throw Error(responseData.message);
            }
            auth.setResumeId(responseData.resume.id);

            history.push("/personalInfo");
        }catch(err){
            console.log(err);
            setError(err.message || 'Something went wrong!');
        }
    }

    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    return(
        <React.Fragment>

            {/* { submit && <Redirect to="/personalInfo" />} */}
            
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}

            { isLoading && <LoadingSpinner asOverlay />}

            <h1>BUILD YOUR RESUME IN JUST 3 STEPS</h1>
            <h3>Choose a professional resume template</h3>
            <h3>Enter your details and other information</h3>
            <h3>Download your resume & start impressing employers</h3>
            <button onClick={createResumeHandler}>
                START BUILDING RESUME
            </button>
        </React.Fragment>
    )
}

export default HomePage;