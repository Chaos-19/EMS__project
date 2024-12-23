import { useTheme } from '../../contexts/ThemeContext';

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-4xl font-bold ${theme.text} mb-8`}>About Us</h1>
        <div className={`${theme.card} rounded-lg p-8 shadow-lg`}>
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
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${theme.text} mb-2`}>
                  {stat.value}
                </div>
                <div className={theme.textSecondary}>{stat.label}</div>
              </div>
            ))}
          </div>
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