/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Learning } from './types';

export const LearningVideos = [
  {
    title: 'Мышцы груди',
    link: 'https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4',
  },
  {
    title: 'Мышцы пальцев',
    link: 'https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4',
  },
  {
    title: 'Мышцы челюсти',
    link: 'https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4',
  },
];
const getVideosApi = axios.create({ baseURL: '/api/learning/videos' });
export namespace LearningService {
  export const getVideos = useServiceAction(() => requestSimulator<Learning.Video[]>(LearningVideos));
}
