import React from 'react';
import {Link} from 'react-router-dom';

const EducationTips = () => {
    return(
        <React.Fragment>
            <div className="mycontainer">
                <h1>TIPS FOR YOUR EDUCATION SECTION</h1>
                <p>Start off by listing your degrees from most recent to oldest.</p>
                <p>If you have still not graduated, list the date you expect to graduate.</p>
                <p>High school graduation shouldn’t be mentioned on your resume unless you haven’t gone to college</p>
                <p>Mention any scholarships, honors, awards, and professional certifications you have earned</p>

                <button>
                    <Link to="/new/education">
                        Next
                    </Link>
                </button>
            </div>
        </React.Fragment>
    )
}

export default EducationTips;