import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Next-Gen Authentication
          </h1>

          <p className="mt-6 text-lg md:text-xl opacity-80">
            Build secure, scalable and blazing-fast authentication systems with modern design and powerful features.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link className="btn btn-primary btn-lg shadow-lg" to='/signup'>Get Started</Link>
            <Link className="btn btn-outline btn-lg">View Demo</Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose This?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Ultra Secure",
              desc: "JWT + Refresh tokens with advanced protection layers.",
            },
            {
              title: "Blazing Fast",
              desc: "Optimized backend & frontend for real-time performance.",
            },
            {
              title: "Developer Friendly",
              desc: "Easy integration with MERN / Spring Boot APIs.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07, rotate: 1 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-secondary/40"
            >
              <div className="card bg-base-100 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="opacity-70">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "<100ms", label: "Response Time" },
            { value: "1M+", label: "Users Supported" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-10 rounded-2xl bg-base-200/60 backdrop-blur-xl shadow-lg"
            >
              <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
              <p className="mt-2 opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Simple Workflow
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {["Sign Up", "Verify Email", "Secure Access"].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold shadow-lg">
                {i + 1}
              </div>
              <p className="mt-4 text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold">
            Start Securing Your App Today
          </h2>
          <p className="mt-4 opacity-80">
            Modern authentication built for developers who care about performance and security.
          </p>
          <Link className="btn btn-primary btn-lg mt-6 shadow-xl" to="/login">
            Create Account
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
