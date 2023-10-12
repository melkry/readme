import './portal.css';
import { useDispatch } from 'react-redux';

function Portal() {
    const dipatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = document.getElementById('usernameInput').value;
        dispatch()
    }

    return (
        <div id="portal" className="mt-5 container text-center">
            <h2>Reddit User Statistics</h2>
            <p>Enter a reddit username below to get started!</p>
            <form>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <label for="usernameInput">r/</label>
                    <input type="text" className="form-control w-25 mx-2" id="usernameInput" aria-describedby="usernameHelp" placeholder="username" />
                </div>
                <button type="submit" className="btn btn-outline-warning m-3">Submit</button>
            </form>
        </div>
    );
}

export default Portal;