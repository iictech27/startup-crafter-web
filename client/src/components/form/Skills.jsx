// import React, { useState } from 'react';

// function Skills() {
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   const handleSkillClick = (skill) => {
//     if (selectedSkills.includes(skill)) {
//       setSelectedSkills(selectedSkills.filter((s) => s !== skill));
//     } else {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   const skills = [
//     'Proofreading',
//     'Copywriting',
//     'Keyword Analysis',
//     'Memorization',
//     'Debugging',
//     'Calculus',
//     'Google Cloud',
//     'Aperture & Shutter Speeds',
//     'Bit Map Scaling',
//     'Perseverance',
//   ];

//   return (
//     <div className="bg-gray-100 p-8 rounded-lg">
//       <div className="flex gap-4 mb-4">
//         <button className="bg-blue-100 px-4 py-2 rounded-md">
//           Teamwork <span className="text-red-500">X</span>
//         </button>
//         <button className="bg-blue-100 px-4 py-2 rounded-md">
//           UI/UX Design <span className="text-red-500">X</span>
//         </button>
//         <button className="bg-blue-100 px-4 py-2 rounded-md">
//           Web Development <span className="text-red-500">X</span>
//         </button>
//       </div>
//       <h3 className="text-lg font-medium mb-2">Suggestions</h3>
//       <div className="flex flex-wrap gap-4 mb-4">
//         {skills.map((skill) => (
//           <button
//             key={skill}
//             className={`bg-gray-200 px-4 py-2 rounded-md ${
//               selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : ''
//             }`}
//             onClick={() => handleSkillClick(skill)}
//           >
//             {skill}
//           </button>
//         ))}
//       </div>
//       <h3 className="text-lg font-medium mb-2">Skills</h3>
//       < div className="flex flex-wrap gap-4">
//         {selectedSkills.map((skill) => (
//           <span key={skill} className="bg-blue-500 text-white px-4 py-2 rounded-md">
//             {skill} <span className="text-red-500 cursor-pointer" onClick={() => handleSkillClick(skill)}>X</span>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Skills;


// import React, { useState } from 'react';

// function Skills() {
//   // State for custom skill form
//   const [skill, setSkill] = useState('');
//   const [level, setLevel] = useState('');
  
//   // State for predefined skills
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   // Predefined list of skills
//   const predefinedSkills = [
//     'Proofreading',
//     'Copywriting',
//     'Keyword Analysis',
//     'Memorization',
//     'Debugging',
//     'Calculus',
//     'Google Cloud',
//     'Aperture & Shutter Speeds',
//     'Bit Map Scaling',
//     'Perseverance',
//   ];

//   // Handle form submission for custom skill
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (skill && level) {
//       console.log('Custom skill submitted:', { skill, level });
//       setSkill('');  // Clear skill input after submit
//       setLevel('');  // Clear level input after submit
//     }
//   };

//   // Handle selecting/deselecting predefined skills
//   const handleSkillClick = (selectedSkill) => {
//     setSelectedSkills((prevSkills) => {
//       if (prevSkills.includes(selectedSkill)) {
//         return prevSkills.filter((s) => s !== selectedSkill);
//       } else {
//         return [...prevSkills, selectedSkill];
//       }
//     });
//   };

//   return (
//     <div className="p-8 bg-white shadow-lg rounded-lg space-y-8">
//       {/* Custom Skill Form */}
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
//         <h3 className="text-xl font-medium mb-4">Add Custom Skill</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
//               Skill *
//             </label>
//             <input
//               type="text"
//               id="skill"
//               value={skill}
//               onChange={(e) => setSkill(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your skill"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
//               Level *
//             </label>
//             <select
//               id="level"
//               value={level}
//               onChange={(e) => setLevel(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="">Select Level</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* Predefined Skills Selection */}
//       <div className="bg-gray-100 p-8 rounded-lg">
//         <h3 className="text-lg font-medium mb-2">Predefined Skills</h3>
//         <div className="flex flex-wrap gap-4 mb-4">
//           {predefinedSkills.map((skill) => (
//             <button
//               key={skill}
//               className={`bg-gray-200 px-4 py-2 rounded-md ${
//                 selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : ''
//               }`}
//               onClick={() => handleSkillClick(skill)}
//             >
//               {skill}
//             </button>
//           ))}
//         </div>

//         <h3 className="text-lg font-medium mb-2">Selected Skills</h3>
//         <div className="flex flex-wrap gap-4">
//           {selectedSkills.map((skill) => (
//             <span key={skill} className="bg-blue-500 text-white px-4 py-2 rounded-md">
//               {skill}{' '}
//               <span
//                 className="text-red-500 cursor-pointer"
//                 onClick={() => handleSkillClick(skill)}
//               >
//                 X
//               </span>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Skills;

import React, { useState } from 'react';

function Skills() {
  // State for custom skill
  const [skill, setSkill] = useState('');

  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Predefined list of skills
  const predefinedSkills = [
    'Proofreading',
    'Copywriting',
    'Keyword Analysis',
    'Memorization',
    'Debugging',
    'Calculus',
    'Google Cloud',
    'Aperture & Shutter Speeds',
    'Bit Map Scaling',
    'Perseverance',
  ];

  // Handle adding/removing predefined skills from selected skills
  const handleSkillClick = (selectedSkill) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(selectedSkill)) {
        return prevSkills.filter((s) => s !== selectedSkill);
      } else {
        return [...prevSkills, selectedSkill];
      }
    });
  };

  // Handle submitting custom skill
  const handleCustomSkillSubmit = (event) => {
    event.preventDefault();
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]); // Add custom skill to selected skills
      setSkill(''); // Clear custom skill input
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg space-y-8">
      <h1 className="text-2xl font-bold mb-6">Skills</h1>

      {/* Selected Skills Section */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Selected Skills</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {selectedSkills.map((skill) => (
            <span key={skill} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {skill}{' '}
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => handleSkillClick(skill)}
              >
                X
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Predefined Skills Section */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Preferred Skills</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {predefinedSkills.map((skill) => (
            <button
              key={skill}
              className={`bg-gray-200 px-4 py-2 rounded-md ${
                selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => handleSkillClick(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Skill Form Section */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h3 className="text-xl font-medium mb-4">Add Custom Skill</h3>
        <form onSubmit={handleCustomSkillSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
              Custom Skill *
            </label>
            <input
              type="text"
              id="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your custom skill"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
}

export default Skills;

