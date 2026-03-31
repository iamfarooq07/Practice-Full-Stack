import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  Menu,
} from "lucide-react";
import { Link } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const cardHover = {
  whileHover: {
    y: -10,
    scale: 1.03,
    transition: { duration: 0.3 },
  },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Navbar */}
      <header className="relative z-50 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text"
          >
            Taskly
          </motion.h1>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition">
              Features
            </a>
            <a href="#stats" className="hover:text-cyan-400 transition">
              Stats
            </a>
          </nav>

          <div className="hidden md:flex gap-3">
            <Link
              to={"/login"}
              className="px-5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:scale-105 transition"
            >
              Get Started
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Smart Task Management for Everyone
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            Organize Your Day With{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
              Taskly
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 text-slate-300 text-lg leading-relaxed max-w-xl"
          >
            Taskly helps you manage daily tasks, boost productivity, and stay
            focused with a clean and modern todo experience built for speed.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button className="px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 font-semibold hover:scale-105 transition flex items-center gap-2">
              Start Managing <ArrowRight className="w-5 h-5" />
            </button>

            <button className="px-7 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              Explore Features
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-10 flex gap-8 text-sm text-slate-400"
          >
            <div>
              <h3 className="text-2xl font-bold text-white">10K+</h3>
              <p>Tasks Completed</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">5K+</h3>
              <p>Active Users</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">99%</h3>
              <p>Satisfaction</p>
            </div>
          </motion.div>
        </div>

        {/* Right / Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Today's Tasks</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                Productivity
              </span>
            </div>

            <div className="space-y-4">
              {[
                "Complete React project UI",
                "Push code to GitHub",
                "Plan tomorrow's tasks",
                "Review backend API routes",
              ].map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.5 }}
                  className="flex items-center justify-between bg-slate-900/70 border border-white/5 rounded-2xl p-4 hover:border-cyan-400/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-200">{task}</span>
                  </div>
                  <span className="text-xs text-slate-400">Done</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-400/10 rounded-2xl p-4">
                <p className="text-sm text-slate-300">Completed</p>
                <h4 className="text-2xl font-bold mt-1">24</h4>
              </div>
              <div className="bg-fuchsia-500/10 border border-fuchsia-400/10 rounded-2xl p-4">
                <p className="text-sm text-slate-300">Pending</p>
                <h4 className="text-2xl font-bold mt-1">06</h4>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-400 font-semibold mb-3">Features</p>
          <h2 className="text-3xl md:text-5xl font-black">
            Everything You Need to Stay Productive
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Manage your tasks, deadlines, and workflow in one beautiful place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle2 className="w-8 h-8 text-cyan-400" />,
              title: "Task Tracking",
              desc: "Create, update, and complete your daily tasks with ease.",
            },
            {
              icon: <Clock3 className="w-8 h-8 text-fuchsia-400" />,
              title: "Time Management",
              desc: "Prioritize what matters and stay ahead of deadlines.",
            },
            {
              icon: <LayoutDashboard className="w-8 h-8 text-emerald-400" />,
              title: "Smart Dashboard",
              desc: "Get an overview of all your productivity in one place.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...cardHover}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl"
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["95%", "User Productivity Boost"],
            ["50K+", "Tasks Managed"],
            ["24/7", "Access Anywhere"],
          ].map(([num, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="text-center bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl"
            >
              <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
                {num}
              </h3>
              <p className="mt-3 text-slate-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-2xl p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Ready to Take Control of Your Tasks?
          </h2>
          <p className="text-slate-300 mt-5 max-w-2xl mx-auto text-lg">
            Join Taskly and turn your messy to-do list into an organized,
            productive workflow.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 font-semibold hover:scale-105 transition">
              Get Started Now
            </button>
            <button className="px-8 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
            Taskly
          </h2>
          <p className="text-slate-400 text-sm">
            © 2026 Taskly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
