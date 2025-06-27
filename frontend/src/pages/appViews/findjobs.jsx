import React from "react";
import  Logo from "../../assets/images/headphone-5-svgrepo-com.svg";
import search from "../../assets/images/search-svgrepo-com.svg";
import location from "../../assets/images/location-pin-svgrepo-com.svg";
import transcription from "../../assets/images/transcription.svg"
export const FindJobs = () => {
return (
<div className="bg-gray-50 min-h-screen">
      <header className="bg-[#FEF9F8] p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-8" />
          <span className="font-bold text-xl text-black">GlobalSpeak</span>
        </div>
        <div className="space-x-2">
          <button className="bg-[white] text-[rgba(239,146,115,1)]  hover:bg-gray-200 px-4 py-2">Login</button>
          <button className="bg-[rgba(239,146,115,1)] text-[white]">
            Sign up
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold mb-4">
          Discover more than <span className="text-[rgba(239,146,115,1)] ">4000 + Translation and Transcription Jobs</span>
        </h1>
        

        {/* <div className="flex items-center mb-8">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
          />
          <select className="px-4 py-2 border-t border-b border-gray-300">
            <option>Yaounde, Cameroon</option>
          </select>
          <button className="bg-[#f26f4d] text-white px-4 py-2 rounded-r-md">
            Search my job
          </button>
        </div> */}
        <div className="mt-8 bg-white flex flex-row w-4/5 h-[72px] justify-evenly">
            <div className="flex mt-2 gap-4">
              <img
                style={{ width: "41px", height: "41px" }}
                src={search}
                alt=""
              />
              <input
                className="bg-white h-1/2 w-full mt-1 focus:outline-none border-b-2 border-[#BEBEBE]"
                type="text"
                placeholder="Job title or keyword"
              />
            </div>
            <div className="flex mt-2 gap-4">
              <img
                style={{ width: "41px", height: "41px" }}
                src={location}
                alt=""
              />
              <select
                className="bg-white h-1/2 w-full mt-1 focus:outline-none border-b-2 border-[#BEBEBE]"
                name=""
                id=""
              >
                <option value="yde">Yaounde, CMR</option>
                <option value="mar">Maroua, CMR</option>
              </select>
            </div>
            <button className="bg-[rgba(239,146,115,1)] text-white mt-3 px-4 py-2">
              Search my job
            </button>
          </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Filters */}
          <aside className="col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold mb-2">Type of Employment</h2>
            <ul className="space-y-2 mb-4">
              <li>
                <input type="checkbox" className="mr-2" />
                Full-time (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Part-time (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Remote (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Contract (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Internship (5)
              </li>
            </ul>

            <h2 className="font-bold mb-2">Categories</h2>
            <ul className="space-y-2 mb-4">
              <li>
                <input type="checkbox" className="mr-2" />
                Tech (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Design (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Marketing (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Business (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Real estate (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Industry (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Finance (5)
              </li>
            </ul>

            <h2 className="font-bold mb-2">Experience</h2>
            <ul className="space-y-2 mb-4">
              <li>
                <input type="checkbox" className="mr-2" />
                Beginner (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Mid level (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Above average (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Senior level (5)
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                Expert (5)
              </li>
            </ul>

            <h2 className="font-bold mb-2">Salary range</h2>
            <ul className="space-y-2">
              <li>
                <input type="checkbox" className="mr-2" />
                70,000 - 130,000
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                130,000 - 250,000
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                250,000 - 350,000
              </li>
              <li>
                <input type="checkbox" className="mr-2" />
                350,000 - 400,000
              </li>
            </ul>
          </aside>

          {/* Job Listings */}
          <section className="col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Jobs</h2>
              <div className="flex items-center space-x-2">
                <span>Sort by:</span>
                <select className="border border-gray-300 rounded-md">
                  <option>Most relevant</option>
                </select>
              </div>
            </div>

            <ul className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={transcription}
                      alt="Company Logo"
                      className="h-12 w-12"
                    />
                    <div>
                      <h3 className="font-bold">Full stack developer</h3>
                      <p className="text-gray-600">Yaounde, Cameroon</p>
                      <div className="flex space-x-2 mt-1">
                        <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">
                          Tech
                        </span>
                        <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full">
                          Design
                        </span>
                        <span className="bg-purple-100 text-purple-500 px-2 py-1 rounded-full">
                          Full-time
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-[rgba(239,146,115,1)] text-white text-white px-4 py-2 rounded-md">
                    Apply
                  </button>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">
                3
              </button>
              <span>...</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md">
                21
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>

);
};
