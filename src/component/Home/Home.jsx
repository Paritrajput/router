import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Home() {
  const exploreRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="mx-0 w-full ">
      <aside className="relative overflow-hidden sm:h-90screen text-white flex items-center  bg-black h-60screen mx-0 ">
        <img
          src="landing-img.jpg"
          className="w-full min-h-full absolute opacity-40"
        ></img>
        <div className="relative flex flex-col items-center justify-center p-8 sm:p-16   h-fit bg-transparent backdrop-blur-ssm">
          <p className="text-5xl max-sm:text-3xl max-sm:bold mb-2 font-extrabold">
            Welcome to NewsBase
          </p>
          <p className="text-xl max-sm:text-sm mb-2">
            your interactive space for news and creativity! Stay updated with
            the latest stories and trends, or unleash your imagination by
            creating your own blogs. Whether you're here to read, share, or
            connect, we've got something for everyone. Dive in, explore, and let
            your voice be heard!{" "}
          </p>

          <div
            ref={exploreRef}
            className="flex p-1 sm:mt-1 justify-center space-y-8 w-full"
          >
            <button
              className="inline-flex text-white items-center px-2 py-1 lg:px-4 lg:py-2 font-medium bg-red-900 rounded-lg hover:opacity-75"
              onClick={() => scrollToSection(exploreRef)}
            >
              Explore
              <img
                width="32"
                height="32"
                src="arrow.png"
                alt="arrow--v1"
                className="1"
              />
            </button>
          </div>
        </div>
      </aside>

      <div className="  place-items-center sm:mt-10 text-start pb-5">
        <div className="text-3xl font-extrabold text-gray-900 sm:text-4xl p-2  w-full flex justify-start ">
          <span>Explore</span>
        </div>
        <ul>
          <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
            <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 hover:bg-zinc-100 sm:shrink-0 sm:grow sm:basis-0">
              <Link to="news">
                <img
                  className="rounded-t-lg"
                  src="news_img.webp"
                  alt="Hollywood Sign on The Hill"
                />
              </Link>
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
            <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 hover:bg-zinc-100 sm:shrink-0 sm:grow sm:basis-0">
              <Link to="blogs">
                <img
                  className="rounded-t-lg"
                  src="read_blog.webp"
                  alt="Palm Springs Road"
                />
              </Link>
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
            <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 hover:bg-zinc-100 sm:shrink-0 sm:grow sm:basis-0">
              <Link to="createBlogs">
                <img
                  className="rounded-t-lg"
                  src="create_blog.webp"
                  alt="Skyscrapers"
                />
              </Link>
              <div className="p-6">
                <a href="createBlogs">
                  <h5 class="mb-2 text-xl font-medium leading-tight ">
                    Create your own blog
                  </h5>
                </a>
                <p class="mb-4 text-base ">
                  create your own blog, you can reach to people across the world
                  through your blogs.
                </p>
              </div>
            </div>
          </div>
        </ul>
        <ul className=" lg:flex-row flex flex-col"></ul>
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
                  <Link
                    to="contact"
                    class="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Connect with us
                  </Link>
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
