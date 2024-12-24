import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function About() {
  const { theme } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const shakeAnimation = {
    scale: 1.05,
    rotate: [0, 2, -2, 2, -2, 0],
    transition: { duration: 0.5 }
  };

  return (
    <div className={`min-h-screen ${theme.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          className={`text-4xl font-bold ${theme.text} mb-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
        <motion.div
          className={`${theme.card} rounded-lg p-8 shadow-lg mb-12`}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className={`${theme.textSecondary} text-lg mb-6`}>
            We are a dedicated team of event planning professionals committed to creating
            memorable corporate experiences. With years of experience in the industry,
            we understand what it takes to make your company events successful.
          </p>
          <p className={`${theme.textSecondary} text-lg mb-6`}>
            Our mission is to deliver exceptional event experiences that strengthen
            company culture, foster team building, and create lasting memories for
            all participants.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={`text-3xl font-bold ${theme.text} mb-2`}>
                  {stat.value}
                </div>
                <div className={theme.textSecondary}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.h2
          className={`text-3xl font-bold ${theme.text} mb-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our Developers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer, index) => (
            <motion.div
              key={index}
              className={`${theme.card} rounded-lg p-6 shadow-lg text-center`}
              whileHover={shakeAnimation}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={developer.image}
                alt={developer.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>{developer.name}</h3>
              <p className={theme.textSecondary}>{developer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const stats = [
  {
    value: "500+",
    label: "Events Organized"
  },
  {
    value: "50+",
    label: "Corporate Clients"
  },
  {
    value: "98%",
    label: "Client Satisfaction"
  }
];

const developers = [
  {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    description: "Lead Developer with 10 years of experience in full-stack development."
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Jane Smith",
    description: "Frontend Developer specializing in React and modern web technologies."
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Mike Johnson",
    description: "Backend Developer with expertise in Node.js and database management."
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Emily Davis",
    description: "UI/UX Designer focused on creating intuitive and beautiful user interfaces."
  }
];