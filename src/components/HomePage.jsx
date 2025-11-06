import React from "react";
// import sport from "../assets/images/boys.png";
import sport from "../assets/images/playing.jpg";
import child1 from "../assets/images/child1.jpg";
import child2 from "../assets/images/child2.avif";
import child4 from "../assets/images/child4.avif";
import child5 from "../assets/images/child5.avif";
import { File, UserPlus, Youtube, MessageSquareMore } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
      {/* Header Section */}
      <div
        className="min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 relative w-[100%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sport})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0"></div>

        <div className="max-w-6xl mx-auto text-left relative z-10">
          {/* Main Heading */}
          <div className="mb-3 sm:mb-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
              Welcome to Youth Athlete
              <br />
              University Game Day Central
            </h1>
          </div>

          {/* Subheading */}
          <div className="mb-3 sm:mb-5 ">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Where school spirit, teamwork, and community come together
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-start items-center">
            <button className=" w-[200px] h-[50px]  bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm sm:text-base">
              View full calendar
            </button>
            <button className="w-[200px] h-[50px] bg-white hover:bg-gray-50  text-gray-900 font-semibold py-2.5 px-6 rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm sm:text-base">
              Find your school
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-blue-900 text-white py-12 px-6 md:px-12 flex flex-col items-center w-[100%]">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
              YAU isn’t just about sports <br />
              it’s about building better <br />
              <span className="font-bold">
                students, athletes, and leaders.
              </span>
            </h2>
          </div>

          {/* Right Testimonial Card */}
          <section className="bg-blue-900 text-white flex justify-center items-center py-12 px-4">
            <div className="relative w-full max-w-3xl">
              {/* Image Grid */}
              <div className="grid grid-cols-2 ">
                <img
                  src={child4}
                  alt="Student 1"
                  className="w-full h-40 object-cover "
                />
                <img
                  src={child2}
                  // src={child3}
                  alt="Student 2"
                  className="w-full h-40 object-cover "
                />
                <img
                  src={child1}
                  alt="Student 3"
                  className="w-full h-40 object-cover "
                />
                <img
                  src={child5}
                  alt="Student 4"
                  className="w-full h-40 object-cover "
                />
              </div>

              {/* Testimonial Overlay */}
              <div className="absolute bottom-2 right-2 bg-blue-800 bg-opacity-95 text-white rounded-lg p-5 w-72 shadow-lg">
                <p className="text-sm ">
                  The YAU program has transformed our school culture. Students
                  look forward to every game day.
                </p>
                <p className="mt-3 text-xs font-semibold">
                  — Principal, Carmeedy Hills Elementary
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-blue-900 shadow-md w-full py-6 sm:py-8 px-4 sm:px-6 md:px-12">
        <div className="text-center p-3 sm:p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-center">
          <File size={35} strokeWidth={2.2} />
          <h3 className="text-base sm:text-lg font-semibold ">
            Parent Resources
          </h3>
          <button className=" text-blue-700 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition duration-300 w-full sm:w-auto">
            View More
          </button>
        </div>

        <div className="text-center p-3 sm:p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-center">
          <UserPlus size={35} strokeWidth={2.2} />
          <h3 className="text-base sm:text-lg font-semibold ">
            Volunteer & Jobs
          </h3>
          <button className=" text-blue-700 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition duration-300 w-full sm:w-auto">
            View More
          </button>
        </div>

        <div className="text-center p-3 sm:p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-center">
          <Youtube size={35} strokeWidth={2.2} />
          <h3 className="text-base sm:text-lg font-semibold ">
            Game Day Highlights
          </h3>
          <button className=" text-blue-700 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition duration-300 w-full sm:w-auto">
            View More
          </button>
        </div>

        <div className="text-center p-3 sm:p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-center">
          <MessageSquareMore size={35} strokeWidth={2.2} />
          <h3 className="text-base sm:text-lg font-semibold">
            Community Updates
          </h3>
          <button className=" text-blue-700 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition duration-300 w-full sm:w-auto">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;