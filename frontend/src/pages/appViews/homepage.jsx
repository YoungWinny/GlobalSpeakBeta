// import hero from "../../assets/images/hero-transformed.jpeg";
// import search from "../../assets/images/search-svgrepo-com.svg";
// import location from "../../assets/images/location-pin-svgrepo-com.svg";
// import arrow from "../../assets/images/arrow-right-svgrepo-com-5.svg";
// import mapImage from "../../assets/images/Mapsicle Map.png";
// import translate from "../../assets/images/translation-icon-translate-language-svgrepo-com.svg";
// import { Link } from "react-router-dom";

// export const Homepage = () => {
//   return (
//     <div className="page bg-[#FEF9F8] w-full h-full px-[48px]">
//       {/* Header */}
//       <div className="header flex justify-between w-full">
//         <div className="flex flex-row items-center">
//           <img
//             className="mt-8"
//             src="src/assets/images/headphone-5-svgrepo-com.svg"
//             alt="logo"
//           />
//           <h1 className="mt-12 font-black text-3xl">GlobalSpeak</h1>
//         </div>
//         <div className="flex space-x-2 mt-8">
//           <Link to="/">
//             <button className="bg-white text-[rgba(239,146,115,1)] hover:bg-gray-200 px-4 py-2">
//               Login
//             </button>
//           </Link>
//           <Link to="/register">
//             <button className="bg-[rgba(239,146,115,1)] text-white px-4 py-2">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="flex flex-row w-full">
//         <div className="mt-40 bg-[#FEF9F8] w-1/2 h-full flex flex-col items-center gap-[32px]">
//           <div className="flex flex-col items-center">
//             <p className="font-normal text-[64px]">Discover more than</p>
//             <p className="font-normal text-[64px] text-[rgba(239,146,115,1)]">
//               4000+ Translation <br />
//               and Transcription Jobs
//             </p>
//             <img
//               className="h-[120px] w-[120px] self-center"
//               src="src/assets/images/scribblecolor.svg"
//               alt=""
//             />
//           </div>
//           <p className="text-[rgba(185,185,185,1)] text-2xl text-center">
//             Our business services are powered by crowdsourcing, the most
//             exciting and rapidly growing business model for today's globalized
//             world. We hire talented people around the globe who have skills in
//             languages and technology to provide deep market insight for our
//             services.
//           </p>
//           <div className="mt-8 bg-white flex flex-row w-4/5 h-[72px] justify-evenly">
//             <div className="flex mt-2 gap-4">
//               <img
//                 style={{ width: "41px", height: "41px" }}
//                 src={search}
//                 alt=""
//               />
//               <input
//                 className="bg-white h-1/2 w-full mt-1 focus:outline-none border-b-2 border-[#BEBEBE]"
//                 type="text"
//                 placeholder="Job title or keyword"
//               />
//             </div>
//             <div className="flex mt-2 gap-4">
//               <img
//                 style={{ width: "41px", height: "41px" }}
//                 src={location}
//                 alt=""
//               />
//               <select
//                 className="bg-white h-1/2 w-full mt-1 focus:outline-none border-b-2 border-[#BEBEBE]"
//                 name=""
//                 id=""
//               >
//                 <option value="yde">Yaounde, CMR</option>
//                 <option value="mar">Maroua, CMR</option>
//               </select>
//             </div>
//             <button className="bg-[rgba(239,146,115,1)] text-white mt-3 px-4 py-2">
//               Search my job
//             </button>
//           </div>
//         </div>
//         <div className="mt-[100px] bg-[#FEF9F8] w-1/2 flex justify-center">
//           <img
//             className="rounded-tl-md rounded-tr-md"
//             src={hero}
//             alt=""
//             style={{ width: "100%", height: "auto" }}
//           />
//         </div>
//       </div>

//       {/* Explore by Category */}
//       <div className="middlehome bg-[#FEF9F8] py-12">
//         <div className="flex justify-between items-center px-4">
//           <h2 className="text-3xl">
//             Explore by <span className="text-[rgba(239,146,115,1)]">category</span>
//           </h2>
//           <span className="flex items-center">
//             See all jobs
//             <img src={arrow} alt="" className="ml-2" />
//           </span>
//         </div>
//         <div className="grid grid-cols-4 gap-4 mt-8 px-4">
//           {[
//             "Tech",
//             "Design",
//             "Marketing",
//             "Business",
//             "Real estate",
//             "Industry",
//             "Finance",
//             "Stocks",
//           ].map((category) => (
//             <div key={category} className="bg-white p-4 shadow-md rounded-lg">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-xl font-bold">{category}</span>
//                 <span>140 available jobs</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Popular Listings */}
//       <div className="popular bg-[#FEF9F8] py-12">
//         <div className="flex justify-between items-center px-4">
//           <h2 className="text-3xl">
//             Popular <span className="text-[rgba(239,146,115,1)]">listings</span>
//           </h2>
//           <span className="flex items-center">
//             See all jobs
//             <img src={arrow} alt="" className="ml-2" />
//           </span>
//         </div>
//         <div className="space-y-4 mt-8 px-4">
//           {[...Array(12)].map((_, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={translate}
//                   alt="Company Logo"
//                   className="h-12 w-12"
//                 />
//                 <div>
//                   <h3 className="font-bold">Full stack developer</h3>
//                   <p className="text-gray-600">Yaounde, Cameroon</p>
//                   <div className="flex space-x-2 mt-1">
//                     <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">
//                       Tech
//                     </span>
//                     <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full">
//                       Design
//                     </span>
//                     <span className="text-gray-500">Full-time</span>
//                     <span className="text-gray-500">150,000</span>
//                     <span className="text-gray-500">5 years of experience</span>
//                   </div>
//                 </div>
//               </div>
//               <button className="bg-[rgba(239,146,115,1)] text-white px-4 py-2 rounded-md">
//                 View details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className=" bg-[white] w-full h-[47vh] flex flex-row items-center !gap-[0px] justify-center">
//         <div className="w-1/2">
//           <h2 className="text-4xl font-bold mb-4">Get in touch</h2>
//           <p className="text-lg w-2/5 mb-8">
//             Our dedicated team is always ready to assist you with any
//             questions you may have regarding our linguistic portal website.
//           </p>
//         </div>
//         <img
//           src={mapImage}
//           alt="Map"
//           className="rounded-lg shadow-md"
//         />
//       </div>

//       {/* Get in Touch Section */}
//       <div className="contact-section bg-[#FEF9F8] py-12 flex justify-center mt-[20px]">
//         <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex relative">
//           <div className="w-1/2 p-8">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="font-bold mb-4">Send us a message</h3>
//               <form className="space-y-4">
//                 <div className="flex space-x-4">
//                   <div className="w-1/2">
//                     <label className="block text-sm">Your name</label>
//                     <input
//                       type="text"
//                       placeholder="Lebron James"
//                       className="w-full border-b-2 border-gray-300 focus:outline-none"
//                     />
//                   </div>
//                   <div className="w-1/2">
//                     <label className="block text-sm">Email address</label>
//                     <input
//                       type="email"
//                       placeholder="mail@gmail.com"
//                       className="w-full border-b-2 border-gray-300 focus:outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <div className="w-1/2">
//                     <label className="block text-sm">Company</label>
//                     <input
//                       type="text"
//                       placeholder="Spotify"
//                       className="w-full border-b-2 border-gray-300 focus:outline-none"
//                     />
//                   </div>
//                   <div className="w-1/2">
//                     <label className="block text-sm">Position/Role</label>
//                     <input
//                       type="text"
//                       placeholder="Manager"
//                       className="w-full border-b-2 border-gray-300 focus:outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm">Message</label>
//                   <textarea
//                     placeholder="Describe your issue"
//                     className="w-full border-b-2 border-gray-300 focus:outline-none"
//                     rows="3"
//                   />
//                 </div>

//                 <button className="bg-[rgba(239,146,115,1)] text-white px-6 py-2 rounded-md">
//                   Send
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="w-1/2 p-8 bg-[rgba(239,146,115,1)] text-white rounded-r-lg flex flex-col justify-between">
//             <div>
//               <h3 className="font-bold mb-4">Contact information</h3>
//               <p className="flex items-center mb-2">
//                 <span className="material-icons mr-2">location_on</span>
//                 Poste central, other info
//               </p>
//               <p className="flex items-center mb-2">
//                 <span className="material-icons mr-2">phone</span>
//                 +237622114466
//               </p>
//               <p className="flex items-center">
//                 <span className="material-icons mr-2">email</span>
//                 mailto@gmail.com
//               </p>
//             </div>

//             <div className="flex space-x-4 mt-8">
//               <a href="#" className="text-white">
//                 <span className="material-icons">twitter</span>
//               </a>
//               <a href="#" className="text-white">
//                 <span className="material-icons">linkedin</span>
//               </a>
//               <a href="#" className="text-white">
//                 <span className="material-icons">facebook</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
 
//  {/* Footer Section */}
//  <div className="footer bg-[#FEF9F8] py-12 relative">
//  <div className="max-w-6xl mx-auto px-4 flex justify-between items-start">
//    {/* Logo and Description */}
//    <div className="w-1/4">
//      <div className="mb-4 h-16"></div> {/* Placeholder for logo */}
//      <p className="text-gray-600">
//        The dynamic nature of the IT world means that our opportunities
//        change rapidly, so make sure you keep your profile up-to-date in
//        order to receive notifications on positions that suit your
//        profile.
//      </p>
//    </div>

//    {/* Columns */}
//    <div className="w-1/2 flex justify-between">
//      {Array(3).fill().map((_, colIndex) => (
//        <div key={colIndex}>
//          <h4 className="font-bold mb-4">Norem ipsum dolor</h4>
//          {Array(4).fill().map((_, rowIndex) => (
//            <p className="text-gray-600" key={rowIndex}>
//              Worem ipsum dolor sit amet, consectetur
//            </p>
//          ))}
//        </div>
//      ))}
//    </div>

//    {/* Newsletter Signup */}
//    <div className="w-1/4">
//      <h4 className="font-bold mb-4">
//        Get job <span className="text-[rgba(239,146,115,1)]">notifications</span>
//      </h4>
//      <form className="flex items-center">
//        <input
//          type="email"
//          placeholder="Enter your email"
//          className="flex-grow border-b-2 border-gray-300 focus:outline-none py-2"
//        />
//        <button className="bg-[rgba(239,146,115,1)] text-white px-4 py-2 ml-2 rounded-md">
//          SEND
//        </button>
//      </form>
//    </div>
//  </div>

//  {/* Footer Bottom Text */}
//  <div className="text-center mt-8 text-gray-600">
//    ©2023 THEKAFE.ai . All rights reserved • Privacy Policy • Terms and Conditions
//  </div>
// </div>
// </div>
// );
// };

// export default Homepage;






import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "../../assets/images/hero-transformed.jpeg";
import search from "../../assets/images/search-svgrepo-com.svg";
import location from "../../assets/images/location-pin-svgrepo-com.svg";
import arrow from "../../assets/images/arrow-right-svgrepo-com-5.svg";
import mapImage from "../../assets/images/Mapsicle Map.png";
import translate from "../../assets/images/translation-icon-translate-language-svgrepo-com.svg";
import logo from "../../assets/images/LexiVerse.png";
import scribble from "../../assets/images/scribblecolor.svg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const Homepage = () => {
  const heroRef = useRef(null);
  const categoryRef = useRef(null);
  const listingsRef = useRef(null);
  const mapRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });

      gsap.from(".hero-image", {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      if (categoryRef.current) {
        gsap.from(".category-card", {
          scrollTrigger: {
            trigger: categoryRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        });
      }

      if (listingsRef.current) {
        gsap.from(".job-listing", {
          scrollTrigger: {
            trigger: listingsRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        });
      }

      if (mapRef.current) {
        gsap.from(".map-content", {
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".map-image", {
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (contactRef.current) {
        gsap.from(".contact-form", {
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".contact-info", {
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      gsap.to(".floating", {
        y: 15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const cards = document.querySelectorAll(".category-card, .job-listing");
      cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page bg-[#FEF9F8] w-full h-full px-[48px] overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[rgba(239,146,115,0.1)] blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-[rgba(239,146,115,0.1)] blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="header flex justify-between w-full py-8 sticky top-0 z-50 bg-[#FEF9F8]">
        <div className="flex flex-row items-center">
          <img className="w-10 h-10" src={logo} alt="logo" />
          <h1 className="font-black text-3xl ml-2 bg-gradient-to-r from-[#EF9273] to-[#F4A261] bg-clip-text text-transparent">
            LexiVerse
          </h1>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-[#EF9273] transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-700 hover:text-[#EF9273] transition-colors">
            Jobs
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-[#EF9273] transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#EF9273] transition-colors">
            Contact
          </Link>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-white text-[#EF9273] hover:bg-gray-100 px-4 py-2 rounded-lg transition-all hover:shadow-md">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] text-white px-4 py-2 rounded-lg transition-all hover:shadow-md hover:opacity-90">
                Sign Up
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="flex flex-row w-full min-h-screen items-center">
        <div className="mt-20 bg-[#FEF9F8] w-1/2 h-full flex flex-col items-center gap-8 hero-content">
          <div className="flex flex-col items-start w-full pl-12">
            <p className="font-normal text-5xl md:text-6xl leading-tight">
              Discover more than
            </p>
            <p className="font-normal text-5xl md:text-6xl leading-tight bg-gradient-to-r from-[#EF9273] to-[#F4A261] bg-clip-text text-transparent">
              4000+ Translation <br />
              and Transcription Jobs
            </p>
            <img
              className="h-28 w-28 self-start floating"
              src={scribble}
              alt="scribble"
            />
          </div>
          <p className="text-gray-400 text-xl text-left w-full pl-12">
            Our business services are powered by crowdsourcing, the most
            exciting and rapidly growing business model for today's globalized
            world.
          </p>
          <div className="mt-8 bg-white flex flex-row w-4/5 h-18 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 flex-1">
              <img className="w-8 h-8" src={search} alt="search" />
              <input
                className="bg-white w-full focus:outline-none placeholder-gray-400"
                type="text"
                placeholder="Job title or keyword"
              />
            </div>
            <div className="flex items-center gap-4 flex-1 border-l border-gray-200 pl-4">
              <img className="w-8 h-8" src={location} alt="location" />
              <select
                className="bg-white w-full focus:outline-none"
                name="location"
                id="location"
              >
                <option value="yde">Yaounde, CMR</option>
                <option value="mar">Maroua, CMR</option>
              </select>
            </div>
            <button className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] text-white px-6 py-2 rounded-lg ml-4 transition-all hover:opacity-90 hover:shadow-md">
              Search
            </button>
          </div>
          <div className="flex w-full pl-12 mt-4 gap-4">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i+20}.jpg`}
                    alt="user"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-500">100+ translators hired</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center hero-image">
          <div className="relative">
            <img
              className="rounded-2xl shadow-2xl floating"
              src={hero}
              alt="hero"
              style={{ width: "90%", height: "auto" }}
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-[#EF9273] bg-opacity-20 p-2 rounded-full">
                  <img src={translate} alt="translate" className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <p className="font-bold">500+ Jobs</p>
                  <p className="text-sm text-gray-500">Available now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 bg-white rounded-2xl shadow-sm mb-16">
        <p className="text-center text-gray-500 mb-8">Trusted by leading companies</p>
        <div className="flex justify-center gap-12">
          {['Google', 'Microsoft', 'Spotify', 'Airbnb', 'Netflix'].map((company, index) => (
            <div key={index} className="text-2xl font-bold text-gray-300 hover:text-[#EF9273] transition-colors">
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Explore by Category */}
      <section ref={categoryRef} className="py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">
            Explore by <span className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] bg-clip-text text-transparent">category</span>
          </h2>
          <Link to="/jobs" className="flex items-center text-[#EF9273] hover:underline">
            See all jobs
            <img src={arrow} alt="arrow" className="ml-2 w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Tech", jobs: 240, icon: "💻" },
            { name: "Design", jobs: 180, icon: "🎨" },
            { name: "Marketing", jobs: 150, icon: "📈" },
            { name: "Business", jobs: 210, icon: "💼" },
            { name: "Real estate", jobs: 90, icon: "🏠" },
            { name: "Industry", jobs: 120, icon: "🏭" },
            { name: "Finance", jobs: 190, icon: "💰" },
            { name: "Stocks", jobs: 75, icon: "📊" },
          ].map((category) => (
            <div 
              key={category.name} 
              className="category-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <span className="text-gray-500">{category.jobs} jobs</span>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-100">
                <div 
                  className="h-full bg-gradient-to-r from-[#EF9273] to-[#F4A261]"
                  style={{ width: `${Math.min(100, category.jobs / 2.4)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Listings */}
      <section ref={listingsRef} className="py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">
            Popular <span className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] bg-clip-text text-transparent">listings</span>
          </h2>
          <Link to="/jobs" className="flex items-center text-[#EF9273] hover:underline">
            See all jobs
            <img src={arrow} alt="arrow" className="ml-2 w-5 h-5" />
          </Link>
        </div>
        <div className="space-y-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="job-listing bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex items-start space-x-4 mb-4 md:mb-0">
                <div className="bg-[#EF9273] bg-opacity-20 p-3 rounded-lg">
                  <img
                    src={translate}
                    alt="Company Logo"
                    className="h-8 w-8"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Full stack developer</h3>
                  <p className="text-gray-600">Yaounde, Cameroon</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                      Tech
                    </span>
                    <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm">
                      Design
                    </span>
                    <span className="text-gray-500 text-sm">Full-time</span>
                    <span className="text-gray-500 text-sm">150,000 XAF</span>
                    <span className="text-gray-500 text-sm">5 years experience</span>
                  </div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] text-white px-6 py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md">
                View details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#EF9273] to-[#F4A261] rounded-2xl text-white mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-5xl font-bold mb-2">4,000+</h3>
            <p className="text-xl">Translation Jobs</p>
          </div>
          <div className="p-6">
            <h3 className="text-5xl font-bold mb-2">120+</h3>
            <p className="text-xl">Languages Supported</p>
          </div>
          <div className="p-6">
            <h3 className="text-5xl font-bold mb-2">15,000+</h3>
            <p className="text-xl">Translators Worldwide</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 map-content">
          <h2 className="text-4xl font-bold mb-6">Global Reach, Local Expertise</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our network spans across 50+ countries with native speakers in every major
            language. Wherever you need translation services, we have local experts ready.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#EF9273] bg-opacity-20 p-2 rounded-full mt-1">
                <img src={location} alt="location" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Local Translators</h4>
                <p className="text-gray-600">
                  Native speakers with cultural understanding for accurate translations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#EF9273] bg-opacity-20 p-2 rounded-full mt-1">
                <img src={translate} alt="translate" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg">24/7 Availability</h4>
                <p className="text-gray-600">
                  Our global network means someone is always available to help.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 map-image">
          <img
            src={mapImage}
            alt="Global Coverage Map"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-16">
          What our <span className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] bg-clip-text text-transparent">translators</span> say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "French Translator",
              quote: "LexiVerse has provided me with consistent work and fair compensation. The platform is easy to use and the support team is responsive.",
              avatar: "https://randomuser.me/api/portraits/women/43.jpg"
            },
            {
              name: "Michael Chen",
              role: "Chinese Translator",
              quote: "I've been able to work with clients from around the world while maintaining my own schedule. It's been a game-changer for my career.",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
              name: "Amina Diallo",
              role: "Arabic Translator",
              quote: "The variety of projects keeps my work interesting. I've translated everything from legal documents to video game scripts!",
              avatar: "https://randomuser.me/api/portraits/women/65.jpg"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="flex mt-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Get in Touch Section */}
      <section ref={contactRef} className="py-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-12 contact-form">
              <h3 className="font-bold text-2xl mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
                    <input
                      type="text"
                      placeholder="Lebron James"
                      className="w-full border-b-2 border-gray-300 focus:border-[#EF9273] focus:outline-none py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      placeholder="mail@gmail.com"
                      className="w-full border-b-2 border-gray-300 focus:border-[#EF9273] focus:outline-none py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      placeholder="Spotify"
                      className="w-full border-b-2 border-gray-300 focus:border-[#EF9273] focus:outline-none py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
                    <input
                      type="text"
                      placeholder="Manager"
                      className="w-full border-b-2 border-gray-300 focus:border-[#EF9273] focus:outline-none py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    placeholder="Describe your issue"
                    className="w-full border-b-2 border-gray-300 focus:border-[#EF9273] focus:outline-none py-2"
                    rows="3"
                  />
                </div>

                <button className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] text-white px-8 py-3 rounded-lg transition-all hover:opacity-90 hover:shadow-md">
                  Send Message
                </button>
              </form>
            </div>

            <div className="w-full md:w-1/2 p-12 bg-gradient-to-br from-[#EF9273] to-[#F4A261] text-white contact-info">
              <h3 className="font-bold text-2xl mb-6">Contact information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p>Poste central, Yaounde, Cameroon</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+237 622 114 466</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>contact@lexiverse.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={`M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z`}/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your translation journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of translators and businesses connecting through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-white text-[#EF9273] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Sign Up as Translator
            </Link>
            <Link 
              to="/register" 
              className="bg-black bg-opacity-20 text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-30 transition-all"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img className="w-10 h-10" src={logo} alt="logo" />
              <h1 className="font-black text-2xl ml-2 bg-gradient-to-r from-[#EF9273] to-[#F4A261] bg-clip-text text-transparent">
                LexiVerse
              </h1>
            </div>
            <p className="text-gray-600 mb-6">
              Connecting businesses with skilled translators worldwide for accurate, culturally-relevant translations.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d={`M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z`}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Press"]
            },
            {
              title: "Resources",
              links: ["Help Center", "Community", "Partners", "Events"]
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookies"]
            }
          ].map((column, index) => (
            <div key={index}>
              <h4 className="font-bold text-lg mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-600 hover:text-[#EF9273] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold text-lg mb-6">
              Get job <span className="text-[#EF9273]">notifications</span>
            </h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow border-2 border-gray-300 focus:border-[#EF9273] focus:outline-none py-2 px-4 rounded-l-lg"
              />
              <button className="bg-gradient-to-r from-[#EF9273] to-[#F4A261] text-white px-4 py-2 rounded-r-lg transition-all hover:opacity-90">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-2">
              We'll send you the best translation jobs
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} LexiVerse. All rights reserved • Privacy Policy • Terms and Conditions</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;