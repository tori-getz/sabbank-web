
import {
    $user,
    $fiatList
} from './stores';
import { setUser } from './events';
import {
    getUserFx,
    getFiatListFx
} from './effects';

import { setLocale } from '@store/app';
import { getLocale } from '@utils';

$user.on(setUser, (_, user) => user);

$user.on(getUserFx.doneData, (_, user) => user);

$user.watch(user => {
    setLocale(user?.settings?.language || getLocale());
});

$fiatList.on(getFiatListFx.doneData, (_, fiatList) => fiatList);
