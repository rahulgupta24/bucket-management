import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  //Param,
  //Body,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as mime from 'mime-types';
//import { query } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Query('bucketName') bucketName: string,
    @Query('fileName') baseFileName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const extension = mime.extension(file.mimetype);
    const fileName = extension ? `${baseFileName}.${extension}` : baseFileName;
    return this.fileService.uploadFile(bucketName, fileName, file.buffer);
  }

  @Get()
  listFiles(@Query('bucketName') bucketName: string) {
    return this.fileService.listFiles(bucketName);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  updateFile(
    @Query('bucketName') bucketName: string,
    @Query('fileName') fileName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.updateFile(bucketName, fileName, file.buffer);
  }

  @Delete()
  deleteFile(
    @Query('bucketName') bucketName: string,
    @Query('fileName') fileName: string,
  ) {
    return this.fileService.deleteFile(bucketName, fileName);
  }
}
