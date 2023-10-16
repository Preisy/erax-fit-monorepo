import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseFilters,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { MainExceptionFilter } from '../exceptions/main-exception.filter';
  import { MainException } from '../exceptions/main.exception';
  import { RoleGuard } from '../authentication/guards/role.guard';
  import { UserRole } from '../constants/constants';
  import { RequestWithUser } from '../authentication/types/requestWithUser.type';
  import { BaseAuthGuard } from 'src/authentication/guards/baseAuth.guard';
  import { AppResponses } from 'src/decorators/app-responses.decorator';
  import { Throttle } from '@nestjs/throttler';
  import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { WorkoutService } from './workout.service';
import { CreateWorkoutRequest, CreateWorkoutResponse } from './dto/create-workout.dto';
import { GetWorkoutsRequest, GetWorkoutsResponse } from './dto/get-workouts.dto';
import { GetWorkoutResponse } from './dto/get-workout.dto';
import { UpdateWorkoutRequest, UpdateWorkoutResponse } from './dto/update-workout.dto';
import { DeleteWorkoutByIdResponse } from './dto/delete-workout-by-id.dto';
  
  @Controller()
  @ApiTags('Тренировки')
  @UseFilters(MainExceptionFilter)
  @UsePipes(ValidationPipe)
  export class UserController {
    constructor(private readonly workoutService: WorkoutService) {}
  
    @Post('trainer/workouts')
    @AppResponses({status: 200, type: AppSingleResponse.type(CreateWorkoutResponse)})
    @Throttle(5, 1)
    @BaseAuthGuard(RoleGuard(UserRole.Admin))
    async create(@Body() request: CreateWorkoutRequest) {
      return await this.workoutService.createWorkout(request);
    }
  
    @Get('trainer/workouts')
    @AppResponses({status: 200, type: AppSingleResponse.type(GetWorkoutsResponse)})
    @BaseAuthGuard(RoleGuard(UserRole.Admin))
    async getWorkouts(@Query() query: GetWorkoutsRequest) {
      return await this.workoutService.getWorkouts(query);
    }
  
    @Get('trainer/workouts/:id')
    @AppResponses({status: 200, type: AppSingleResponse.type(GetWorkoutResponse)})
    @BaseAuthGuard(RoleGuard(UserRole.Admin))
    async getWorkoutById(@Param('id') id: number) {
      return await this.workoutService.getWorkoutById(id);
    }

    @Get('user/workouts/:id')
    @AppResponses({status: 200, type: AppSingleResponse.type(GetWorkoutResponse)})
    @BaseAuthGuard()
    async getWorkoutsByUserId(@Param('id') id: number, @Req() req: RequestWithUser, @Body() body: GetWorkoutsRequest) {
        if (id != req.user.id)
        throw MainException.forbidden('Only admin can edit other workouts');
      const request = new GetWorkoutsRequest(
        body.page,
        body.limit,
        body.expanded,
      );
      return await this.workoutService.getWorkoutsByUserId(id, request);
    }
  
    @Patch('trainer/workouts/:id')
    @AppResponses({status: 200, type: AppSingleResponse.type(UpdateWorkoutResponse)})
    @BaseAuthGuard(RoleGuard(UserRole.Admin))
    async updateWorkout(
      @Query() query: UpdateWorkoutRequest,
    ) {
      return await this.workoutService.updateWorkout(query);
    }
  
    @Delete('trainer/workouts/:id')
    @AppResponses({status: 200, type: AppSingleResponse.type(DeleteWorkoutByIdResponse)})
      @BaseAuthGuard()
    async deleteUserById(@Param('id') id: number, @Req() req: RequestWithUser) {
      if (req.user.role != UserRole.Admin && id != req.user.id)
        throw MainException.forbidden('Only admin can delete other user');
  
      return await this.workoutService.deleteWorkoutById(+id);
    }
    
  }
  