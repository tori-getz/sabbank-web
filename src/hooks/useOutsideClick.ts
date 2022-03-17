
import { useEffect, RefObject } from 'react';

interface IUseOutsideClick {
    ref: RefObject<any>
    callback: () => any
}

export const useOutsideClick = ({
    ref,
    callback
}: IUseOutsideClick): void => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref]);
}
