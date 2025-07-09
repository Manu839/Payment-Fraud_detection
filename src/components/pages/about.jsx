
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Activity,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import SidebarContent from "./SidebarContent";

const About = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 flex-col border-r border-green-200 bg-green-100">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 bg-gradient-to-br from-green-50 to-green-100 text-gray-800 px-6 py-12"
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            About SafePayAI
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            SafePayAI is a next-generation fraud detection platform leveraging
            artificial intelligence to protect digital transactions in real-time.
          </p>
        </div>

  {/* Mission Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <ShieldCheck className="text-green-500" /> Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to ensure secure and seamless digital transactions by equipping users and systems with intelligent, automated fraud detection tools. SafePayAI empowers payment platforms with smart monitoring and early warning mechanisms to detect anomalies before damage is done.
        </p>
      </section>

      {/* Technology Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <Cpu className="text-green-500" /> Powered by AI & Machine Learning
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          SafePayAI integrates advanced AI models to monitor, detect, and mitigate fraudulent transactions:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-1">
          <li><strong>Generative Adversarial Networks (GANs):</strong> Synthetic data generation for training robust models.</li>
          <li><strong>Random Forest Classifier:</strong> Accurate classification with over <span className="font-semibold text-green-700">95% fraud detection accuracy</span>.</li>
          <li><strong>Real-time Predictions:</strong> Instant detection and alert mechanisms to stop fraud as it happens.</li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <Activity className="text-green-500" /> Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-green-200 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700">Real-Time Fraud Detection</h3>
            <p className="text-sm text-gray-600 mt-2">
              Instantly detects suspicious patterns and alerts users before the transaction is completed.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-green-200 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700">Smart Dashboard</h3>
            <p className="text-sm text-gray-600 mt-2">
              A user-friendly dashboard with visualizations, analytics, and fraud history for better insights.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-green-200 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700">Google Authentication</h3>
            <p className="text-sm text-gray-600 mt-2">
              Seamless Google Sign-In and secure access control for trusted users.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-green-200 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700">Adaptable to UPI and Beyond</h3>
            <p className="text-sm text-gray-600 mt-2">
              Easily integrates with modern payment systems like UPI and can be scaled across platforms.
            </p>
          </Card>
        </div>
      </section>

      {/* Why SafePayAI Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <TrendingUp className="text-green-500" /> Why SafePayAI Stands Out
        </h2>
        <ul className="list-none space-y-4 text-gray-700">
          <li>
            🚀 <strong>Innovative Approach:</strong> Combined GANs and Random Forests to achieve <span className="font-semibold text-green-700">95% fraud detection accuracy</span>.
          </li>
          <li>
            🌍 <strong>Real-World Applicability:</strong> A scalable, future-proof detection model designed for UPI and modern payment ecosystems.
          </li>
          <li>
            👩‍💻 <strong>User-Centric Design:</strong> Clean UI, easy Google Sign-In, live status alerts, and complete control.
          </li>
        </ul>
      </section>
      </motion.div>
    </div>
  );
};

export default About;
