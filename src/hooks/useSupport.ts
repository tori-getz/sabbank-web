
import { SupportService } from '@services';

import type { IFaqTheme } from '@typing';

interface IUseSupport {
    getFAQs: () => Promise<IFaqTheme[]>
}

export const useSupport = (): IUseSupport => {
    const supportService = new SupportService();

    const getFAQs = async () => {
        try {
            const faqs = await supportService.getFAQs();

            return faqs;
        } catch (e) {
            console.error(e);
        }
    }

    return {
        getFAQs
    }
}

