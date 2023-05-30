import React from 'react';
import { useState } from 'react';
import './App.css';
import Commits from './components/Commits';
import Repos from './components/Repos';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
    <div className='App'>
      <h1>Search for a GitHub organization</h1>
      <div>
        <div>
        <header className='App-header'>
          <form>
            <div>
              <label htmlFor="githubOrgSearch" hidden>
                Search for GitHub organization
              </label>
              <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  id="githubOrgSearch"
                  aria-describedby="githubOrgSearch"
                  placeholder="Search for a GitHub Organization"
                />
            </div>
            <button className="btn btn-primary">
              Search
            </button>
          </form>
          <br/>
              <Link className='showlink' to='/repos/1'>
                Netflix Repos
              </Link>
            <Link className='showlink' to='/'>
            Home
          </Link>
         </header>
        </div>
      </div>
      <Routes>
          <Route eaxct path='/' element={<Home />} />
          <Route eaxct path='/repos/:pagenum' element={<Repos />} />
          <Route eaxct path='/commits/:repoName/:pagenum' element={<Commits />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
