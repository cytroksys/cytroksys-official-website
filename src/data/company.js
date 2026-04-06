export const companyProfile = {
  name: 'Cytroksys Infotech',
  tagline: 'Engineering the Digital Future',
  website: 'https://suryaprakashinfo.in',
  founded: '2025',
  intro:
    'Cytroksys Infotech is a full-service IT partner helping growth-stage teams launch secure software, modernize infrastructure, and scale operations with confidence.',
  mission:
    'Deliver enterprise-grade engineering with startup speed, blending AI-powered automation with zero-trust security practices.',
  vision:
    'Become the most trusted innovation partner for businesses that need resilient digital systems without enterprise overhead.',
}

export const founder = {
  name: 'Suryaprakash',
  role: 'Founder & CEO',
  bio: 'Suryaprakash leads Cytroksys with a security-first mindset and a product engineering background focused on cloud-native delivery, performance, and long-term maintainability.',
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    key: 'web-app',
    title: 'Website & App Development',
    icon: 'Code2',
    accent: '#00F0FF',
    summary:
      'Custom web platforms, mobile apps, and conversion-focused UI/UX that turn product ideas into reliable digital experiences.',
    bullets: ['React and Node architecture', 'Mobile-first product flows', 'Scalable API integrations'],
  },
  {
    key: 'ai-agent',
    title: 'AI Agent Management',
    icon: 'Bot',
    accent: '#7B2FFF',
    summary:
      'Build, deploy, and manage AI-powered agents that automate repetitive workflows while preserving governance and quality.',
    bullets: ['LLM workflow design', 'Agent observability', 'Automation playbooks'],
  },
  {
    key: 'firewall',
    title: 'Firewall Management',
    icon: 'ShieldCheck',
    accent: '#FF8A3D',
    summary:
      'Battle-tested firewall administration for threat prevention, policy hardening, and continuous network rule optimization.',
    bullets: ['Rule lifecycle governance', 'Threat intel updates', 'Incident response support'],
  },
  {
    key: 'cloud-mgmt',
    title: 'Cloud Management',
    icon: 'CloudCog',
    accent: '#2EE6A6',
    summary:
      '24/7 cloud operations across GCP, Azure, and AWS with cost governance, uptime monitoring, and proactive tuning.',
    bullets: ['Cloud reliability engineering', 'FinOps controls', 'Infrastructure hardening'],
  },
  {
    key: 'migration',
    title: 'Cloud Migration',
    icon: 'CloudUpload',
    accent: '#FFD166',
    summary:
      'Zero-downtime migration planning for on-prem systems, lift-and-shift workloads, and strategic re-architecting.',
    bullets: ['Readiness assessment', 'Phased migration rollout', 'Post-migration optimization'],
  },
  {
    key: 'hybrid',
    title: 'Hybrid Cloud Solutions',
    icon: 'Network',
    accent: '#5A8CFF',
    summary:
      'Unify on-prem and multi-cloud environments with secure connectivity, centralized observability, and policy control.',
    bullets: ['Multi-cloud architecture', 'Unified workload orchestration', 'Resilience planning'],
  },
  {
    key: 'security-audit',
    title: 'Security Audits',
    icon: 'Fingerprint',
    accent: '#FF4D9A',
    summary:
      'Comprehensive security audits, penetration testing, and compliance-aligned remediation for zero-trust readiness.',
    bullets: ['Vulnerability assessment', 'Compliance checkpoints', 'Executive risk reporting'],
  },
]

export const valueProps = [
  {
    title: 'Expertise That Ships',
    icon: 'BadgeCheck',
    accent: '#00F0FF',
    description:
      'Cross-functional teams that design, build, and operate digital products with measurable business outcomes.',
  },
  {
    title: 'Security-First DNA',
    icon: 'Shield',
    accent: '#FF8A3D',
    description:
      'Zero-trust architecture, hardened environments, and compliance-aware engineering at every delivery stage.',
  },
  {
    title: 'Built for Scalability',
    icon: 'Scaling',
    accent: '#7B2FFF',
    description:
      'Cloud-native foundations that stay fast and stable as traffic, data, and operational complexity grow.',
  },
  {
    title: '24/7 Operational Support',
    icon: 'Headset',
    accent: '#2EE6A6',
    description:
      'Always-on monitoring and response so your platform remains available, resilient, and business-ready.',
  },
]

export const techStack = [
  { name: 'React', icon: 'Atom', color: '#61DAFB', category: 'Frontend' },
  { name: 'Node.js', icon: 'Server', color: '#68A063', category: 'Backend' },
  { name: 'Python', icon: 'Braces', color: '#3776AB', category: 'Automation' },
  { name: 'GCP', icon: 'Globe', color: '#4285F4', category: 'Cloud' },
  { name: 'AWS', icon: 'Cloud', color: '#FF9900', category: 'Cloud' },
  { name: 'Azure', icon: 'Layers', color: '#0089D6', category: 'Cloud' },
  { name: 'Docker', icon: 'Boxes', color: '#2496ED', category: 'Containers' },
  { name: 'Kubernetes', icon: 'Workflow', color: '#326CE5', category: 'Orchestration' },
  { name: 'TensorFlow', icon: 'BrainCircuit', color: '#FF6F00', category: 'AI/ML' },
  { name: 'PostgreSQL', icon: 'Database', color: '#336791', category: 'Database' },
  { name: 'Redis', icon: 'Cpu', color: '#DC382D', category: 'Caching' },
  { name: 'TypeScript', icon: 'FileCode2', color: '#3178C6', category: 'Language' },
]

export const caseStudies = [
  {
    title: 'AI Support Copilot for SaaS Platform',
    outcome:
      'Reduced repetitive support load by 43% with an AI-powered triage and response assistant integrated into existing tooling.',
    metrics: '43% lower support handling time',
  },
  {
    title: 'Hybrid Cloud Uptime Modernization',
    outcome:
      'Migrated critical workloads from on-prem to hybrid cloud architecture with staged failover and zero customer-impact incidents.',
    metrics: '99.97% uptime after migration',
  },
  {
    title: 'Zero-Trust Security Retrofit',
    outcome:
      'Implemented firewall policy segmentation and quarterly audit cycles for a distributed team handling regulated workloads.',
    metrics: '68% fewer high-risk vulnerabilities',
  },
]

export const testimonials = [
  {
    name: 'Diana Chen',
    role: 'CTO, Orbitlane Systems',
    accent: '#00F0FF',
    quote:
      'Cytroksys brought startup speed with enterprise discipline. Their engineering and security rigor gave us confidence to scale globally.',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of IT, Finware Labs',
    accent: '#2EE6A6',
    quote:
      'Their hybrid cloud strategy stabilized our infrastructure and improved visibility across environments within weeks.',
  },
  {
    name: 'Marcus Keller',
    role: 'Product Director, Nova Commercium',
    accent: '#FF4D9A',
    quote:
      'From audit to implementation, Cytroksys delivered clear execution, transparent communication, and measurable outcomes.',
  },
]

export const contactDetails = {
  email: 'hello@cytroksys.com',
  phone: '+1 (800) 555-TECH',
  location: 'Silicon Valley, CA / Remote',
  whatsapp: '18005558324',
}

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'Linkedin' },
  { label: 'X', href: 'https://x.com', icon: 'X' },
  { label: 'GitHub', href: 'https://github.com', icon: 'Github' },
]
