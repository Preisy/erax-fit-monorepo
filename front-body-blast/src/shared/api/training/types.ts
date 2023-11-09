import { Moment } from 'moment';
import { z } from 'zod';

export namespace Training {
  export interface Dto {
    page: number;
    limit: number;
    expanded: boolean;
  }

  export namespace Response {
    export interface Base {
      data: Array<Response.BaseTraining>;
      count: number;
    }
    export interface Expanded {
      data: Array<Response.ExpandedTraining>;
      count: number;
    }

    export interface BaseTraining {
      id: number;
      createdAt: Moment;
      updatedAt: Moment;
      deletedAt: Nullable<Moment>;
      name: string;
      comment: string;
      date: Moment;
      loop: number;
      userId: number;
      localeDate: string;
    }
    export interface ExpandedTraining extends BaseTraining {
      exercises: Array<Exercise>;
    }
  }

  export interface Exercise {
    id: number;
    createdAt: Moment;
    updatedAt: Moment;
    deletedAt: Moment;
    name: string;
    trainerComment: string;
    weight: number;
    sets: number;
    repetitions: number;
    restTime: number;
    pace: string;
    photoLink: string;
    videoLink: string;
    workoutId: number;
  }
}

export namespace Addition {
  export interface Dto {
    message: string;
  }

  export interface Response {
    message: string;
  }

  export const validation = () =>
    z.object({
      message: z.string().min(3).max(50),
    });
}
