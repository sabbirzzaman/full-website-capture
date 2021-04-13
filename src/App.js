import react, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_KEY = "a3b54baad7684adf90903bc45bd697b3";
  const [search, setSearch] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;

  const getScreenshot = async () => {
    setSearch("");
    setError(false);
    setLoading(true);
    const responce = await fetch(URL);
    if (responce.ok) {
      setImg(responce);
      setLoading(false);
    } else {
      setError(true);
    }
  };
  const searchScreenshot = (e) => {
    e.preventDefault();
    getScreenshot();
  };

  useEffect(() => {
    setSearch("");
    getScreenshot();
  }, []);

  return (
    <div className="App">
      <nav>
        <div className="container">
          <form onSubmit={searchScreenshot}>
            <input
              placeholder="Enter URL"
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Caputure</button>
          </form>
        </div>
      </nav>

      <div className="hero">
        {!loading && !error ? (
          <div className="container">
            {img && (
              <a href={img.url} target="_blank">
                <img src={img.url} alt="background" />
              </a>
            )}
          </div>
        ) : !error && loading ? (
          <div className="loading"></div>
        ) : error ? (
          <div className="container">
            <h2>Please Enter a Valid URL to take Screenshot</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
