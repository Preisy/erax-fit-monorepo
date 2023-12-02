import { defineStore } from 'pinia';
import { PaginationDto } from 'shared/api/base';
import { Training } from 'shared/api/training';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AdminTrainingsService } from './service';
import { AdminTraining } from './types';

export const useAdminTrainingStore = defineStore('admin-training-store', () => {
  const setTrainingState = ref(useSingleState<AdminTraining.Response>());
  // POST /api/admin/workout
  const sendTraining = (data: AdminTraining.Dto) =>
    useSimpleStoreAction({
      stateWrapper: setTrainingState.value,
      serviceAction: AdminTrainingsService.postTrainings(data),
    });

  const userTraining = ref(useSingleState<Training.Response.Expanded>());
  // GET /api/admin/workouts/{id}
  const getUserTraining = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: userTraining.value,
      serviceAction: AdminTrainingsService.getUserTrainings(id),
    });

  const trainings = ref(useSingleState<Training.Response.Expanded>());
  // GET /api/admin/workouts
  const getTrainings = (data: PaginationDto) =>
    useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: AdminTrainingsService.getTrainings(data),
    });

  const userTrainingPatchState = ref(useSingleState<AdminTraining.Response>());
  // PATCH /api/admin/workouts/{id}
  const patchUserTraining = (id: number, data: AdminTraining.Dto) =>
    useSimpleStoreAction({
      stateWrapper: userTrainingPatchState.value,
      serviceAction: AdminTrainingsService.patchUserTrainings(id, data),
    });

  const userTrainingDeleteState = ref(useSingleState<AdminTraining.Delete.Response>());
  // DELETE /api/admin/workouts/{id}
  const deleteUserTraining = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: userTrainingDeleteState.value,
      serviceAction: AdminTrainingsService.deleteUserTrainings(id),
    });

  return {
    setTrainingState,
    sendTraining,
    userTraining,
    getUserTraining,
    trainings,
    getTrainings,
    userTrainingPatchState,
    patchUserTraining,
    userTrainingDeleteState,
    deleteUserTraining,
  };
});
