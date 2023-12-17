import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BucketService {
  createBucket(folderName: string): string {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const dirPath = path.join(projectRoot, 'storage', folderName);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      return 'Bucket created successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not create the bucket');
    }
  }

  readBucket(folderName: string): string[] {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const dirPath = path.join(projectRoot, 'storage', folderName);
      if (!fs.existsSync(dirPath)) {
        throw new NotFoundException('Bucket does not exist');
      }
      return fs.readdirSync(dirPath);
    } catch (error) {
      throw new InternalServerErrorException('Could not read the bucket');
    }
  }

  renameBucket(oldName: string, newName: string): string {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const oldPath = path.join(projectRoot, 'storage', oldName);
      const newPath = path.join(projectRoot, 'storage', newName);
      if (!fs.existsSync(oldPath)) {
        throw new NotFoundException('Old bucket does not exist');
      }
      fs.renameSync(oldPath, newPath);
      return 'Bucket renamed successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not rename the bucket');
    }
  }

  deleteBucket(folderName: string): string {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const dirPath = path.join(projectRoot, 'storage', folderName);
      if (!fs.existsSync(dirPath)) {
        throw new NotFoundException('Bucket does not exist');
      }
      fs.rmdirSync(dirPath, { recursive: true });
      return 'Bucket deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException('Could not delete the bucket');
    }
  }

  listAllBucket(page: number, pageSize: number): string[] {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const storagePath = path.join(projectRoot, 'storage');
      const allFolders = fs
        .readdirSync(storagePath)
        .filter((file) =>
          fs.statSync(path.join(storagePath, file)).isDirectory(),
        );

      // Calculate start and end indices for pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Log the pagination details
      console.log(
        `Page: ${page}, PageSize: ${pageSize}, StartIndex: ${startIndex}, EndIndex: ${endIndex}`,
      );

      // Slice the array to get the paginated result
      return allFolders.slice(startIndex, endIndex);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Could not list the folders');
    }
  }
}
