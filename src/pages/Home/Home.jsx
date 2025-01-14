import { useEffect, useState } from "react";
import './Home.css'; // Import the CSS for the background

const Home = () => {
  const images = import.meta.glob('../../assets/images/intro/*.{png,jpg,jpeg,webp}', { eager: true });
  const imagePaths = Object.values(images).map((mod) => mod.default);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagePaths.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [imagePaths.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % imagePaths.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + imagePaths.length) % imagePaths.length);

  if (imagePaths.length === 0) {
    return <div>No images found in the folder.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="carousel relative h-[70vh] overflow-hidden">
        {imagePaths.map((img, index) => (
          <div
            key={index}
            className={`carousel-item absolute w-full h-full ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button onClick={prevSlide} className="btn btn-circle bg-white/50 hover:bg-white/75">❮</button>
              <button onClick={nextSlide} className="btn btn-circle bg-white/50 hover:bg-white/75">❯</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">THE CSE CLUB OF JUST</h1>
          <h3 className="text-3xl font-bold text-left mb-8">
            Welcome to the Computer Science and Engineering Club at JUST
          </h3>
          <p className="text-lg text-gray-700 text-justify mt-2">
            At the CSE Club of Jashore University of Science and Technology (JUST), we are dedicated to nurturing the next generation of tech innovators. Our vision is to inspire creativity, foster collaboration, and empower students to lead in the fast-evolving world of technology.
            Through hands-on projects, coding competitions, workshops, and industry collaborations, we equip our members with the skills and knowledge needed to tackle real-world challenges. Whether it’s Artificial Intelligence, Machine Learning, Blockchain, or Cybersecurity, our club provides a dynamic environment for exploring cutting-edge technologies.
            Join us in pushing the boundaries of innovation, turning ideas into reality, and shaping the future of tech!
          </p>
          <p className="text-gray-500 text-sm mt-12">
            Best of Luck
          </p>
          <p className="text-gray-500 text-sm mt-5">
            Department of Computer Science and Engineering
          </p>
          <p className="text-gray-500 text-sm">
            JUST
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;