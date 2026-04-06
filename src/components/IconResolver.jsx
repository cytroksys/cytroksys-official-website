import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Circle,
  CloudCog,
  CloudUpload,
  Code2,
  Fingerprint,
  Github,
  Headset,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Phone,
  Scaling,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'

const iconMap = {
  ArrowRight,
  BadgeCheck,
  Bot,
  CloudCog,
  CloudUpload,
  Code2,
  Fingerprint,
  Github,
  Headset,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Phone,
  Scaling,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
}

export function IconResolver({ name, ...props }) {
  const IconComponent = iconMap[name] ?? Circle
  return <IconComponent {...props} />
}

