import  { useState } from 'react';
import './search.css';

function Search({ setUsername }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(input.trim()); 
        setInput(''); // Clear input after user has submitted the input//
  };

  return (
    <header className='header-content-items'>
      <div className='header-title'>
        <h2>GitHub Finder</h2>
      </div>
      <div className='header-subtitle'>
        <p>
          By <a href="https://github.com/1vonn" target="_blank" rel="noopener noreferrer">Evyonn Mwangi</a>
        </p>
      </div>
      <div className='search-form'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}

export default Search;
