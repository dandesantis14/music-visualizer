import {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function SignUpPage ({ user, setUser, trackList, setTrackList }) {

    const [signUpData, setSignUpData] = useState ({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    //Handle change to login form
    const handleChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.id]: e.target.value
        })
    }
    //Handle form submit
    const handleSubmit = (e) => {
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData),
        };
        e.preventDefault();
        fetch("/signup", configObj).then((resp) => {
            if (resp.ok){
                resp.json().then((user)=> {
                    return fetch(`/songs/index/${user.id}`)
                    .then(resp => resp.json())
                    .then(data => {
                            setTrackList(data)
                            setUser(user)
                            navigate("/")
                        })
                });
            } else {
                resp.json().then((errors) => {
                    console.error(errors);
                });
            }
        });
    };

    return (
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={(e)=>handleSubmit(e)}>
                Sign Up Form <br></br>
                <input
                    type="text"
                    id="email"
                    placeholder="email"
                    value={signUpData.email} 
                    onChange={(e)=>handleChange(e)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    value={signUpData.password}
                    onChange={(e)=>handleChange(e)}
                />
                <button type='submit'>Submit</button>
            <div> Have an account? <Link to="/">Sign in</Link></div>
            </form>
        </div>
    )
}

export default SignUpPage