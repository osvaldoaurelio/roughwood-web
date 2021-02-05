import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';

const Providers = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default Providers;
