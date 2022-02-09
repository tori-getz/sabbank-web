
import { $app } from '@store/domains';

export const setLocale = $app.createEvent<string>('set locale');
