import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';

const LECTURES_FILES_BUCKET_NAME = 'acourse-lectrues-files';

@Injectable()
export class StorageService {
  constructor(@InjectS3() private readonly s3: S3) {}

  async saveLectureFile(fileId: string, fileBuffer: Buffer): Promise<string> {
    return this.s3
      .upload({
        Bucket: LECTURES_FILES_BUCKET_NAME,
        Key: fileId,
        Body: fileBuffer,
      })
      .promise()
      .then(({ Key }) => Key);
  }

  // TODO
  // async deleteLectureFile(fileId: string): Promise<string> {
  //   return this.s3
  //     .deleteObject({
  //       Bucket: LECTURES_FILES_BUCKET_NAME,
  //       Key: fileId,
  //     })
  //     .promise()
  //     .then(() => fileId);
  // }
}
