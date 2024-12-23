import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mx-0 w-full ">
      <aside className="relative overflow-hidden text-white bg-black h-fit mx-0 ">
        <img
          src="fake-news.jpg"
          className="w-full h-full absolute opacity-40"
        ></img>
        <div className="relative p-8 sm:p-16 lg:w-1/2  h-fit bg-transparent backdrop-blur-ssm">
          <p className="text-5xl max-sm:text-2xl mb-2 font-extrabold">
            Welcome to YourVoiceHub
          </p>
          <p className="text-xl max-sm:text-md mb-2">
            your interactive space for news and creativity! Stay updated with
            the latest stories and trends, or unleash your imagination by
            creating your own blogs. Whether you're here to read, share, or
            connect, we've got something for everyone. Dive in, explore, and let
            your voice be heard!{" "}
          </p>

          <div className="flex p-1 sm:mt-1  space-y-8 text-start sm:text-right sm:ml-auto">
            <Link
              className="inline-flex text-white items-center px-2 py-1 lg:px-4 lg:py-2 font-medium bg-orange-700 rounded-lg hover:opacity-75"
              to="/"
            >
              {/* <svg
                fill="white"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
              </svg> */}
              Explore
              <img
                width="32"
                height="32"
                src="arrow.png"
                alt="arrow--v1"
                className="1"
              />
            </Link>
          </div>
        </div>
      </aside>

      <div className="  place-items-center sm:mt-10 text-start">
        <div className="text-3xl font-extrabold text-gray-900 sm:text-4xl p-2 ml-7 w-full flex justify-start ">
          <span>Explore</span>
        </div>
        <ul>
          <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
            <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1  sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <img
                  className="rounded-t-lg"
                  src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
                  alt="Hollywood Sign on The Hill"
                />
              </a>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  Get the latest news from worldwide
                </h5>
                <p className="mb-4 text-base">
                  Keep your knowlodge up to date . We have large collection of
                  news from every corner of world in various languages.
                </p>
              </div>
            </div>
            <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1  sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <img
                  className="rounded-t-lg"
                  src="https://tecdn.b-cdn.net/img/new/standard/city/042.webp"
                  alt="Palm Springs Road"
                />
              </a>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  Read the blogs of various users across world
                </h5>
                <p className="mb-4 text-base">
                  Read the blogs of various users across world. Blogs are
                  available various languages try it out in your favrate
                  language.
                </p>
              </div>
            </div>
            <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 de sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <img
                  className="rounded-t-lg"
                  src="https://tecdn.b-cdn.net/img/new/standard/city/044.webp"
                  alt="Skyscrapers"
                />
              </a>
              <div className="p-6">
                <a href="createBlogs">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Create your own blog
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 ">
                  create your own blog, you can reach to people across the world
                  through your blogs.
                </p>
                {/* <h5 className="mb-2 text-xl font-medium leading-tight">
                  Card title
                </h5>
                <p className="mb-4 text-base">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p> */}
              </div>
            </div>
            {/* <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1  sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <img
                  className="rounded-t-lg"
                  src="https://tecdn.b-cdn.net/img/new/standard/city/043.webp"
                  alt="Los Angeles Skyscrapers"
                />
              </a>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  Card title
                </h5>
                <p className="mb-4 text-base">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div> */}
          </div>
        </ul>
        <ul className=" lg:flex-row flex flex-col">
          {/* <li className=" p-0 sl:p-5">
            <div class="lg:max-w-xs flex lg:flex-col w-fit bg-white border border-gray-200 rounded-lg shadow ">
              <a href="news" className="sm:max-lg:w-1/3 max-sm:p-0">
                <img
                  class="rounded-3xl p-3 h-full "
                  src="fake-news.jpg"
                  alt=""
                />
              </a>
              <div class="lg:p-5 p-2 max-sm:absolue max-sm:flex max-sm:flex-col max-sm:items-center">
                <a href="news">
                  <h5 class="mb-2 text-md sl:text-xl md:text-2xl font-bold tracking-tight text-gray-900 ">
                    Get the latest news from worldwide
                  </h5>
                </a>
                <p class="mb-3  font-normal text-gray-700 ">
                  Keep your knowlodge up to date . We have large collection of
                  news from every corner of world in various languages.
                </p>
                <Link
                  to="news"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
          <li className="p-5">
            <div class="max-w-xs w-fit bg-white border border-gray-200 rounded-lg shadow ">
              <a href="blogs">
                <img class="rounded-3xl p-3" src="fake-news.jpg" alt="" />
              </a>
              <div class="p-5">
                <a href="blogs">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Read the blogs of various users across world
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 ">
                  Read the blogs of various users across world. Blogs are
                  available various languages try it out in your favrate
                  language.
                </p>
                <Link
                  to="blogs"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
          <li className="p-5">
            <div class="max-w-xs w-fit bg-white border border-gray-200 rounded-lg shadow ">
              <Link to="createBlogs">
                <img class="rounded-3xl p-3" src="fake-news.jpg" alt="" />
              </Link>
              <div class="p-5">
                <a href="createBlogs">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Create your own blog
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 ">
                  create your own blog, you can reach to people across the world
                  through your blogs.
                </p>
                <a
                  href="createBlogs"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </li> */}
        </ul>
      </div>

      <div>
        <section class="bg-gray-100">
          <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div class="max-w-lg">
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  About Us
                </h2>
                <p class="mt-4 text-gray-600 text-lg">
                  At NewsBase, we believe in the power of storytelling and
                  staying informed. Our platform is a unique blend of news and
                  creativity, designed to keep you connected to the world while
                  giving you the freedom to express yourself. Whether you're a
                  news enthusiast looking for the latest updates or a passionate
                  writer eager to share your ideas, we've created a space where
                  your voice matters. With user-generated blogs, trending news,
                  and a vibrant community, YourVoiceHub empowers you to inform,
                  inspire, and ignite conversations that matter. Join us in
                  shaping a platform where every story counts and every opinion
                  matters. Together, let's create, share, and grow!
                </p>
                <div class="mt-8">
                  <a
                    href="contact"
                    class="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Connect with us
                    <span class="ml-2">&#8594;</span>
                  </a>
                </div>
              </div>
              <div class="mt-12 md:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                  alt="About Us Image"
                  class="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
