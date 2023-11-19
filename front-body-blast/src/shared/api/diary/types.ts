export namespace Diary {
  export interface SelfControl {
    readonly: boolean;
    sleep?: number;
    performance?: number;
    nutrition?: number;
    health?: number;
    pnsv?: number;
  }

  export interface Activity {
    readonly: boolean;
    physical: string;
    steps: number;
  }

  export interface Summary {
    week: string;
    goal: number;
    done: number;
  }

  export namespace Response {
    export interface DiarySlide extends SelfControl, Activity {
      dateValue: string;
    }
    export interface Summary {
      week: string;
      goal: number;
      done: number;
    }
  }
}
