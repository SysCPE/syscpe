import { createContext } from 'react';

type LoggerContextType = {
  logError: (error: Error) => void;
};
const LoggerContext = createContext<LoggerContextType>({
  logError: () => {},
});

export default LoggerContext;
