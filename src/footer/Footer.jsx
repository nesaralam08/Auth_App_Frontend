import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="mt-20 border-t border-base-300 bg-base-100/70 backdrop-blur-xl">
        

        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AuthX
            </h2>
            <p className="mt-3 text-sm opacity-70">
              Secure, scalable and futuristic authentication system for modern
              apps.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="hover:text-primary cursor-pointer">Features</li>
              <li className="hover:text-primary cursor-pointer">Pricing</li>
              <li className="hover:text-primary cursor-pointer">Security</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="hover:text-primary cursor-pointer">About</li>
              <li className="hover:text-primary cursor-pointer">Careers</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex gap-3">
              <Link className="btn btn-circle btn-outline">🌐</Link>
              <Link className="btn btn-circle btn-outline">🐙</Link>
              <Link className="btn btn-circle btn-outline">💼</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-sm py-4 border-t border-base-300 opacity-70">
          © {new Date().getFullYear()} AuthX. All rights reserved.
        </div>
      </footer>
    </>
  );
}
