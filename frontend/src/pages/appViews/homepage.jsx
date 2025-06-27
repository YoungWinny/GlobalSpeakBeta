import hero from "../../assets/images/hero-transformed.jpeg";
import search from "../../assets/images/search-svgrepo-com.svg";
import location from "../../assets/images/location-pin-svgrepo-com.svg";
import arrow from "../../assets/images/arrow-right-svgrepo-com-5.svg";
import mapImage from "../../assets/images/Mapsicle Map.png";
import translate from "../../assets/images/translation-icon-translate-language-svgrepo-com.svg";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div className="page bg-[#FEF9F8] w-full h-full px-[48px]">
      {/* Header */}
      <div className="header flex justify-between w-full">
        <div className="flex flex-row items-center">
          <img
            className="mt-8"
            src="src/assets/images/headphone-5-svgrepo-com.svg"
            alt="logo"
          />
          <h1 className="mt-12 font-black text-3xl">GlobalSpeak</h1>
        </div>
        <div className="flex space-x-2 mt-8">
          <Link to="/">
            <button className="bg-white text-[rgba(239,146,115,1)] hover:bg-gray-200 px-4 py-2">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-[rgba(239,146,115,1)] text-white px-4 py-2">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-row w-full">
        <div className="mt-40 bg-[#FEF9F8] w-1/2 h-full flex flex-col items-center gap-[32px]">
          <div className="flex flex-col items-center">
            <p className="font-normal text-[64px]">Discover more than</p>
            <p className="font-normal text-[64px] text-[rgba(239,146,115,1)]">
              4000+ Translation <br />
              and Transcription Jobs
            </p>
            <img
              className="h-[120px] w-[120px] self-center"
              src="src/assets/images/scribblecolor.svg"
              alt=""
            />
          </div>
          <p className="text-[rgba(185,185,185,1)] text-2xl text-center">
            Our business services are powered by crowdsourcing, the most
            exciting and rapidly growing business model for today's globalized
            world. We hire talented people around the globe who have skills in
            languages and technology to provide deep market insight for our
            services.
          </p>
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
        </div>
        <div className="mt-[100px] bg-[#FEF9F8] w-1/2 flex justify-center">
          <img
            className="rounded-tl-md rounded-tr-md"
            src={hero}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* Explore by Category */}
      <div className="middlehome bg-[#FEF9F8] py-12">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-3xl">
            Explore by <span className="text-[rgba(239,146,115,1)]">category</span>
          </h2>
          <span className="flex items-center">
            See all jobs
            <img src={arrow} alt="" className="ml-2" />
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8 px-4">
          {[
            "Tech",
            "Design",
            "Marketing",
            "Business",
            "Real estate",
            "Industry",
            "Finance",
            "Stocks",
          ].map((category) => (
            <div key={category} className="bg-white p-4 shadow-md rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">{category}</span>
                <span>140 available jobs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Listings */}
      <div className="popular bg-[#FEF9F8] py-12">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-3xl">
            Popular <span className="text-[rgba(239,146,115,1)]">listings</span>
          </h2>
          <span className="flex items-center">
            See all jobs
            <img src={arrow} alt="" className="ml-2" />
          </span>
        </div>
        <div className="space-y-4 mt-8 px-4">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={translate}
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
                    <span className="text-gray-500">Full-time</span>
                    <span className="text-gray-500">150,000</span>
                    <span className="text-gray-500">5 years of experience</span>
                  </div>
                </div>
              </div>
              <button className="bg-[rgba(239,146,115,1)] text-white px-4 py-2 rounded-md">
                View details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className=" bg-[white] w-full h-[47vh] flex flex-row items-center !gap-[0px] justify-center">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold mb-4">Get in touch</h2>
          <p className="text-lg w-2/5 mb-8">
            Our dedicated team is always ready to assist you with any
            questions you may have regarding our linguistic portal website.
          </p>
        </div>
        <img
          src={mapImage}
          alt="Map"
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Get in Touch Section */}
      <div className="contact-section bg-[#FEF9F8] py-12 flex justify-center mt-[20px]">
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex relative">
          <div className="w-1/2 p-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm">Your name</label>
                    <input
                      type="text"
                      placeholder="Lebron James"
                      className="w-full border-b-2 border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm">Email address</label>
                    <input
                      type="email"
                      placeholder="mail@gmail.com"
                      className="w-full border-b-2 border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm">Company</label>
                    <input
                      type="text"
                      placeholder="Spotify"
                      className="w-full border-b-2 border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm">Position/Role</label>
                    <input
                      type="text"
                      placeholder="Manager"
                      className="w-full border-b-2 border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm">Message</label>
                  <textarea
                    placeholder="Describe your issue"
                    className="w-full border-b-2 border-gray-300 focus:outline-none"
                    rows="3"
                  />
                </div>

                <button className="bg-[rgba(239,146,115,1)] text-white px-6 py-2 rounded-md">
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="w-1/2 p-8 bg-[rgba(239,146,115,1)] text-white rounded-r-lg flex flex-col justify-between">
            <div>
              <h3 className="font-bold mb-4">Contact information</h3>
              <p className="flex items-center mb-2">
                <span className="material-icons mr-2">location_on</span>
                Poste central, other info
              </p>
              <p className="flex items-center mb-2">
                <span className="material-icons mr-2">phone</span>
                +237622114466
              </p>
              <p className="flex items-center">
                <span className="material-icons mr-2">email</span>
                mailto@gmail.com
              </p>
            </div>

            <div className="flex space-x-4 mt-8">
              <a href="#" className="text-white">
                <span className="material-icons">twitter</span>
              </a>
              <a href="#" className="text-white">
                <span className="material-icons">linkedin</span>
              </a>
              <a href="#" className="text-white">
                <span className="material-icons">facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
 
 {/* Footer Section */}
 <div className="footer bg-[#FEF9F8] py-12 relative">
 <div className="max-w-6xl mx-auto px-4 flex justify-between items-start">
   {/* Logo and Description */}
   <div className="w-1/4">
     <div className="mb-4 h-16"></div> {/* Placeholder for logo */}
     <p className="text-gray-600">
       The dynamic nature of the IT world means that our opportunities
       change rapidly, so make sure you keep your profile up-to-date in
       order to receive notifications on positions that suit your
       profile.
     </p>
   </div>

   {/* Columns */}
   <div className="w-1/2 flex justify-between">
     {Array(3).fill().map((_, colIndex) => (
       <div key={colIndex}>
         <h4 className="font-bold mb-4">Norem ipsum dolor</h4>
         {Array(4).fill().map((_, rowIndex) => (
           <p className="text-gray-600" key={rowIndex}>
             Worem ipsum dolor sit amet, consectetur
           </p>
         ))}
       </div>
     ))}
   </div>

   {/* Newsletter Signup */}
   <div className="w-1/4">
     <h4 className="font-bold mb-4">
       Get job <span className="text-[rgba(239,146,115,1)]">notifications</span>
     </h4>
     <form className="flex items-center">
       <input
         type="email"
         placeholder="Enter your email"
         className="flex-grow border-b-2 border-gray-300 focus:outline-none py-2"
       />
       <button className="bg-[rgba(239,146,115,1)] text-white px-4 py-2 ml-2 rounded-md">
         SEND
       </button>
     </form>
   </div>
 </div>

 {/* Footer Bottom Text */}
 <div className="text-center mt-8 text-gray-600">
   ©2023 THEKAFE.ai . All rights reserved • Privacy Policy • Terms and Conditions
 </div>
</div>
</div>
);
};

export default Homepage;







     