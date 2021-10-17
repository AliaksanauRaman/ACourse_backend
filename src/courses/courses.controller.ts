import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
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
import { UUID_VERSION } from '../constants';
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
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
  ): Promise<Course> {
    const courseDbRecord = await this.coursesDbService.selectCourseById(
      courseId,
    );
    return mapCourseDbRecordToCourse(courseDbRecord);
  }

  @Get('/:courseId/lectures')
  async handleGetAllCourseLectures(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
  ): Promise<Array<Lecture>> {
    const lecturesFromDb =
      await this.lecturesDbService.getAllCourseLecturesFromDb(courseId);
    return lecturesFromDb.map(mapLectureDbRecordToLecture);
  }

  @Get('/:courseId/lectures/:lectureId/get-file/:fileId')
  async handleGetOfCourseLectureFile(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
    @Param('lectureId', new ParseUUIDPipe({ version: UUID_VERSION }))
    lectureId: string,
    @Param('fileId', new ParseUUIDPipe({ version: UUID_VERSION }))
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
    const courseAddedToDb = await this.coursesDbService.insertCourse(
      createCourseDto,
    );
    return mapCourseDbRecordToCourse(courseAddedToDb);
  }

  @Post('/:courseId/lectures')
  async handleCreateCourseLecture(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
    @Body() createLectureDto: CreateLectureDto,
  ): Promise<Lecture> {
    const lectureAddedToDb = await this.lecturesDbService.addLectureToDb(
      courseId,
      createLectureDto,
    );
    return mapLectureDbRecordToLecture(lectureAddedToDb);
  }

  @Post('/:courseId/lectures/:lectureId/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadOfCourseLectureFile(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
    @Param('lectureId', new ParseUUIDPipe({ version: UUID_VERSION }))
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
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
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
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
  ): Promise<Course> {
    const deletedCourseDbRecord = await this.coursesDbService.deleteCourse(
      courseId,
    );
    return mapCourseDbRecordToCourse(deletedCourseDbRecord);
  }

  @Delete('/:courseId/lectures/:lectureId')
  async handleDeleteCourseLecture(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
    @Param('lectureId', new ParseUUIDPipe({ version: UUID_VERSION }))
    lectureId: string,
  ): Promise<Lecture> {
    const deletedLectureFromDb =
      await this.lecturesDbService.deleteLectureFromDb(courseId, lectureId);
    return mapLectureDbRecordToLecture(deletedLectureFromDb);
  }
}
