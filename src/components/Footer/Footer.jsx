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
          Department of Computer Science and Engineering
          <br />
          Jashore University of Science and Technology
          <br />
          Jashore-7408, Bangladesh
        </p>
      </aside>
      <nav className='text-white'>
        <h6 className="footer-title">Learn More</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Get Involved</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Club committee</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Follow Us</h6>
        <a className="link link-hover">JUST</a>
        <a className="link link-hover">CSE Department</a>
        <a className="link link-hover">Facebook</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Support Us</h6>
        <a className="link link-hover">Alumni section</a>
        <a className="link link-hover">Donation</a>
      </nav>

      <div className="w-full text-center text-white mt-10 border-t pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Nazmus Sakib Sibly & Abdullah Al Noman
        </p>
      </div>
    </footer>
  );
};

export default Footer;
