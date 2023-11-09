import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-dark">
      <Link to="/" className="navbar-brand headingFont">
        <img src="https://styles.redditmedia.com/t5_2sk2o/styles/communityIcon_aqe0q87y5pd61.png" width="30" height="30" className="d-inline-block align-top mx-2" alt="icon" />
        ReadMe
      </Link>
    </nav>
  );
}

export default NavBar;