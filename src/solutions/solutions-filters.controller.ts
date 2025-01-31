import { Public } from './../auth/decorators/public.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { SolutionsFiltersService } from './solutions-filters.service';

@Controller('solutions')
export class SolutionsFiltersController {
  constructor(
    private readonly solutionsFiltersService: SolutionsFiltersService,
  ) {}

  @Public()
  @Get('mapped/all')
  findMapped(@Query('cursor') cursor: string) {
    return this.solutionsFiltersService.findMapped(+cursor);
  }

  @Public()
  @Get('mapped/one/:id')
  findOneMapped(@Param('id') id: string) {
    return this.solutionsFiltersService.findOneMapped(+id);
  }

  @Get('call/:id')
  findByCall(@Param('id') id: string) {
    return this.solutionsFiltersService.findByCall(+id);
  }

  @Get('pole/:id')
  getByPole(@Param('id') id: string, @Query('page') page: string) {
    return this.solutionsFiltersService.solutionsByPole(+id, +page);
  }

  @Get('conforms/all')
  findConforms(@Query('page') page: string) {
    return this.solutionsFiltersService.findConforms(+page);
  }

  @Get('non-conforms/all')
  findNonConforms(@Query('page') page: string) {
    return this.solutionsFiltersService.findNonConforms(+page);
  }

  @Get('curated/all')
  findCurated(@Query('page') page: string) {
    return this.solutionsFiltersService.findCurated(+page);
  }

  @Public()
  @Get('mapped/call/:id')
  findMappedByCall(@Param('id') id: string) {
    return this.solutionsFiltersService.findMappedByCall(+id);
  }

  @Public()
  @Get('ids/all')
  findIds() {
    return this.solutionsFiltersService.findIds();
  }
}
