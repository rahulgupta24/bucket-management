import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BucketService {
  createBucket(bucketName: string): string {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const dirPath = path.join(projectRoot, 'storage', bucketName);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        return 'Bucket created successfully';
      } else {
        return 'Bucket already exists';
      }
    } catch (error) {
      throw new InternalServerErrorException('Could not create the bucket');
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

  deleteBucket(bucketName: string): string {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const dirPath = path.join(projectRoot, 'storage', bucketName);
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

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      console.log(
        `Page: ${page}, PageSize: ${pageSize}, StartIndex: ${startIndex}, EndIndex: ${endIndex}`,
      );

      return allFolders.slice(startIndex, endIndex);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Could not list the folders');
    }
  }
}
