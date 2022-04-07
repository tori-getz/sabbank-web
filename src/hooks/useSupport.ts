
import { SupportService } from '@services';

import type { IFaqTheme } from '@typing';

import type {
    ISupportSendFeedbackDto
} from '@dtos';

interface IUseSupport {
    getFAQs: () => Promise<IFaqTheme[]>
    sendFeedback: (dto: ISupportSendFeedbackDto) => Promise<any>
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

    const sendFeedback = async (dto: ISupportSendFeedbackDto) => {
        return await supportService.sendFeedback(dto);
    }

    return {
        getFAQs,
        sendFeedback
    }
}

