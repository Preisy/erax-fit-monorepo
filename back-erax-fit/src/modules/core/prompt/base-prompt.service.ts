import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppPagination } from 'src/utils/app-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { PromptEntity } from './entity/prompt.entity';
import { CreatePromptRequest } from './dto/create-prompt.dto';
import { UpdatePromptRequest } from './dto/update-prompt.dto';
import { GetPromptsRequest } from 'src/modules/admin/prompt/dto/admin-get-prompts.dto';

@Injectable()
export class BasePromptService {
  constructor(
    @InjectRepository(PromptEntity)
    private readonly promptRepository: Repository<PromptEntity>,
  ) {}

  async create(request: CreatePromptRequest): Promise<AppSingleResponse<PromptEntity>> {
    const newPrompt = this.promptRepository.create({
      ...request,
    });

    const savedPrompt = await this.promptRepository.save(newPrompt);

    return new AppSingleResponse(savedPrompt);
  }

  async findAll(
    query: AppPagination.Request,
    req: GetPromptsRequest,
    options?: AppPagination.GetExecutorOptions<PromptEntity>,
  ): Promise<AppPagination.Response<PromptEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.promptRepository);
    const { data, count } = await getPaginatedData(query, options);
    const newData = data.filter((prompt) => prompt.type.includes(req.type));
    return new AppPagination.Response(newData, count);
  }

  async findOne(id: PromptEntity['id']): Promise<AppSingleResponse<PromptEntity>> {
    const prompt = await this.promptRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!prompt) {
      throw MainException.entityNotFound(`Prompt with id: ${id} not found`);
    }
    return new AppSingleResponse(prompt);
  }

  async update(id: PromptEntity['id'], request: UpdatePromptRequest): Promise<AppSingleResponse<PromptEntity>> {
    const { data: prompt } = await this.findOne(id);

    const savedPrompt = await this.promptRepository.save({
      ...prompt,
      ...filterUndefined(request),
    });
    return new AppSingleResponse(savedPrompt);
  }

  async deleteOne(id: PromptEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.promptRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }
}
