import React from "react";

const About = () => {
  return (
    <div className="px-6 py-12 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      <p className="text-lg leading-relaxed">
        The <span className="font-semibold">Computer Science and Engineering Club</span> at{" "}
        <span className="font-semibold">Jashore University of Science and Technology (JUST)</span> is a 
        student-driven community dedicated to exploring the limitless possibilities of technology. Our club serves as 
        a hub for aspiring engineers, programmers, and innovators to collaborate, learn, and grow in the 
        ever-evolving field of computing.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
      <p className="text-lg leading-relaxed">
        We aim to cultivate a passion for technology by providing opportunities for students to engage in 
        hands-on projects, participate in hackathons, and sharpen their skills through competitive programming, 
        research, and open-source contributions. By fostering a culture of innovation and teamwork, we empower 
        our members to take on real-world challenges with confidence.
      </p>

      <h2 className="text-2xl font-semibold mt-8">What We Do</h2>
      <p className="text-lg leading-relaxed">
        At the CSE Club, we believe in <span className="font-semibold">learning by doing</span>. Our initiatives include:
      </p>
      <ul className="list-disc list-inside mt-4 space-y-3 text-lg">
        <li>
          <span className="font-semibold">Technical Workshops:</span> Gain insights into trending topics 
          such as Artificial Intelligence, Machine Learning, Cybersecurity, and Blockchain.
        </li>
        <li>
          <span className="font-semibold">Coding Competitions:</span> Challenge yourself with algorithmic 
          problem-solving and competitive programming contests.
        </li>
        <li>
          <span className="font-semibold">Industry Collaborations:</span> Connect with professionals, 
          attend guest lectures, and participate in internship opportunities.
        </li>
        <li>
          <span className="font-semibold">Project Development:</span> Work on real-world applications, 
          open-source contributions, and interdisciplinary projects.
        </li>
        <li>
          <span className="font-semibold">Tech Events & Seminars:</span> Stay updated with the latest trends 
          through expert-led sessions and knowledge-sharing events.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold  mt-8">Why Join Us?</h2>
      <p className="text-lg leading-relaxed">
        Whether you are a beginner looking to learn the basics of programming or an advanced developer eager to work 
        on cutting-edge technologies, the CSE Club at JUST provides a <span className="font-semibold">supportive and engaging</span> 
        environment. Our community encourages <span className="font-semibold">curiosity, teamwork, and problem-solving</span>, 
        helping students turn their ideas into impactful innovations.
      </p>

      <p className="text-center text-xl font-bold mt-8">
        🚀 Join us and take your tech skills to the next level! 🚀
      </p>
    </div>
  );
};

export default About;