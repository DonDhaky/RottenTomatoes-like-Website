import 'tailwindcss/tailwind.css';
import Link from "next/link";
import fetchFilms from "@/app/api/auth/films/server";

interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface HomeProps {
  films: Film[];
}

export async function getStaticProps() {
  const films = await fetchFilms();
  return {
    props: {
      films,
    },
  };
}

export default function Home({ films }: HomeProps) {
  return (
    <div>
      {/* Display the NavBar Section */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Pathé
              </span>
            </a>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" passHref legacyBehavior>
                  <a
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/user" passHref legacyBehavior>
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    User Page
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/favorites" passHref legacyBehavior>
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Favorites
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/register" passHref legacyBehavior>
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Register
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/login" passHref legacyBehavior>
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Log In
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Display the Filter section */}
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="mb-6 flex justify-center">
          <h2 className="text-2xl font-semibold">Filter Movies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="genre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Genre
            </label>
            <select
              id="genre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="scifi">Sci-Fi</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Release Date
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
            />
          </div>
          <div>
            <label
              htmlFor="director"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Director
            </label>
            <input
              type="text"
              id="director"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
              placeholder="Director name"
            />
          </div>
          <div className="mt-auto flex justify-center">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
      {/* Display Films */}
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Movies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {films.map((film) => (
            <div
              key={film.id}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {film.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {film.overview}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
