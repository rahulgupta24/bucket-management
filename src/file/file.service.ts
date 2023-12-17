import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private getFilePath(folderName: string, fileName: string): string {
    const projectRoot = path.resolve(__dirname, '../../');
    return path.join(projectRoot, 'storage', folderName, fileName);
  }

  uploadFile(
    folderName: string,
    fileName: string,
    fileContent: Buffer,
  ): string {
    try {
      const filePath = this.getFilePath(folderName, fileName);
      fs.writeFileSync(filePath, fileContent);
      return 'File uploaded successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not upload the file');
    }
  }

  listFiles(folderName: string): string[] {
    try {
      const folderPath = this.getFilePath(folderName, '');
      if (!fs.existsSync(folderPath)) {
        throw new NotFoundException('Bucket does not exist');
      }
      return fs.readdirSync(folderPath);
    } catch (error) {
      throw new InternalServerErrorException('Could not list the files');
    }
  }

  updateFile(
    folderName: string,
    fileName: string,
    newFileContent: Buffer,
  ): string {
    try {
      const filePath = this.getFilePath(folderName, fileName);
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('File does not exist');
      }
      fs.writeFileSync(filePath, newFileContent);
      return 'File updated successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not update the file');
    }
  }

  deleteFile(folderName: string, fileName: string): string {
    try {
      const filePath = this.getFilePath(folderName, fileName);
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('File does not exist');
      }
      fs.unlinkSync(filePath);
      return 'File deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not delete the file');
    }
  }
}
