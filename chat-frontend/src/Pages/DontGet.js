import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const DontGet = pros => {
    const history = useHistory()
    
    return (
        useEffect(() => { //This is for not going Login & Register for logined  user
            const token = localStorage.getItem("Token");
            if (!token) history.push("/login")
          }, [0])
    )
}

export default DontGet