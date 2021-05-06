import {createContext} from 'react';

export const AuthContext = createContext({
    isLogedIn:false,
    userId:null,
    resumeId:null,
    login: () => {},
    logout: () => {},
    setResumeId: () => {}
});