import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function Services() {
  const { theme, isLightMode } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const glowAnimation = {
    boxShadow: isLightMode ? "0 0 15px rgba(128, 128, 128, 0.5)" : "0 0 15px rgba(255, 255, 255, 0.5)",
    transition: { duration: 0.3 }
  };

  return (
    <div className={`min-h-screen ${theme.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-4xl font-bold ${theme.text} mb-8`}>Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`${theme.card} rounded-lg p-6 shadow-lg`}
              whileHover={glowAnimation}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>
                {service.title}
              </h3>
              <p className={theme.textSecondary}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: "🎪",
    title: "Corporate Events",
    description: "Full-service corporate event planning and management."
  },
  {
    icon: "🤝",
    title: "Team Building",
    description: "Custom team building activities and workshops."
  },
  {
    icon: "🎓",
    title: "Training Sessions",
    description: "Professional development and training event organization."
  },
  {
    icon: "🎯",
    title: "Strategic Planning",
    description: "Strategic planning sessions and corporate retreats."
  },
  {
    icon: "🎉",
    title: "Company Celebrations",
    description: "Anniversary celebrations and milestone events."
  },
  {
    icon: "🤔",
    title: "Consulting",
    description: "Event planning consultation and advisory services."
  }
];