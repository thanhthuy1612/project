import React from 'react';

export function useDebounce(effect: any, dependencies: any, delay: any) {
  const callback = React.useCallback(effect, dependencies);

  React.useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}