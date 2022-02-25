
import { ContentService } from '@services';

interface IUseContent {
    getContent: <T = any> (category: string) => Promise<T>
}

export const useContent = (): IUseContent => {
    const contentService = new ContentService();

    const getContent = async <T = any>(category: string): Promise<T> => {
        try {
            const content = await contentService.find<T>({ category });

            return content;
        } catch (e) {
            console.error(e);
        }
    }

    return {
        getContent
    }
}
