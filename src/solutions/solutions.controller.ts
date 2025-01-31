import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateUserSolutionDto } from './dto/update-user-solution.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  create(@Body() data: CreateSolutionDto) {
    return this.solutionsService.create(data);
  }

  @Get()
  findAll(@Query('page') page: string) {
    return this.solutionsService.findAll(+page);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionsService.findOne(+id);
  }

  @Get('user/:email')
  findByUser(@Param('email') email: string) {
    return this.solutionsService.findbyUser(email);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() data: UpdateSolutionDto) {
    return this.solutionsService.update(+id, data);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(+id);
  }

  @Patch(':id/user')
  updateUserSolution(
    @Param('id') id: string,
    @Body() data: UpdateUserSolutionDto,
  ) {
    return this.solutionsService.updateUserSolution(+id, data);
  }

  @UseInterceptors(
    FilesInterceptor('thumbs', 3, {
      storage: diskStorage({
        destination: './uploads',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        },
      }),
    }),
  )
  @Post(':id/images')
  uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.solutionsService.uploadImages(+id, files);
  }

  @Delete(':id/image/delete')
  @Roles(RoleEnum.Admin)
  removeImage(@Param('id') id: string) {
    return this.solutionsService.deleteImage(+id);
  }
}
