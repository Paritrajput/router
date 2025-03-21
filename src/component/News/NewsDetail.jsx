// NewsDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewsDetail = () => {
  const [loading, setLoading] = useState(true);
  const extraTxt =
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure. On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains";
  const location = useLocation();
  const navigate = useNavigate();
  // const news = location.state?.news;
  const [news, setNews] = useState(location.state?.news);

  const [newsDataExtra, setNewsDataExtra] = useState(null);

  if (!news) {
    return <div>No news found</div>;
  }

  const [keywords, setKeywords] = useState(null);
  const [sort, setSort] = useState("publishedAt");

  const [categories, setCategories] = useState(news.categories);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchNews = async () => {
      // const apiKey = "088417053d41419586f076e7340e924e";
      const apiKey = "5b7cb32913d34adc947e946a1bbc8743";
      const url = `https://newsapi.org/v2/everything?q={${keywords}||${categories}}&language=${language}&sortBy=${sort}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
          setNewsDataExtra(data.articles.slice(0, 5));
        } else {
          setError("Failed to fetch news");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [news, keywords, categories]);
  const handleNewsClick = (selectedNews) => {
    setCategories(selectedNews.categories);
    // setKeywords(selectedNews.source.name);

    setNews(selectedNews);
    navigate(`/news/${selectedNews.title}`, { state: { news: selectedNews } });
  };
  if (loading) {
    return (
      <div className="flex w-full pt-5 items-center justify-center">
        <span>Loading...</span>
        <img src="loading.gif"></img>
      </div>
    );
  }

  return (
    <div className="news-detail">
      <div className=" w-full absolute bg-black h-60"></div>
      <img
        className="relative h-7 "
        src="/icons-back.png"
        onClick={() => navigate(-1)}
      />
      {/* <button
        onClick={() => navigate(-1)}
        className="back-button bg-red-700 z-6 relative justify-start flex p-1"
      ></button> */}
      <div className="relative">
        <div className="flex pl-3 justify-center">
          <h1 className="text-white absolute z-5 text-3xl font-bold">
            {news.title}
          </h1>
        </div>
        <div className="text-white flex ">
          {/* <div className="  max-sm:w-2/5 shadow-xl z-5 float-left relative bg-white mt-28 max-h-fit">
            {news.urlToImage && (
              <img
                src={news.urlToImage}
                alt={news.title}
                className="detail-image relative z-5 w-full  "
              />
            )}
            {!news.urlToImage && (
              <img
                src="/download.jpeg"
                alt={news.title}
                className="detail-image relative z-5 w-full  "
              />
            )}
            <div className="text-black pt-3">
              <h2 className="underline font-semibold">More Related To This</h2>
              {newsDataExtra && (
                <div className="divide-y divide-solid">
                  {newsDataExtra.map((news, index) => (
                    <div
                      key={index}
                      onClick={() => handleNewsClick(news)}
                      className="cursor-pointer flex py-1  max-sm:text-sm sm:p-2 items-center hover:bg-zinc-100 "
                    >
                      <img
                        src={news.urlToImage || "/download.jpeg"}
                        alt={news.title}
                        className=" h-10 w-10"
                      />
                      <p className="sm:p-2 text-black ">{news.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}
          <div className="  mt-24 sm:mt-20 ">
            <div className=" mt-10  text-start text-black  ">
              <div>
                <div className="  max-sm:w-1/2 w-2/5 shadow-xl z-5 float-left relative bg-white mr-3 sm:mr-5 max-h-fit">
                  {news.urlToImage && (
                    <img
                      src={news.urlToImage}
                      alt={news.title}
                      className="detail-image relative z-5 w-full  "
                    />
                  )}
                  {!news.urlToImage && (
                    <img
                      src="/download.jpeg"
                      alt={news.title}
                      className="detail-image relative z-5 w-full  "
                    />
                  )}
                  <div className="text-black pt-3">
                    <h2 className="underline font-semibold">
                      More Related To This
                    </h2>
                    {newsDataExtra && (
                      <div className="divide-y divide-solid">
                        {newsDataExtra.map((news, index) => (
                          <div
                            key={index}
                            onClick={() => handleNewsClick(news)}
                            className="cursor-pointer flex py-1  max-sm:text-sm sm:p-2 items-center hover:bg-zinc-100 "
                          >
                            <img
                              src={news.urlToImage || "/download.jpeg"}
                              alt={news.title}
                              className=" h-10 w-10"
                            />
                            <p className="sm:p-2 text-black ">{news.title}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative text-white  gap-2 sm:my-3 sm:p-2 flex max-md:flex-col w-auto justify-evenly">
                  <p className=" text-sm font-medium sm:text-md sl:text-lg  max-lg:hidden">
                    Author:
                    <strong className="font-light text-sm sm:text-md md:text-lg ">
                      {news.author || "Unknown"}
                    </strong>
                  </p>
                  <p className=" text-sm font-medium sm:text-md sl:text-lg">
                    Source:
                    <strong className="font-light text-sm sm:text-md md:text-lg ">
                      {news.source.name || "Unknown"}
                    </strong>
                  </p>
                  <p className=" text-sm font-medium sm:text-md sl:text-lg">
                    Published At:{" "}
                    <strong className="font-light text-sm sm:text-md md:text-lg">
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </strong>
                  </p>
                </div>
                <div className="sm:p-10 mt-5 p-3">
                  {`${news.content} + ${extraTxt}` || "No content available"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href={news.url} target="_blank" rel="noopener noreferrer">
          Read the full article
        </a>
      </div>
    </div>
  );
};

export default NewsDetail;
