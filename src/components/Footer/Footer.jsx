import React from 'react';
import "./Footer.css"
import img from "../../assets/images/logo/JUST_CSE_Club_logo_main.jpg"

const Footer = () => {
  return (
      <footer className="footer-color-custom footer text-base-content p-10">
      <aside>
        <img
          src={img}
          className="fill-current h-32"
        />
        <p className='text-white'>
          Dept of Computer Science and Engineering
          <br />
          Jashore University of Science and Technology
          <br />
          Jashore-7408, Bangladesh
        </p>
      </aside>
      <nav className='text-white'>
        <h6 className="footer-title">Learn More</h6>
        <a className="link link-hover">Terms of Use</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookie Policy</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Get Involved</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Club Constitution</a>
        <a className="link link-hover">Club Committee</a>
        <a className="link link-hover">Alumni Section</a>
        <a href='feedbacks/' className="link link-hover">Feedback</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Follow Us</h6>
        <a className="link link-hover" href='https://just.edu.bd/'>JUST</a>
        <a className="link link-hover" href='https://cse.just.edu.bd/'>CSE Department</a>
        <a className="link link-hover" href='https://www.facebook.com/just.cseclub'>Facebook</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Support Us</h6>
        <a className="link link-hover">Donation</a>
        <a className="link link-hover">Contact</a>
      </nav>

      <div className="w-full text-center text-white mt-10 border-t pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}
          &nbsp;
          <a href="https://www.linkedin.com/in/sakibsibly/" className='dev-name'>Nazmus Sakib Sibly</a>
          &nbsp;
          &
          &nbsp;
          <a href="https://www.linkedin.com/in/nomanstine/" className='dev-name'>Abdullah Al Noman</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
