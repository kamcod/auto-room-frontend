import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppConfig from "../../utils/AppConfig";
import Spinner from "react-bootstrap/Spinner";

export default function SignIn(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState({email: '', password: '', singleError: ''});

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePasswd = (e) => {
        setPassword(e.target.value)
    }
    const loginUser = (e) => {
        e.preventDefault();
        setError({email: '', password: '', singleError: ''});
        setIsLoading(true);
        if(password.length < 8){
            setError({
                password: 'Minimum 8 characters are allowed!',
                email: '',
                singleError: ''
            });
            setIsLoading(false);
            return;
        }
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regex.test(email)){
            setError({
                password: '',
                email: 'Invalid Email!',
                singleError: ''
            })
            setIsLoading(false);
            return;
        }
        axios.defaults.withCredentials = true;
        axios.post(AppConfig.apis.loginUser, {
            email,
            password
        })
            .then(res => {
                if(res.status === 200) {
                    setIsLoading(false);
                    setEmail('');
                    setPassword('');
                    navigate("/dashboard", { replace: true });
                }
            })
            .catch(err => {
                setError({email: '', password: '', singleError: ''});
                setIsLoading(false);
                const {status, data} = err.response;
                if(status === 500){
                    if(data.status === 1000) {
                        setError({
                            password: '',
                            email: '',
                            singleError: data.message
                        })
                    }
                }
                console.log("error", err);
            })
    };

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(AppConfig.apis.getDashboardStats)
            .then(res => {
                if(res.status === 200){
                    navigate("/dashboard", {replace: true});
                }
            })
            .catch(err => console.log("error", err))
    }, []);

    return(
        <div>
            <div className="register-page-title">
                <h1> Welcome to The Auto Room</h1>
            </div>
            <div className="register-page-wrapper">
                <div className="sidebar">
                </div>
                <div className="formBar">
                    <h2>Sign In</h2>
                    <form className="form" onSubmit={loginUser}>

                        <label htmlFor="email">Email: </label> <br />
                        <input type="text" id="email" name="email" value={email} onChange={onChangeEmail} required/>
                        <div style={{fontSize: '12px', color: 'red'}}><b>{error.email}</b></div>
                        <br />
                        <label htmlFor="passwd">Password: </label> <br />
                        <input type="password" id="passwd" name="password" value={password} onChange={onChangePasswd} required/>
                        <div style={{fontSize: '12px', color: 'red'}}><b>{error.password}</b></div>
                        <div style={{fontSize: '12px', color: 'red'}}><b>{error.singleError}</b></div>
                        <br />
                        <button type="submit">
                            {isLoading  ? <Spinner animation="border" size="sm" /> : 'Login' }
                        </button>
                    </form>
                    <br />
                    Don't have an account? Click here to <Link to='/register'>register</Link>
                </div>
            </div>
        </div>
    )
}
