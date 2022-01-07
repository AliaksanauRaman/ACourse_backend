import { Injectable, StreamableFile } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';

type AvailableBucket = 'acourse-lectrues-files';

@Injectable()
export class FilesStorageService {
  constructor(@InjectS3() private readonly s3: S3) {}

  async saveLectureFile(fileId: string, fileBuffer: Buffer): Promise<string> {
    return this.saveFileToS3Bucket(
      fileId,
      fileBuffer,
      'acourse-lectrues-files',
    );
  }

  async getLectureFile(fileId: string): Promise<StreamableFile> {
    return this.getFileFromS3Bucket(fileId, 'acourse-lectrues-files');
  }

  private saveFileToS3Bucket(
    fileId: string,
    fileBuffer: Buffer,
    bucketName: AvailableBucket,
  ): Promise<string> {
    return this.s3
      .upload({
        Key: fileId,
        Body: fileBuffer,
        Bucket: bucketName,
      })
      .promise()
      .then(({ Key }) => Key);
  }

  private getFileFromS3Bucket(
    fileId: string,
    bucketName: AvailableBucket,
  ): Promise<StreamableFile> {
    return this.s3
      .getObject({
        Key: fileId,
        Bucket: bucketName,
      })
      .promise()
      .then(({ Body }) => {
        if (Buffer.isBuffer(Body)) {
          return new StreamableFile(Body);
        }

        throw new Error(
          `Error occured while fetching the file with id '${fileId}'!`,
        );
      });
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
