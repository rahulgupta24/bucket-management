import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { BucketModule } from './bucket/bucket.module';

@Module({
  imports: [FileModule, BucketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
