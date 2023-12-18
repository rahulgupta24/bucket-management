import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private getFilePath(bucketName: string, fileName: string): string {
    const projectRoot = path.resolve(__dirname, '../../');
    return path.join(projectRoot, 'storage', bucketName, fileName);
  }

  uploadFile(
    bucketName: string,
    fileName: string,
    fileContent: Buffer,
  ): string {
    try {
      const filePath = this.getFilePath(bucketName, fileName);
      fs.writeFileSync(filePath, fileContent);
      return 'File uploaded successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not upload the file');
    }
  }

  listFiles(bucketName: string): { name: string; path: string }[] {
    const folderPath = this.getFilePath(bucketName, '');
    console.log('Folder Path:', folderPath);

    if (!fs.existsSync(folderPath)) {
      console.error('Bucket does not exist:', folderPath);
      throw new NotFoundException('Bucket does not exist');
    }

    try {
      // Get the list of file names in the directory
      const fileNames = fs.readdirSync(folderPath);

      // Map each file name to an object with the name and full path
      const fileDetails = fileNames.map((fileName) => ({
        name: fileName,
        path: path.join(folderPath, fileName),
      }));

      return fileDetails;
    } catch (error) {
      console.error('Error in listing files:', error);
      throw new InternalServerErrorException('Could not list the files');
    }
  }

  updateFile(
    bucketName: string,
    fileName: string,
    newFileContent: Buffer,
  ): string {
    try {
      const filePath = this.getFilePath(bucketName, fileName);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Delete the existing file
        fs.unlinkSync(filePath);
      }

      // Write the new file content
      fs.writeFileSync(filePath, newFileContent);
      return 'File updated successfully';
    } catch (error) {
      console.error('Error in updating file:', error);
      throw new InternalServerErrorException(
        'Could not update the file. Error: ' + error.message,
      );
    }
  }

  deleteFile(bucketName: string, fileName: string): string {
    const filePath = this.getFilePath(bucketName, fileName);
    console.log('Deleting file at:', filePath);

    if (!fs.existsSync(filePath)) {
      console.log('File does not exist:', filePath);
      throw new NotFoundException('File does not exist');
    }

    try {
      fs.unlinkSync(filePath);
      return 'File deleted successfully';
    } catch (error) {
      console.error('Error in deleting file:', error);
      throw new InternalServerErrorException('Could not delete the file');
    }
  }
}
