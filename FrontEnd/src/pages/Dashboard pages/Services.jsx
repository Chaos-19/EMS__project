import { useTheme } from '../../contexts/ThemeContext';

export default function Services() {
  const { theme } = useTheme();

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-4xl font-bold ${theme.text} mb-8`}>Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`${theme.card} rounded-lg p-6 shadow-lg`}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>
                {service.title}
              </h3>
              <p className={theme.textSecondary}>{service.description}</p>
            </div>
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