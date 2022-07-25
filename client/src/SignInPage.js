import { useState } from "react";
import { Link } from "react-router-dom";


function SignInPage({ user, setUser, trackList, setTrackList }) {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    //Handle change to login form
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
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
            body: JSON.stringify(loginData),
        };
        e.preventDefault();
        fetch("/login", configObj).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    return fetch(`/songs/index/${user.id}`)
                    .then(resp => resp.json())
                    .then(data => {
                        setTrackList(data)
                        setUser(user)
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
        <div className="sign-in-container">
            <form className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
                Sign In Form<br></br>
                <input
                    type="text"
                    id="email"
                    placeholder="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="submit"
                    className="submit"
                    value="Sign In"
                />
            <div> Need an account? <Link to="/signup">Sign up now</Link></div>
            </form>
        </div>
    )
}

export default SignInPage