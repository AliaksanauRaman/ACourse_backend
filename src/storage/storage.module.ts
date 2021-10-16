import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';
import { StorageService } from './storage.service';

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          region: configService.get('AWS_REGION'),
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [StorageService],
  providers: [StorageService],
  controllers: [],
})
export class StorageModule {}
