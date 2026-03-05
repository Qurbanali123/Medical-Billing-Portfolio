import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronDown, ArrowRight, ShieldCheck,
  User, FileText, Cpu, CreditCard, CheckCircle2,
  TrendingUp, Clock, Award, Star, Briefcase, Phone,
  Mail, MapPin, ChevronRight, BarChart2, Zap, Heart,
  DollarSign, Activity, BookOpen, Target, Users, ThumbsUp
} from "lucide-react";

/* ══════════════════════════════════════════
   TYPEWRITER HOOK
══════════════════════════════════════════ */
const useTypewriter = (text, speed = 80, startDelay = 800) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let t;
    let i = 0;
    setDisplayed(""); setDone(false);
    t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text]);
  return { displayed, done };
};

/* ══════════════════════════════════════════
   FADE-IN ON SCROLL
══════════════════════════════════════════ */
const FadeIn = ({ children, delay = 0, direction = "up", style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 32 : direction === "down" ? -32 : 0, x: direction === "left" ? 32 : direction === "right" ? -32 : 0 },
    show: { opacity: 1, y: 0, x: 0, transition: { delay, duration: 0.65, type: "spring", stiffness: 70, damping: 18 } },
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "show" : "hidden"} style={style}>
      {children}
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   RCM FLOW
══════════════════════════════════════════ */
const steps = [
  { id: 1, icon: User,         label: "Patient\nReg.",    short: "01" },
  { id: 2, icon: FileText,     label: "Claim\nSubmit",    short: "02" },
  { id: 3, icon: Cpu,          label: "Insurance\nProc.", short: "03" },
  { id: 4, icon: CreditCard,   label: "Payment\nPost",    short: "04" },
  { id: 5, icon: CheckCircle2, label: "AR\nFollow-up",    short: "05" },
];

const ConnectorLine = ({ delay }) => (
  <div style={{ flex: 1, position: "relative", height: 2, margin: "0 -1px" }}>
    <div style={{ position: "absolute", inset: 0, background: "#dbeafe", borderRadius: 2 }} />
    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#2563eb,#60a5fa)", borderRadius: 2, transformOrigin: "left", boxShadow: "0 0 6px rgba(59,130,246,.35)" }} />
    <motion.div
      animate={{ left: ["0%","100%","0%"] }}
      transition={{ delay: delay + 0.55, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "50%", transform: "translate(-50%,-50%)", width: 7, height: 7, borderRadius: "50%", background: "#1d4ed8", boxShadow: "0 0 8px rgba(37,99,235,.55)" }} />
  </div>
);

const StepNode = ({ step, index, small }) => {
  const Icon = step.icon;
  const sz = small ? 46 : 58;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.25, type: "spring", stiffness: 80, damping: 16 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
      <motion.div whileHover={{ scale: 1.08 }}
        style={{ width: sz, height: sz, borderRadius: "50%", background: "linear-gradient(145deg,#eff6ff,#dbeafe)", border: "2px solid #93c5fd", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 4px 12px rgba(59,130,246,.14)", cursor: "default", flexShrink: 0 }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "1.5px dashed #bfdbfe" }} />
        <Icon size={small ? 17 : 21} color="#2563eb" strokeWidth={1.8} />
        <div style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, borderRadius: "50%", background: "#2563eb", border: "2px solid #f0f6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono', monospace" }}>{step.short}</div>
      </motion.div>
      <div style={{ textAlign: "center", fontSize: small ? 9 : 11, fontWeight: 700, color: "#1e40af", lineHeight: 1.4, whiteSpace: "pre", fontFamily: "'Sora', sans-serif" }}>{step.label}</div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   HERO DIAGRAM
══════════════════════════════════════════ */
const RCMDiagram = ({ small }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 3200); return () => clearInterval(id); }, []);
  const bars = [65, 80, 55, 90, 72, 88, 95];
  return (
    <motion.div initial={{ opacity: 0, y: small ? 20 : 0, x: small ? 0 : 28 }} animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: small ? 14 : 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, color: "#2563eb", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>Revenue Cycle Management</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginTop: 2, fontFamily: "'Sora', sans-serif" }}>End-to-End Billing Flow</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 999, padding: "3px 10px" }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 5px #16a34a" }} />
          <span style={{ fontSize: 9, color: "#15803d", fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>LIVE</span>
        </div>
      </div>
      <div style={{ background: "#f8faff", border: "1.5px solid #dbeafe", borderRadius: 16, padding: small ? "18px 12px" : "24px 18px", boxShadow: "0 4px 20px rgba(59,130,246,.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", width: "70%", height: 50, background: "radial-gradient(ellipse,rgba(59,130,246,.06),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <StepNode step={step} index={i} small={small} />
              {i < steps.length - 1 && <ConnectorLine delay={i * 0.1 + 0.5} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: "#475569", fontWeight: 700, fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em" }}>CLAIM ACTIVITY</span>
          <span style={{ fontSize: 9, color: "#2563eb", fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>Last 7 days</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 40 }}>
          {bars.map((h, i) => (
            <motion.div key={`${tick}-${i}`} initial={{ height: 0 }} animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
              style={{ flex: 1, background: i === 6 ? "linear-gradient(to top,#1d4ed8,#60a5fa)" : "linear-gradient(to top,#bfdbfe,#dbeafe)", borderRadius: "3px 3px 0 0", boxShadow: i === 6 ? "0 0 10px rgba(37,99,235,.3)" : "none" }} />
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 4 }}>
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 8, color: "#94a3b8", fontFamily: "'Space Mono', monospace" }}>{d}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[{ v:"98.4%",l:"Clean Claim Rate",s:"↑ 2.1% this month" },{ v:"$1.2M",l:"Revenue Processed",s:"Monthly average" },{ v:"< 24h",l:"Turnaround Time",s:"Avg submission" }].map((m, i) => (
          <div key={i} style={{ background: "#fff", border: "1.5px solid #bfdbfe", borderRadius: 14, padding: "14px 16px", flex: 1, minWidth: 0, boxShadow: "0 2px 12px rgba(59,130,246,.08)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 48, height: 48, background: "radial-gradient(circle,rgba(59,130,246,.09),transparent 70%)", borderRadius: "0 14px 0 0" }} />
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1d4ed8", fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 600, marginTop: 4 }}>{m.l}</div>
            <div style={{ fontSize: 9, color: "#64748b", marginTop: 2 }}>{m.s}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   SECTION WRAPPER
══════════════════════════════════════════ */
const Section = ({ children, bg = "#fff", style = {} }) => (
  <section style={{ background: bg, padding: "80px 24px", position: "relative", overflow: "hidden", ...style }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>{children}</div>
  </section>
);

const SectionTitle = ({ label, title, sub }) => (
  <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
    <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: "#2563eb", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", background: "#dbeafe", padding: "5px 16px", borderRadius: 999, marginBottom: 14 }}>{label}</div>
    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>{title}</h2>
    {sub && <p style={{ fontSize: 17, color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
  </FadeIn>
);

/* ══════════════════════════════════════════
   STATS STRIP
══════════════════════════════════════════ */
const statsData = [
  { icon: TrendingUp, value: "98.4%", label: "Clean Claim Rate", color: "#2563eb" },
  { icon: DollarSign, value: "$1.2M+", label: "Revenue Recovered", color: "#0891b2" },
  { icon: Clock,      value: "< 24h",  label: "Avg Turnaround",   color: "#7c3aed" },
  { icon: Users,      value: "50+",    label: "Providers Served", color: "#059669" },
  { icon: Activity,   value: "30%",    label: "Revenue Growth",   color: "#dc2626" },
  { icon: ThumbsUp,   value: "100%",   label: "Client Retention", color: "#d97706" },
];

const StatsStrip = () => (
  <section style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)", padding: "48px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
      {statsData.map((s, i) => {
        const Icon = s.icon;
        return (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Icon size={22} color="#fff" strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 6, fontWeight: 600 }}>{s.label}</div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  </section>
);

/* ══════════════════════════════════════════
   SERVICES SECTION
══════════════════════════════════════════ */
const services = [
  { icon: FileText,  title: "Medical Billing",         desc: "End-to-end claim submission, tracking, and follow-up to ensure maximum reimbursement with zero revenue leakage.",           tag: "Core Service", color: "#2563eb" },
  { icon: TrendingUp, title: "Revenue Cycle Mgmt",     desc: "Comprehensive RCM solutions covering patient intake to final payment, optimizing every stage of the billing cycle.",        tag: "RCM",          color: "#7c3aed" },
  { icon: CheckCircle2, title: "Denial Management",    desc: "Proactive identification, analysis, and resubmission of denied claims to recover lost revenue efficiently.",                tag: "Recovery",     color: "#059669" },
  { icon: Cpu,       title: "Insurance Verification",  desc: "Real-time eligibility checks and prior authorization to prevent denials before they happen.",                              tag: "Prevention",   color: "#0891b2" },
  { icon: BarChart2, title: "AR Follow-up",            desc: "Systematic accounts receivable management to reduce aging buckets and accelerate cash flow for your practice.",            tag: "Collections",  color: "#d97706" },
  { icon: BookOpen,  title: "Medical Coding",          desc: "Accurate ICD-10, CPT, and HCPCS coding with compliance-first approach to maximize clean claim submissions.",               tag: "Compliance",   color: "#dc2626" },
];

const ServiceCard = ({ svc, delay }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;
  return (
    <FadeIn delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -6 : 0, boxShadow: hovered ? `0 20px 48px rgba(37,99,235,0.16)` : "0 4px 16px rgba(0,0,0,0.06)" }}
        transition={{ duration: 0.25 }}
        style={{ background: "#fff", border: `1.5px solid ${hovered ? svc.color + "55" : "#e2e8f0"}`, borderRadius: 20, padding: "28px 24px", height: "100%", cursor: "default", transition: "border-color 0.25s", position: "relative", overflow: "hidden" }}
      >
        {/* Top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${svc.color}, ${svc.color}88)`, borderRadius: "20px 20px 0 0", opacity: hovered ? 1 : 0, transition: "opacity 0.25s" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: svc.color + "15", border: `1.5px solid ${svc.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={24} color={svc.color} strokeWidth={1.8} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: svc.color, background: svc.color + "12", padding: "4px 10px", borderRadius: 999, fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em" }}>{svc.tag}</span>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 10px", fontFamily: "'Sora', sans-serif" }}>{svc.title}</h3>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0 }}>{svc.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 18, color: svc.color, fontSize: 13, fontWeight: 600 }}>
          Learn More <ChevronRight size={15} />
        </div>
      </motion.div>
    </FadeIn>
  );
};

/* ══════════════════════════════════════════
   EXPERTISE / SKILLS SECTION
══════════════════════════════════════════ */
const skills = [
  { name: "ICD-10 / CPT Coding",       pct: 96 },
  { name: "Insurance Eligibility",     pct: 94 },
  { name: "Denial Management",         pct: 92 },
  { name: "EOB Interpretation",        pct: 95 },
  { name: "AR Follow-up",              pct: 90 },
  { name: "EHR / Billing Software",    pct: 88 },
];

const SkillBar = ({ skill, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1e3a8a", fontFamily: "'Sora', sans-serif" }}>{skill.name}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", fontFamily: "'Space Mono', monospace" }}>{skill.pct}%</span>
      </div>
      <div style={{ height: 8, background: "#dbeafe", borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.pct}%` : 0 }}
          transition={{ delay: delay + 0.2, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ height: "100%", background: "linear-gradient(90deg,#2563eb,#60a5fa)", borderRadius: 99, boxShadow: "0 0 8px rgba(59,130,246,0.35)" }}
        />
      </div>
    </div>
  );
};

const softSkills = ["Detail-Oriented", "HIPAA Expertise", "Quick Learner", "Team Player", "Problem Solver", "Communication", "Time Management", "Analytical"];

/* ══════════════════════════════════════════
   EXPERIENCE SECTION (TIMELINE)
══════════════════════════════════════════ */
const experiences = [
  {
    role: "Medical Billing Specialist",
    company: "HealthFirst Billing Solutions",
    period: "2023 – Present",
    type: "Full-time",
    color: "#2563eb",
    points: ["Processed 500+ claims monthly with a 98.4% clean claim rate", "Reduced AR aging by 35% through proactive follow-up strategies", "Trained 3 junior billers on ICD-10 coding best practices"],
  },
  {
    role: "Billing & Coding Intern",
    company: "MediCare Associates",
    period: "2022 – 2023",
    type: "Internship",
    color: "#7c3aed",
    points: ["Assisted in processing 200+ insurance verifications weekly", "Supported denial management team recovering $80K in 6 months", "Maintained 100% accuracy in CPT and ICD-10 code assignments"],
  },
];

const TimelineCard = ({ exp, delay, idx }) => (
  <FadeIn delay={delay} direction={idx % 2 === 0 ? "right" : "left"}>
    <div style={{ position: "relative", paddingLeft: 32 }}>
      <div style={{ position: "absolute", left: 0, top: 24, width: 14, height: 14, borderRadius: "50%", background: exp.color, border: "3px solid #fff", boxShadow: `0 0 0 3px ${exp.color}44`, zIndex: 1 }} />
      <div style={{ position: "absolute", left: 6, top: 38, bottom: -24, width: 2, background: "#e2e8f0" }} />
      <motion.div
        whileHover={{ x: 4 }}
        style={{ background: "#fff", border: `1.5px solid #e2e8f0`, borderRadius: 18, padding: "24px 24px 20px", boxShadow: "0 4px 18px rgba(0,0,0,0.06)", marginBottom: 24 }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 4px", fontFamily: "'Sora', sans-serif" }}>{exp.role}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Briefcase size={13} color="#64748b" />
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{exp.company}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: exp.color, background: exp.color + "12", padding: "3px 10px", borderRadius: 999, fontFamily: "'Space Mono', monospace" }}>{exp.type}</span>
            <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'Space Mono', monospace" }}>{exp.period}</span>
          </div>
        </div>
        <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {exp.points.map((pt, i) => (
            <li key={i} style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.6 }}>{pt}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  </FadeIn>
);

/* ══════════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════════ */
const certs = [
  { title: "Certified Professional Biller",      org: "AAPC",        year: "2023", icon: Award,    color: "#2563eb" },
  { title: "ICD-10-CM Proficiency Certificate",  org: "AHIMA",       year: "2023", icon: BookOpen, color: "#7c3aed" },
  { title: "HIPAA Compliance Certification",     org: "HCCA",        year: "2022", icon: ShieldCheck, color: "#059669" },
  { title: "Medical Coding Specialist",          org: "AMCI",        year: "2022", icon: Target,   color: "#0891b2" },
];

const CertCard = ({ cert, delay }) => {
  const Icon = cert.icon;
  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(37,99,235,0.14)" }}
        transition={{ duration: 0.22 }}
        style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 18, padding: "24px 20px", boxShadow: "0 4px 14px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "flex-start" }}
      >
        <div style={{ width: 50, height: 50, borderRadius: 14, background: cert.color + "15", border: `1.5px solid ${cert.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={22} color={cert.color} strokeWidth={1.8} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", fontFamily: "'Sora', sans-serif", marginBottom: 4 }}>{cert.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: cert.color, fontWeight: 600 }}>{cert.org}</span>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>•</span>
            <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'Space Mono', monospace" }}>{cert.year}</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <CheckCircle2 size={20} color={cert.color} />
        </div>
      </motion.div>
    </FadeIn>
  );
};

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
const testimonials = [
  { name: "Dr. Sarah Mitchell", role: "Family Physician, NY",    rating: 5, text: "Sohaib transformed our billing process completely. Our clean claim rate jumped from 82% to 97% within three months. Absolutely outstanding work." },
  { name: "Dr. James Kovacs",   role: "Cardiologist, CA",        rating: 5, text: "The most reliable medical biller I've worked with. Denials dropped by 40% and our revenue cycle has never been smoother. Highly recommended." },
  { name: "Admin Team Lead",    role: "Multi-Specialty Clinic",  rating: 5, text: "Sohaib's expertise in ICD-10 coding and AR follow-up saved us over $60,000 in recovered claims. A true asset to any practice." },
];

const TestimonialCard = ({ t, delay }) => (
  <FadeIn delay={delay}>
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(37,99,235,0.13)" }}
      transition={{ duration: 0.22 }}
      style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 16, height: "100%" }}
    >
      <div style={{ display: "flex", gap: 3 }}>
        {Array(t.rating).fill(0).map((_, i) => (
          <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
        ))}
      </div>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>"{t.text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#dbeafe,#eff6ff)", border: "2px solid #93c5fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={18} color="#2563eb" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>{t.role}</div>
        </div>
      </div>
    </motion.div>
  </FadeIn>
);

/* ══════════════════════════════════════════
   SOFTWARE TOOLS
══════════════════════════════════════════ */
const tools = [
  { name: "Kareo",       category: "Billing", color: "#2563eb" },
  { name: "AdvancedMD",  category: "EHR",     color: "#7c3aed" },
  { name: "Athenahealth",category: "EHR",     color: "#059669" },
  { name: "DrChrono",    category: "Billing", color: "#0891b2" },
  { name: "CollaborateMD",category:"RCM",     color: "#d97706" },
  { name: "NueMD",       category: "Billing", color: "#dc2626" },
  { name: "Office Ally", category: "Claims",  color: "#2563eb" },
  { name: "eClinicalWorks",category:"EHR",    color: "#7c3aed" },
];

/* ══════════════════════════════════════════
   CONTACT SECTION
══════════════════════════════════════════ */
const ContactCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(37,99,235,0.14)" }}
    transition={{ duration: 0.22 }}
    style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 18, padding: "24px 22px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 4px 14px rgba(0,0,0,0.05)" }}
  >
    <div style={{ width: 50, height: 50, borderRadius: 14, background: color + "15", border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={22} color={color} strokeWidth={1.8} />
    </div>
    <div>
      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, color: "#0f172a", fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>{value}</div>
    </div>
  </motion.div>
);

/* ══════════════════════════════════════════
   MAIN PORTFOLIO
══════════════════════════════════════════ */
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { displayed: typedName, done: nameDone } = useTypewriter("Sohaib Khalid", 90, 1000);

  const containerAnim = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.18 } } };
  const itemAnim = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 75, damping: 16 } } };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: #f0f6ff; font-family: 'Sora', sans-serif; }
        .cursor { display: inline-block; width: 3px; height: 0.85em; background: #2563eb; margin-left: 3px; vertical-align: middle; border-radius: 2px; animation: blink 0.75s step-end infinite; }
        .cursor.gone { display: none; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .certs-grid    { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .testi-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .tools-wrap    { display: flex; flex-wrap: wrap; gap: 12px; }
        .contact-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .two-col       { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .hero-grid     { display: grid; grid-template-columns: 1fr 1.15fr; gap: 56px; align-items: center; }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2,1fr); }
          .testi-grid    { grid-template-columns: repeat(2,1fr); }
          .certs-grid    { grid-template-columns: 1fr; }
          .contact-grid  { grid-template-columns: 1fr; }
          .two-col       { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .testi-grid    { grid-template-columns: 1fr; }
          .hero-grid     { grid-template-columns: 1fr; gap: 36px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "90px 20px 60px" : "80px 32px 60px", background: "#f0f6ff", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 75% 40%,rgba(59,130,246,.13) 0%,transparent 70%),radial-gradient(ellipse 50% 45% at 15% 70%,rgba(37,99,235,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,#93c5fd 1px,transparent 1px)", backgroundSize: "32px 32px", opacity: 0.28, pointerEvents: "none" }} />

        <div className="hero-grid" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1280 }}>
          <motion.div variants={containerAnim} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 26 }}>
            <motion.div variants={itemAnim} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 999, background: "#dbeafe", border: "1.5px solid #93c5fd", color: "#1d4ed8", fontSize: isMobile ? 11 : 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", width: "fit-content", boxShadow: "0 2px 8px rgba(59,130,246,.12)" }}>
              <ShieldCheck size={13} color="#2563eb" /> Certified Medical Biller
            </motion.div>
            <motion.div variants={itemAnim}>
              <h1 style={{ fontSize: isMobile ? "clamp(32px,9vw,48px)" : "clamp(40px,5vw,70px)", fontWeight: 800, lineHeight: 1.08, color: "#0f172a", letterSpacing: "-0.025em", margin: 0, fontFamily: "'Sora', sans-serif" }}>
                Hi, I'm{" "}
                <span style={{ background: "linear-gradient(135deg,#2563eb 0%,#3b82f6 55%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {typedName}
                </span>
                <span className={`cursor ${nameDone ? "gone" : ""}`} />
              </h1>
            </motion.div>
            <motion.p variants={itemAnim} style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.75, color: "#334155", maxWidth: 430, margin: 0 }}>
              Maximizing revenue and streamlining clinical workflows with{" "}
              <strong style={{ color: "#1d4ed8", fontWeight: 700 }}>1+ year of expertise</strong>{" "}
              in Medical Billing and RCM services.
            </motion.p>
            <motion.div variants={itemAnim} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["HIPAA Compliant", "EOB Expert", "ICD-10 Certified"].map((t, i) => (
                <div key={i} style={{ padding: "5px 12px", borderRadius: 999, background: "#fff", border: "1.5px solid #bfdbfe", fontSize: 10, fontWeight: 600, color: "#1e40af", fontFamily: "'Space Mono', monospace", boxShadow: "0 1px 4px rgba(59,130,246,.1)" }}>{t}</div>
              ))}
            </motion.div>
            <motion.div variants={itemAnim} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: isMobile ? "12px 26px" : "14px 34px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: "none", boxShadow: "0 6px 24px rgba(37,99,235,.32)", fontFamily: "'Sora', sans-serif", border: "none" }}>
                Hire Me <ArrowRight size={17} />
              </a>
              <a href="#services" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 26px", background: "#fff", color: "#2563eb", fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: "none", border: "2px solid #bfdbfe", fontFamily: "'Sora', sans-serif", boxShadow: "0 2px 10px rgba(59,130,246,.1)" }}>
                View Work
              </a>
            </motion.div>
          </motion.div>
          <div><RCMDiagram small={isMobile} /></div>
        </div>
        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)" }}>
          <motion.div animate={{ y: [0,8,0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={26} color="#93c5fd" />
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <StatsStrip />

      {/* ── SERVICES ── */}
      <Section bg="#f8faff" id="services">
        <SectionTitle label="What I Offer" title="Comprehensive Billing Services" sub="From claim submission to payment posting — every step handled with precision and care." />
        <div className="services-grid">
          {services.map((svc, i) => <ServiceCard key={i} svc={svc} delay={i * 0.07} />)}
        </div>
      </Section>

      {/* ── EXPERTISE & SKILLS ── */}
      <Section bg="#fff">
        <SectionTitle label="Expertise" title="Skills & Proficiency" sub="Years of focused practice across all areas of medical billing and revenue cycle management." />
        <div className="two-col">
          <div>
            {skills.map((s, i) => <SkillBar key={i} skill={s} delay={i * 0.08} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <FadeIn direction="left">
              <div style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1.5px solid #bfdbfe", borderRadius: 20, padding: "28px 24px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e3a8a", margin: "0 0 16px", fontFamily: "'Sora', sans-serif" }}>Soft Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {softSkills.map((s, i) => (
                    <span key={i} style={{ padding: "6px 14px", background: "#fff", border: "1.5px solid #bfdbfe", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "#2563eb" }}>{s}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac", borderRadius: 20, padding: "24px" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#16a34a20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Zap size={26} color="#16a34a" />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#14532d", fontFamily: "'Sora', sans-serif" }}>Available for New Projects</div>
                    <div style={{ fontSize: 13, color: "#15803d", marginTop: 3 }}>Open to freelance & full-time opportunities</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.25}>
              <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 20, padding: "24px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: "0 0 14px", fontFamily: "'Sora', sans-serif" }}>Software Tools</h3>
                <div className="tools-wrap">
                  {tools.map((t, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.05, y: -2 }} style={{ padding: "5px 13px", background: t.color + "10", border: `1.5px solid ${t.color}30`, borderRadius: 999, fontSize: 11, fontWeight: 700, color: t.color, cursor: "default" }}>{t.name}</motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section bg="#f8faff">
        <SectionTitle label="Experience" title="Professional Journey" sub="A track record of delivering results and building reliable billing operations." />
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {experiences.map((exp, i) => <TimelineCard key={i} exp={exp} delay={i * 0.12} idx={i} />)}
        </div>
      </Section>

      {/* ── CERTIFICATIONS ── */}
      <Section bg="#fff">
        <SectionTitle label="Credentials" title="Certifications & Training" sub="Backed by industry-recognized credentials and a commitment to continuous learning." />
        <div className="certs-grid">
          {certs.map((c, i) => <CertCard key={i} cert={c} delay={i * 0.09} />)}
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section bg="#f8faff">
        <SectionTitle label="Testimonials" title="What Clients Say" sub="Real feedback from healthcare providers who have experienced the difference." />
        <div className="testi-grid">
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} delay={i * 0.1} />)}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section bg="#fff" id="contact">
        <SectionTitle label="Get In Touch" title="Ready to Work Together?" sub="Let's discuss how I can help streamline your billing and maximize your revenue." />
        <div className="contact-grid">
          <ContactCard icon={Mail}    label="Email"    value="sohaib@billing.com"  color="#2563eb" />
          <ContactCard icon={Phone}   label="Phone"    value="+1 (555) 123-4567"   color="#059669" />
          <ContactCard icon={MapPin}  label="Location" value="Available Remotely"  color="#7c3aed" />
        </div>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="mailto:sohaib@billing.com" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", fontSize: 16, fontWeight: 700, borderRadius: 14, textDecoration: "none", boxShadow: "0 8px 28px rgba(37,99,235,.35)", fontFamily: "'Sora', sans-serif", border: "none" }}>
              <Mail size={18} /> Send a Message
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", padding: "36px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Sora', sans-serif", marginBottom: 8 }}>Sohaib Khalid</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>Certified Medical Biller & RCM Specialist</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          {["Services","Skills","Experience","Certifications","Testimonials","Contact"].map((l, i) => (
            <a key={i} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>© 2024 Sohaib Khalid · All rights reserved</div>
      </footer>
    </>
  );
};

export default Hero;
