
import { $user, getUserFx } from '@store/user';
import { useStore } from 'effector-react';

export const useUser = () => {
    const user = useStore($user);

    const settings = user?.settings;

    const getUser = () => getUserFx();

    return {
        settings,
        user,
        getUser
    };
}
