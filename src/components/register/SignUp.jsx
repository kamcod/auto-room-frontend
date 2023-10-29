import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../assets/styles/register.css";
import axios from "axios";
import AppConfig from "../../utils/AppConfig";

export default function SignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [error, setError] = useState({name: '', email: '', singleError: ''});

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const registerUser = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError({name: '', email: '', singleError: ''});
        if(username.length < 3){
            setError({
                name: 'Minimum 3 characters are allowed!',
                email: '',
                singleError: ''
            });
            setIsLoading(false);
            return;
        }
        let regex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regex.test(email)){
            setError({
                name: '',
                email: 'Invalid Email!',
                singleError: ''
            })
            setIsLoading(false);
            return;
        }
        axios.post(AppConfig.apis.registerUser, {
            name: username,
            email
        })
            .then(res => {
                if(res.status === 201) {
                    setIsLoading(false);
                    setEmail('');
                    setUsername('');
                    navigate("/confirmation", { replace: true });
                }
            })
            .catch (err => {
                setIsLoading(false);
                console.log("error", err);
            })
    }

    return(
        <div>
            <div className="register-page-title">
                <h1> Welcome to The Auto Room</h1>
                <p>Join <b>Auto Room</b> - easy to use and user friendly <br />
                    Explore new car models. </p>
            </div>

            <div className="register-page-wrapper">
                <div className="sidebar">
                </div>
                <div className="formBar">
                    <h2>Create A New Account</h2>
                    <form className="form" onSubmit={registerUser} method="post">
                        <label htmlFor="name">Name: </label> <br />
                        <input type="text" id="name" name="name" value={username} maxLength="30" onChange={onChangeUsername} required/>
                        <div style={{fontSize: '12px', color: 'red'}}><b>{error.name}</b></div>
                        <br />
                        <label htmlFor="email">Email: </label> <br />
                        <input type="text" id="email" name="email" value={email} onChange={onChangeEmail} required/>
                        <div style={{fontSize: '12px', color: 'red'}}><b>{error.email}</b></div>
                        <div style={{fontSize: '12px', color: 'red'}}><b>{error.singleError}</b></div>
                        <br /> <br />
                        <br /> <br />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'loading...' : 'Register'}
                        </button>
                    </form>
                    <br />
                    Already have an account? <Link to='/login'>Login</Link> here
                </div>
            </div>
        </div>
    )
}
