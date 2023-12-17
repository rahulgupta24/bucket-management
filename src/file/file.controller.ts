import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as mime from 'mime-types';

@Controller('bucket')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post(':folderName/file/:fileName')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('folderName') folderName: string,
    @Param('fileName') baseFileName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const extension = mime.extension(file.mimetype);
    const fileName = extension ? `${baseFileName}.${extension}` : baseFileName;
    return this.fileService.uploadFile(folderName, fileName, file.buffer);
  }

  @Get(':folderName/files')
  listFiles(@Param('folderName') folderName: string) {
    return this.fileService.listFiles(folderName);
  }

  @Put(':folderName/file/:fileName')
  updateFile(
    @Param('folderName') folderName: string,
    @Param('fileName') fileName: string,
    @Body() body: { newFileContent: Buffer },
  ) {
    return this.fileService.updateFile(
      folderName,
      fileName,
      body.newFileContent,
    );
  }

  @Delete(':folderName/file/:fileName')
  deleteFile(
    @Param('folderName') folderName: string,
    @Param('fileName') fileName: string,
  ) {
    return this.fileService.deleteFile(folderName, fileName);
  }
}
