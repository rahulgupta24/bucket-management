import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post(':name')
  create(@Param('name') name: string) {
    console.log('check');
    return this.bucketService.createBucket(name);
  }

  @Get(':name')
  read(@Param('name') name: string) {
    return this.bucketService.readBucket(name);
  }

  @Put()
  update(@Body() body: { oldName: string; newName: string }) {
    console.log('ceck');
    return this.bucketService.renameBucket(body.oldName, body.newName);
  }

  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.bucketService.deleteBucket(name);
  }

  @Get('list/all')
  listAll(@Query('pageSize') pageSize: number, @Query('page') page: number) {
    try {
      // Parse page and pageSize, with default values
      console.log(page);
      console.log(pageSize);

      const currentPage = page || 1;
      const currentPageSize = pageSize || 10;

      return this.bucketService.listAllBucket(currentPage, currentPageSize);
    } catch (error) {
      throw new Error('Invalid pagination parameters');
    }
  }
}
