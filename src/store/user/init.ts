
import { $user } from './stores';
import { setUser } from './events';

$user.on(setUser, (_, user) => user);
