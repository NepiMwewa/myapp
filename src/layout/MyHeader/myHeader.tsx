import { SiteManager } from '../../siteManager';
import { NavButton } from '../../components/NavButton/NavButton';
import { Outlet, Link } from "react-router-dom";
//https://www.youtube.com/watch?v=TNhaISOUy6Q

export function MyHeader({title}: {title?: string;}){
  return (
    <header>
      <img className='img-logo' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="logo"/>
      <h1>{title || SiteManager.getTitle()}</h1>

      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link to="/">Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className='nav-item'>
              <Link to="/contact">Contact</Link> 
            </li>
          </ul>
        </div>
      </nav>
      
    </header>
  );
}
        