import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';
import { AppBaseEntity, PaginationDto } from 'shared/api/base';

export namespace Prompt {
  export interface Base extends AppBaseEntity {
    type: string;
    photoLink: string;
    videoLink: string;
  }
  export interface WithFiles {
    type: string;
    photo: File;
    video: File;
  }
}

export namespace PromptPage {
  export namespace Post {
    export interface Dto extends Pick<Prompt.WithFiles, 'type'> {
      photo: string;
      video: string;
    }

    export interface Response {
      data: Prompt.Base;
    }
  }
  export namespace Get {
    export interface Dto extends PaginationDto {
      type: string;
    }

    export interface Response {
      data: Array<Prompt.Base>;
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
