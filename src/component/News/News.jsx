import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./News.css";
import { UserContext } from "../../Context/userContext";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [sort, setSort] = useState("publishedAt");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sorting = [
    { name: "publishedAt" },
    { name: "popularity" },
    { name: "relevancy" },
  ];
  const [categories, setCategories] = useState("general");
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
      const url = `${import.meta.env.VITE_API_URL}/api/news?q=${
        keywords || categories
      }&language=${language}&sortBy=${sort}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setNewsData(data.articles);
        } else {
          setError(data.error || "Failed to fetch news");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [keywords, sort, categories, language]);

  if (error) {
    return (
      <>
        <div className="text-center flex flex-col gap-5 justify-center p-5 m-3">
          <div>Error fetching news: {error}</div>
          <img className="h-44 w-auto m-auto" src="404img.png" />
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="flex w-full pt-5 items-center justify-center">
        <span>Loading...</span>
        <img src="loading.gif"></img>
      </div>
    );
  }

  return (
    <>
      <div>
        <div
          className={`${
            theme === "light" ? "bg-black" : "bg-black "
          } flex z-10 flex-col-reverse text-white sticky top-24 sl:top-20 md:top-16 pt-4 pb-1 pr-3 `}
        >
          <div className="flex justify-between">
            <div className="p-2  ml-2 mr-2 flex md:overflow-visible overflow-scroll gap-3">
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
                  className={`${
                    categories == category
                      ? "bg-stone-800 text-white"
                      : "bg-transparent"
                  } bg-red-500  hover:bg-stone-800 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
                  type="button"
                  key={category}
                  value={category}
                  onClick={() => setCategories(category)}
                />
              ))}
            </div>
          </div>
          <div className="flex h-full pt-5 md:pb-2 top-0 absolute items-start right-5 ml:items-end justify-end ">
            {/* <div className="font-semibold">Search</div> */}
            <input
              className="sm:h-10 h-8 rounded-xl w-24 sm:w-32 text-black border sl:w-44 p-2 border-black"
              type="search"
              placeholder="Search"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="flex justify-start p-1 gap-3 sl:gap-9 md:gap-11 pl-5">
            <div className="flex items-center justify-start sl:justify-end">
              <div className="font-semibold  hidden sl:contents text-white ">
                Sort By
              </div>
              <select
                className="sm:h-10 h-8 rounded-xl  text-gray-400 border p-0 w-20 sm:w-auto sm:p-2  pb-0 pt-0 border-black"
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
              <div className="font-semibold hidden sl:contents">Language</div>
              <select
                className="sm:h-10 h-8 rounded-xl text-gray-400 border  p-0 w-20 sm:w-auto sm:p-2 pb-0 pt-0 border-black"
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
        <div className=" flex flex-col items-center p-1 sm:p-5">
          {newsData && (
            <div className="news-cards">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  className="news-card"
                  onClick={() =>
                    navigate(`/news/${index}`, { state: { news } })
                  }
                >
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
                  <div className="text-start pl-1 sm:pl-3 ">
                    <div className="text-md sm:text-xl md:text-2xl">
                      {news.title}
                    </div>
                    <p className="hidden md:contents">
                      {news.description || "No description available"}
                    </p>
                    {/* <Link
                      to={`/news/${index}`}
                      state={{ news }} 
                    >
                      View full article
                    </Link> */}
                    <div className="flex justify-start gap-1 sm:gap-5 md:gap-10 mb-0 mb-0">
                      <p className=" text-sm font-medium sm:text-md sl:text-lg  max-sm:hidden">
                        Author:
                        <strong className="font-light text-sm sm:text-md sl:text-lg ">
                          {news.author || "Unknown"}
                        </strong>
                      </p>
                      <p className=" text-sm font-medium sm:text-md sl:text-lg">
                        Source:
                        <strong className="font-light text-sm sm:text-md sl:text-lg ">
                          {news.source.name || "Unknown"}
                        </strong>
                      </p>
                      <p className=" text-sm font-medium sm:text-md sl:text-lg">
                        Published At:{" "}
                        <strong className="font-light text-sm sm:text-md sl:text-lg">
                          {new Date(news.publishedAt).toLocaleDateString()}
                        </strong>
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
