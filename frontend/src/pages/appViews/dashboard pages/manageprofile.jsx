import React, { useState } from "react";

const countries = [
  { name: "Cameroon", code: "+237" },
  { name: "United States", code: "+1" },
  { name: "Nigeria", code: "+234" },
  { name: "United Kingdom", code: "+44" },
];

const InputField = ({ label, type, id, placeholder }) => (
  <div>
    <label className="block text-lg font-medium mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
);

const SelectField = ({ label, id, options, value, onChange }) => (
  <div>
    <label className="block text-lg font-medium mb-1" htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.name} ({option.code})
        </option>
      ))}
    </select>
  </div>
);

const DragAndDrop = ({ dragging, onDragOver, onDragLeave, onDrop, onBrowse }) => (
  <div
    className={`border-2 border-dashed h-60 ${
      dragging ? "border-blue-500" : "border-gray-300"
    } p-8 rounded-lg text-center`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src="/path/to/your/file-icon.svg"
        alt="File Icon"
        className="mb-2"
      />
      <p className="text-gray-600">Drag and drop your files here</p>
      <p className="text-gray-500">or</p>
      <button
        type="button"
        onClick={onBrowse}
        className="mt-2 rounded-lg bg-[rgba(239,146,115,1)] text-white px-4 py-2"
      >
        Browse Files
      </button>
    </div>
    <input
      id="file-upload"
      type="file"
      className="hidden"
    />
  </div>
);

export const ManageProfile = () => {
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
    <div className="bg-[#fff8f5] w-full h-full pt-8 px-8 overflow-y-auto">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-600 mb-2">
            Power Your Job Search
          </h1>
          <h2 className="text-4xl font-bold mb-8">
            Enter Your Info & Get Hired!
          </h2>
        </div>

        {/* Step 1: Personal Info */}
        <section className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center mb-4">
            <span className="bg-black text-white px-3 py-1 rounded-full mr-2">
              Step 1
            </span>
            <h3 className="text-lg font-bold">Personal info</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full name" type="text" id="full-name" placeholder="Eg. LeBron James" />
            <InputField label="Email address" type="email" id="email" placeholder="Eg. admin@gmail.com" />
            <div>
              <label className="block text-lg font-medium mb-1" htmlFor="phone">Phone number</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <SelectField
                  options={countries}
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                />
                <input
                  id="phone"
                  type="tel"
                  placeholder="643225567"
                  className="w-full px-3 py-2"
                />
              </div>
            </div>
            <SelectField
              label="Country"
              id="country"
              options={countries}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />
          </div>
        </section>

        {/* Step 2: Desired Job Information */}
        <section className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center mb-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full mr-2">
              Step 2
            </span>
            <h3 className="text-lg font-bold">Desired job information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Job title" type="text" id="job-title" placeholder="Eg. Translator" />
            <InputField label="Work experience" type="text" id="experience" placeholder="More than > 2 years" />
            <div>
              <label className="block text-lg font-medium mb-1" htmlFor="languages">Languages</label>
              <div className="flex flex-wrap gap-2">
                {["French", "Chinese", "German", "Igbo", "Bassa", "Duala"].map(skill => (
                  <span key={skill} className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <InputField label="Employment type" type="text" id="employment-type" placeholder="Full-time" />
          </div>
        </section>

        {/* Step 3: Upload Your CV */}
        <section className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full mr-2">
              Step 3
            </span>
            <h3 className="text-lg font-bold">Upload Your CV</h3>
          </div>
          <DragAndDrop
            dragging={dragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onBrowse={handleBrowseClick}
          />
        </section>

        <section className="text-center mb-8">
          <button className="bg-[rgba(239,146,115,1)] text-white px-8 py-3 rounded-lg">
            Submit
          </button>
        </section>
      </div>
    </div>
  );
};

export default ManageProfile;