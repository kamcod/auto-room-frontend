import {Link} from "react-router-dom";

export default function Confirmation(){
    return (
        <div>
            <div>
                <h2>Your Account has been successfully created!</h2>
                <br />
                <p>We sent you an email, please see your inbox</p>
                <p><Link to="/login">Go to login page</Link></p>
            </div>
        </div>
    )
}
