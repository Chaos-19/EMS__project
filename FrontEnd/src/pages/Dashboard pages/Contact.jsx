import { useTheme } from '../../contexts/ThemeContext';

export default function Contact() {
  const { theme } = useTheme();

  return (
    <div className={`${theme.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-4xl font-bold ${theme.text} mb-8`}>Contact Us</h1>
        <div className={`${theme.card} rounded-lg p-8 shadow-lg hover:shadow-gray-400 focus-within:shadow-gray-400`}>
          <form className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className={`block ${theme.text} mb-2`}>Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className={`block ${theme.text} mb-2`}>Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className={`block ${theme.text} mb-2`}>Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`${theme.primary} bg-blue-500 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity w-full`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}