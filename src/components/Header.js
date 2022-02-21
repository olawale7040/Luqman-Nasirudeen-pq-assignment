import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="brand-wrap">
            <div>
              <span className="material-icons">find_replace</span>
            </div>
            <div className="brand-name">CurrencyExchange</div>
          </div>
          <div className="navigation">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div className="navigation-item">Currency Converter</div>
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div className="navigation-item">View Conversion History</div>
            </NavLink>
          </div>
          <div className="logout-link">logout</div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
