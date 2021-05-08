import React from 'react';
import {Link} from 'react-router-dom';

import "./ExperienceTips.css";

const ExperienceTips = () => {
    return(
        <React.Fragment>
            <div className="mycontainer">
                <h1>TIPS FOR YOUR EXPERIENCE SECTION</h1>
                <p>Your most recent or current job should be listed first. Then, work in reverse chronological order, from your newest to your oldest jobs.</p>
                <p>When describing your job duties, avoid using personal pronouns like “I, ” “me”, "my" etc.</p>
                <p>Showcase your skills by using strong action verbs (“led,” “organized”, "coordinated"). Use figures to add value when possible. For example: "decreased production costs by 20%".</p>
                <p>Use bullet points to list your job responsibilities in short, direct sentences.</p>

                <button>
                    <Link to="/new/experience">
                        Next
                    </Link>
                </button>
            </div>
        </React.Fragment>
    )
}

export default ExperienceTips;