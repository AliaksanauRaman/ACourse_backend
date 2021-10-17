import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CoursesDbService } from './courses-db.service';
import { LecturesDbService } from './lectures-db.service';
import { FilesDbService } from '../files/files-db.service';
import { StorageService } from '../storage/storage.service';

import { Course } from './types/course';
import { CreateCourseDto } from './dtos/create-course.dto';
import { mapLectureDbRecordToLecture } from './utils/map-lecture-db-record-to-lecture';
import { Lecture } from './types/lecture';
import { mapCourseDbRecordToCourse } from './utils/map-course-db-record-to-course';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { UUIDValidatorPipe } from '../shared/pipes/uuid-validator';
import { UploadLectureFileResponse } from './types/result-of-upload-a-lecture-file';
import { ModifyCourseDto } from './dtos/modify-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesDbService: CoursesDbService,
    private readonly lecturesDbService: LecturesDbService,
    private readonly filesDbService: FilesDbService,
    private readonly storageService: StorageService,
  ) {}

  @Get('/')
  async handleGetAllCourses(): Promise<Array<Course>> {
    const coursesDbRecords = await this.coursesDbService.selectAllCourses();
    return coursesDbRecords.map(mapCourseDbRecordToCourse);
  }

  @Get('/:courseId')
  async handleGetCourseById(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
  ): Promise<Course> {
    const courseDbRecord = await this.coursesDbService.selectCourseById(
      courseId,
    );
    return mapCourseDbRecordToCourse(courseDbRecord);
  }

  @Get('/:courseId/lectures')
  async handleGetAllCourseLectures(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
  ): Promise<Array<Lecture>> {
    const courseLecturesDbRecords =
      await this.lecturesDbService.selectAllCourseLectures(courseId);
    return courseLecturesDbRecords.map(mapLectureDbRecordToLecture);
  }

  @Get('/:courseId/lectures/:lectureId/get-file/:fileId')
  async handleGetOfCourseLectureFile(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
    @Param('lectureId', UUIDValidatorPipe)
    lectureId: string,
    @Param('fileId', UUIDValidatorPipe)
    fileId: string,
  ): Promise<StreamableFile> {
    const courseHasLecture =
      await this.coursesDbService.checkIfCourseHasLecture(courseId, lectureId);

    if (!courseHasLecture) {
      throw new NotFoundException(
        'Chosen course does not have a lecture with provided id!',
      );
    }

    return this.storageService.getLectureFile(fileId);
  }

  @Post('/')
  async handleCreateCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const insertedCourseDbRecord = await this.coursesDbService.insertCourse(
      createCourseDto,
    );
    return mapCourseDbRecordToCourse(insertedCourseDbRecord);
  }

  @Post('/:courseId/lectures')
  async handleCreateCourseLecture(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
    @Body() createLectureDto: CreateLectureDto,
  ): Promise<Lecture> {
    const insertedLectureDbRecord = await this.lecturesDbService.insertLecture(
      courseId,
      createLectureDto,
    );
    return mapLectureDbRecordToLecture(insertedLectureDbRecord);
  }

  @Post('/:courseId/lectures/:lectureId/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadOfCourseLectureFile(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
    @Param('lectureId', UUIDValidatorPipe)
    lectureId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadLectureFileResponse> {
    const courseHasLecture =
      await this.coursesDbService.checkIfCourseHasLecture(courseId, lectureId);

    if (!courseHasLecture) {
      throw new NotFoundException(
        'Chosen course does not have a lecture with provided id!',
      );
    }

    const lectureFileDbRecord =
      await this.filesDbService.insertLectureFileRecord(lectureId, file);
    const uploadedFileid = await this.storageService.saveLectureFile(
      lectureFileDbRecord.id,
      file.buffer,
    );
    return { uploadedFileid };
  }

  @Put('/:courseId')
  async handleModifyCourse(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
    @Body() modifyCourseDto: ModifyCourseDto,
  ): Promise<Course> {
    const modifiedCourseDbRecord = await this.coursesDbService.modifyCourse(
      courseId,
      modifyCourseDto,
    );
    return mapCourseDbRecordToCourse(modifiedCourseDbRecord);
  }

  @Delete('/:courseId')
  async handleDeleteCourse(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
  ): Promise<Course> {
    const deletedCourseDbRecord = await this.coursesDbService.deleteCourse(
      courseId,
    );
    return mapCourseDbRecordToCourse(deletedCourseDbRecord);
  }

  @Delete('/:courseId/lectures/:lectureId')
  async handleDeleteCourseLecture(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
    @Param('lectureId', UUIDValidatorPipe)
    lectureId: string,
  ): Promise<Lecture> {
    const deletedLectureDbRecord = await this.lecturesDbService.deleteLecture(
      courseId,
      lectureId,
    );
    return mapLectureDbRecordToLecture(deletedLectureDbRecord);
  }
}
