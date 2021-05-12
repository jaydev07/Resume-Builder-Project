import React from 'react';
import {Link} from 'react-router-dom';

const ProjectTips = () => {
    return(
        <React.Fragment>
            <div className="mycontainer">
                <h1>TIPS FOR YOUR PROJECT SECTION</h1>
                <p>Mention the projects that you have completed.</p>
                <p>Give the description of your project and link so that employers can see them.</p>
 
                <button>
                    <Link to="/new/project">
                        Next
                    </Link>
                </button>
            </div>
        </React.Fragment>
    )
}

export default ProjectTips;