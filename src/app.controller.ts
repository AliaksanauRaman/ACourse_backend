import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectS3() private readonly s3: S3,
  ) {}

  @Get('/')
  handleGetWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @Get('/s3-buckets')
  async handleGetS3Buckets(): Promise<S3.Buckets> {
    return this.s3
      .listBuckets()
      .promise()
      .then(({ Buckets }) => Buckets);
  }

  @Post('/upload-a-file')
  @UseInterceptors(FileInterceptor('file'))
  async handleFileUploadToS3Bucket(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ fileLocation: string }> {
    const uploadParams = {
      Bucket: 'acourse-backend-files-store',
      Key: file.originalname,
      Body: file.buffer,
    };
    return this.s3
      .upload(uploadParams)
      .promise()
      .then(({ Location }) => ({
        fileLocation: Location,
      }));
  }

  @Get('/get-a-file/:fileName')
  async handleFileDownloadFromS3Bucket(
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    return this.s3
      .getObject({ Bucket: 'acourse-backend-files-store', Key: fileName })
      .promise()
      .then(({ Body }) => {
        if (Buffer.isBuffer(Body)) {
          return new StreamableFile(Body);
        }

        throw new Error('Not a buffer!');
      });
  }
}
