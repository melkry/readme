import './portal.css';
import { useDispatch} from 'react-redux';
import { getComments } from "../../features/comments/commentsSlice";
import { useNavigate } from "react-router-dom";

function Portal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = document.getElementById('usernameInput').value;
        dispatch(getComments(search));
        navigate("results", { replace: false });
    }

    return (
        <div id="portal" className="mt-5 container text-center">
            <h2>Reddit User Statistics</h2>
            <p>Enter a reddit username below to get started!</p>
            <form>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <label htmlFor="usernameInput">u/</label>
                    <input type="text" className="form-control mx-2" id="usernameInput" aria-describedby="usernameHelp" placeholder="username" />
                </div>
                <button type="submit" className="btn btn-outline-warning m-3" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Portal;