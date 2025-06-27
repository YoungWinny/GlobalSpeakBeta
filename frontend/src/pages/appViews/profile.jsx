import React, { useState } from "react";
import { Link } from "react-router-dom";

const countries = [
  { name: "Cameroon", code: "+237" },
  { name: "United States", code: "+1" },
  { name: "Nigeria", code: "+234" },
  { name: "United Kingdom", code: "+44" },
  // Add more countries as needed
];

export const Profile = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    // Handle file upload here
  };

  const handleBrowseClick = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="bg-[#fff8f5] min-h-screen p-8">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="src/assets/images/headphone-5-svgrepo-com.svg" style={{height:"41px",width:"41px"}} alt="Logo" className="h-20" />
          <span className=" font-black text-3xl">GlobalSpeak</span>
        </div>
        <div>
          <Link to="/">
          <button className=" rounded-lg bg-white text-[rgba(239,146,115,1)] hover:bg-gray-200 px-4 py-2 mr-4">Login</button>
          </Link>
          <Link to="/register">
          <button className="rounded-lg bg-[rgba(239,146,115,1)] text-white px-4 py-2">
            Sign up
          </button>
          </Link> 
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-8">
        <h1 className="text-lg font-semibold text-gray-600">
          Power Your Job Search
        </h1>
        <h2 className="text-4xl font-bold mb-8">
          Enter Your Info & Get Hired!
        </h2>

        <button className="bg-[rgba(239,146,115,1)] text-white  px-6 py-3 mb-8 rounded-lg ">
          SEARCH
        </button>

        <section className="bg-white p-6 shadow-md mb-8 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="bg-black text-white px-3 py-1 rounded-full mr-2">
              Step 1
            </span>
            <h3 className="text-lg font-bold flex items-center">Personal info</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="full-name">Full name</label>
              <input
                id="full-name"
                type="text"
                placeholder="Eg. Software Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email address</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  id="email"
                  type="email"
                  placeholder="Eg. admin@gmail.com"
                  className="w-full px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone number</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <select
                  className="px-2 border-r border-gray-300"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  type="tel"
                  placeholder="643225567"
                  className="w-full px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
              <select
                id="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 shadow-md rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full mr-2">
              Step 2
            </span>
            <h3 className="text-lg font-bold flex items-center">Desired job information</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="job-title">Job title</label>
              <input
                id="job-title"
                type="text"
                placeholder="Eg. Software Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="experience">Work experience</label>
              <input
                id="experience"
                type="text"
                placeholder="More than > 2 years"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="skills">Skills</label>
              <div className="flex flex-wrap gap-2">
                {["MySQL", "Prototyping", "Data entry", "Python", "C++", "3D modelling"].map(skill => (
                  <span key={skill} className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="employment-type">Employment type</label>
              <input
                id="employment-type"
                type="text"
                placeholder="Full-time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </section>

        {/* Step 3: Upload Your CV */}
        <section className="bg-white p-6 shadow-md rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full mr-2">
              Step 3
            </span>
            <h3 className="text-lg font-bold flex items-center">Upload Your CV</h3>
          </div>
          <div
            className={`border-2 border-dashed ${dragging ? "border-blue-500" : "border-gray-300"} p-8 rounded-lg text-center`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <img
                src="src/assets/images/file-icon.svg" // Replace with your file icon path
                alt="File Icon"
                className="h-12 mb-2"
              />
              <p className="text-gray-600">Drag and drop your files here</p>
              <p className="text-gray-500">or</p>
              <button
                type="button"
                onClick={handleBrowseClick}
                className="mt-4 rounded-lg bg-[rgba(239,146,115,1)] text-white px-4 py-2 "
              >
                Browse Files
              </button>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => console.log(e.target.files[0])} // Handle file selection
            />
          </div>
        </section>
      </main>
    </div>
  );
};