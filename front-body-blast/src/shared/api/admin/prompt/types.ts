import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';

export interface Prompt {
  type: string;
  photo: XOR<File, string>;
  video: XOR<File, string>;
}

export namespace Prompt {
  export namespace Post {
    export interface Dto extends Prompt {}

    export interface Response {
      data: Prompt; //TODO: & AppBaseEntity
    }
  }
  export namespace Get {
    //TODO: extends Pagination
    export interface Dto {
      type: string;
      page: number;
      limit: number;
      expanded: boolean;
    }

    export interface Response {
      data: Array<Prompt>;
      count: number;
    }
  }

  export const validation = (t: ComposerTranslation) =>
    z.object({
      type: z.string().min(1),
      photo: z.instanceof(File, { message: t('admin.prompt.errors.fileInput') }),
      video: z.instanceof(File, { message: t('admin.prompt.errors.fileInput') }),
    });
}
