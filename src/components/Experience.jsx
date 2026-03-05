import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Briefcase, FileText, Database, Shield } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Medical Billing Specialist',
      company: 'Remote Services',
      period: '2023 - Present',
      description: 'Specializing in end-to-end Revenue Cycle Management (RCM) for US-based healthcare providers.',
      points: [
        'Accurate CPT & ICD-10 coding for multi-specialty practices.',
        'Efficient claim submission and AR follow-up.',
        'Denial management and appeal processing.',
        'HIPAA compliant data entry and patient record management.'
      ]
    }
  ];

  const skills = [
    { name: 'Revenue Cycle Management (RCM)', icon: <Briefcase /> },
    { name: 'ICD-10 & CPT Coding', icon: <FileText /> },
    { name: 'HIPAA Compliance', icon: <Shield /> },
    { name: 'EMR/EHR Systems', icon: <Database /> },
    { name: 'Claims Submission', icon: <CheckCircle2 /> },
    { name: 'Denial Management', icon: <Award /> },
  ];

  return (
    <div className="container mx-auto px-6 py-24 space-y-32">
      {/* Experience Section */}
      <section id="experience" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">My <span className="text-primary">Experience</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto">1+ year of professional experience in medical billing, helping clinics maximize their revenue efficiency.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border-l-4 border-l-primary shadow-lg"
            >
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{exp.title}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-400 font-medium">{exp.period}</span>
              </div>
              <p className="text-gray-600 mb-6">{exp.description}</p>
              <ul className="grid md:grid-cols-2 gap-4">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-primary shrink-0 w-5 h-5 mt-1" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Key <span className="text-primary">Skills</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Expertise in healthcare administration and billing technologies.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-6 rounded-2xl flex flex-col items-center gap-4 text-center group transition-all"
            >
              <div className="p-4 bg-medical-blue rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {skill.icon}
              </div>
              <span className="text-sm font-semibold">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;
