import React from "react";
import TeamMember from "./TeamMember";
import Button from "../../Button";

function TeamSection({ title, teamName }) {
  const teamMembers = [
    {
      role: "Developer",
      name: "Alex Wandaey",
      image:
        "https://www.pngarts.com/files/7/Female-College-Student-PNG-Photo.png",
    },
    {
      role: "Developer",
      name: "Alex Wandaey",
      image:
        "https://offertabs.s3.amazonaws.com/offer/qy9s4z/large/810_1920_6095afa41d80b-SeniorPic.JPG",
    },
    {
      role: "Designer",
      name: "Alex Wanda",
      image:
        "https://thumbs.dreamstime.com/b/portrait-female-student-standing-college-building-portrait-female-student-standing-college-building-104866088.jpg",
    },
  ];

  return (
    <section className="w-full max-w-[1055px]">
      <h2 className="self-start mt-36 text-4xl font-bold text-black max-md:ml-2.5">
        {title}
      </h2>
      <div className="flex flex-col justify-center px-3 py-6 mt-3 max-w-full bg-white rounded-2xl shadow-[4px_4px_25px_rgba(0,0,0,0.25)] w-[1055px] max-md:pr-5">
        <div className="flex flex-col items-center px-20 pb-5 gap-y-6 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <h3 className="text-3xl font-bold text-fuchsia-700 font-inknut">
            {teamName}
          </h3>
          <p className="text-xl text-center text-black max-md:max-w-full">
            Team Synopsis triumphed with innovative solutions, unmatched
            collaboration, and a relentless drive, showcasing exceptional
            creativity and strategic thinking to emerge as the ultimate
            champions.
          </p>
          <div className="max-md:max-w-full">
            <div className="flex gap-x-10 max-md:flex-col">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
          <Button title="explore" btnColor="bg-purple-700" />
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
