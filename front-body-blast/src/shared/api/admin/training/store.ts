import { defineStore } from 'pinia';
import { Training } from 'shared/api/training';
import { IPagination, useListState, useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AdminTrainingsService } from './service';
import { AdminTraining } from './types';

export const useAdminTrainingStore = defineStore('admin-training-store', () => {
  const setTrainingState = ref(useSingleState<AdminTraining.Response>());
  // POST /api/admin/workout
  const sendTraining = (data: AdminTraining.Dto) =>
    useSimpleStoreAction({
      stateWrapper: setTrainingState.value,
      serviceAction: AdminTrainingsService.sendTrainings(data),
    });

  const userTraining = ref(useSingleState<Array<Training.Response>>());
  // GET /api/admin/workouts/{id}
  const getUserTraining = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: userTraining.value,
      serviceAction: AdminTrainingsService.getUserTrainings(id),
    });

  const trainings = ref(useListState<Training.Response>());
  // GET /api/admin/workouts
  const getAllUserTrainings = (data: IPagination.Base & { expanded: boolean }) =>
    useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: AdminTrainingsService.getAllUserTrainings(data),
    });

  const userTrainingPatchState = ref(useSingleState<Array<Training.Response>>());
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
    getAllUserTrainings,
    userTrainingPatchState,
    patchUserTraining,
    userTrainingDeleteState,
    deleteUserTraining,
  };
});
