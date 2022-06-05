import { useRef, useCallback } from 'react';

/**
 * Returns a debounced function
 * @param func The function to be called
 * @param delay Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */

const useDebouncedCallback = (func, delay = 200) => {
    // Use a ref to store the timeout between renders
    // and prevent changes to it from causing re-renders
    const timeout = useRef();

    return useCallback(
        (...args) => {
            const later = () => {
                clearTimeout(timeout.current);
                func(...args);
            };

            clearTimeout(timeout.current);
            timeout.current = setTimeout(later, delay);
        },
        [func, delay]
    );
};

export default useDebouncedCallback;
