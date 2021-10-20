import { useContext } from 'react';
import LoggerContext from './LoggerContext';

const useLogger = () => {
  const { logError } = useContext(LoggerContext);

  return { logError };
};

export default useLogger;
