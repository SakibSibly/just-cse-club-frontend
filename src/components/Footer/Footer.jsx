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
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav className='text-white'>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
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
