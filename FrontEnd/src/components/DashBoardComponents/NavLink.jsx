import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

export default function NavLink({ to, label }) {
  const { theme } = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isActive ? theme.text : theme.textSecondary
      } hover:${theme.text} transition-colors`}
    >
      {label}
    </Link>
  );
}