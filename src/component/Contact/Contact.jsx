import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./News.css";
import { UserContext } from "../../Context/userContext";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [sort, setSort] = useState("publishedAt");
  const sorting = [
    { name: "publishedAt" },
    { name: "popularity" },
    { name: "relevancy" },
  ];
  const [categories, setCategories] = useState("science");
  const [language, setLanguage] = useState("en");

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Chinese", value: "zh" },
    { label: "Russian", value: "ru" },
    { label: "Arabic", value: "ar" },
    { label: "Italian", value: "it" },
  ];
  const { theme } = useContext(UserContext);

  useEffect(() => {
    const fetchNews = async () => {
      // const apiKey = "088417053d41419586f076e7340e924e";
      const apiKey = "5b7cb32913d34adc947e946a1bbc8743";
      const url = `https://newsapi.org/v2/everything?q={${keywords}||${categories}}&language=${language}&sortBy=${sort}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
          setNewsData(data.articles);
        } else {
          setError("Failed to fetch news");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, [keywords, sort, categories, language]);

  if (error) {
    return <div>Error fetching news: {error}</div>;
  }

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-black text-white"
          } flex z-10 flex-col-reverse sticky top-16 pt-2 pr-3 `}
        >
          <div className="flex justify-between">
            <div className="p-2 ml-2 mr-2 flex flex-wrap gap-3">
              {[
                "general",
                "business",
                "entertainment",
                "health",
                "science",
                "sports",
                "technology",
              ].map((category) => (
                <input
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  key={category}
                  value={category}
                  onClick={() => setCategories(category)}
                />
              ))}
            </div>
            <div className="flex items-center">
              <div className="font-semibold">Search</div>
              <input
                className="h-10 rounded-xl text-black border p-3 border-black"
                type="search"
                placeholder="Search"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-start p-1 gap-11 pl-5">
            <div className="flex items-center justify-end">
              <div className="font-semibold">Sort By</div>
              <select
                className="h-10 rounded-xl text-black border p-3 pb-0 pt-0 border-black"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sorting.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <div className="font-semibold">Select Language</div>
              <select
                className="h-10 rounded-xl text-black border p-3 pb-0 pt-0 border-black"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="news-container">
          {newsData && (
            <div className="news-cards">
              {newsData.map((news, index) => (
                <div key={index} className="news-card">
                  {news.urlToImage && (
                    <img
                      src={news.urlToImage}
                      alt={news.title}
                      className="news-image"
                    />
                  )}
                  {!news.urlToImage && (
                    <img
                      src="download.jpeg"
                      alt={news.title}
                      className="news-image"
                    />
                  )}
                  <div className="text-start pl-3">
                    <h2>{news.title}</h2>
                    <p>{news.description || "No description available"}</p>
                    <Link
                      to={`/news/${index}`}
                      state={{ news }} // pass the news object as state
                    >
                      View full article
                    </Link>
                    <div className="flex justify-start gap-10 mb-0 mb-0">
                      <p>
                        <strong>Author:</strong> {news.author || "Unknown"}
                      </p>
                      <p>
                        <strong>Source:</strong> {news.source.name || "Unknown"}
                      </p>
                      <p>
                        <strong>Published At: </strong>
                        {new Date(news.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsComponent;
