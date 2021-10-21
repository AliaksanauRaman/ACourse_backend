import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { FilesModule } from '../../files/files.module';
import { StorageModule } from '../../storage/storage.module';
import { DbModule } from '../../db/db.module';

import { CoursesController } from '../../courses/courses.controller';
import { CoursesDbService } from '../../courses/courses-db.service';
import { LecturesDbService } from '../../courses/lectures-db.service';

import { courseDbRecordFactory } from '../tools/factories/course-db-record-factory';
import { lectureDbRecordFactory } from '../tools/factories/lecture-db-record-factory';

import { isLecture } from '../../courses/types/lecture';
import { isCourse } from '../../courses/types/course';

describe('Controller CoursesController', () => {
  let coursesDbService: CoursesDbService;
  let lecturesDbService: LecturesDbService;
  let coursesController: CoursesController;

  beforeEach(async () => {
    const coursesTestingModule = await Test.createTestingModule({
      imports: [FilesModule, StorageModule, DbModule],
      controllers: [CoursesController],
      providers: [CoursesDbService, LecturesDbService],
    }).compile();

    coursesDbService =
      coursesTestingModule.get<CoursesDbService>(CoursesDbService);
    lecturesDbService =
      coursesTestingModule.get<LecturesDbService>(LecturesDbService);
    coursesController =
      coursesTestingModule.get<CoursesController>(CoursesController);
  });

  describe('handleGetAllCourses', () => {
    let spyOnSelectAllCourses: jest.SpyInstance<
      ReturnType<typeof coursesDbService.selectAllCourses>
    >;

    beforeEach(() => {
      spyOnSelectAllCourses = jest.spyOn(coursesDbService, 'selectAllCourses');
    });

    it('should return an empty list if there are no courses in the db', async () => {
      spyOnSelectAllCourses.mockResolvedValueOnce([]);

      const courses = await coursesController.handleGetAllCourses();

      return expect(courses).toEqual([]);
    });

    it('should return a list of courses from db prepared for the frontend', async () => {
      const courseDbRecords = courseDbRecordFactory.buildList(3);
      spyOnSelectAllCourses.mockResolvedValueOnce(courseDbRecords);

      const courses = await coursesController.handleGetAllCourses();

      expect(courseDbRecords.length).toBe(courses.length);
      expect(courses.every(isCourse)).toBeTruthy();
    });
  });

  describe('handleGetCourseById', () => {
    let spyOnSelectCourseById: jest.SpyInstance<
      ReturnType<typeof coursesDbService.selectCourseById>
    >;

    beforeEach(() => {
      spyOnSelectCourseById = jest.spyOn(coursesDbService, 'selectCourseById');
    });

    it('should throw 404 error if no course was found by provided id', async () => {
      spyOnSelectCourseById.mockRejectedValueOnce(new NotFoundException());

      return expect(
        coursesController.handleGetCourseById('course-id'),
      ).rejects.toEqual(new NotFoundException());
    });

    it('should return the course from db prepared for the frontend', async () => {
      const courseDbRecord = courseDbRecordFactory.build();
      spyOnSelectCourseById.mockResolvedValueOnce(courseDbRecord);

      const course = await coursesController.handleGetCourseById(uuid());

      expect(isCourse(course)).toBeTruthy();
    });
  });

  describe('handleGetAllCourseLectures', () => {
    let spyOnSelectAllCourseLectures: jest.SpyInstance<
      ReturnType<typeof lecturesDbService.selectAllCourseLectures>
    >;
    let spyOnCheckIfCourseExists: jest.SpyInstance<
      ReturnType<typeof coursesDbService.checkIfCourseExists>
    >;

    beforeEach(() => {
      spyOnSelectAllCourseLectures = jest.spyOn(
        lecturesDbService,
        'selectAllCourseLectures',
      );
      spyOnCheckIfCourseExists = jest.spyOn(
        coursesDbService,
        'checkIfCourseExists',
      );
    });

    it('should return an empty list if there are no lectures in the db for provided course', async () => {
      spyOnSelectAllCourseLectures.mockResolvedValueOnce([]);
      spyOnCheckIfCourseExists.mockResolvedValueOnce(true);

      const lectures = await coursesController.handleGetAllCourseLectures(
        uuid(),
      );

      expect(lectures).toEqual([]);
    });

    it('should return a list of course lectures from the db prepared for the frontend', async () => {
      const lecturesDbRecords = lectureDbRecordFactory.buildList(3);
      spyOnSelectAllCourseLectures.mockResolvedValueOnce(lecturesDbRecords);
      spyOnCheckIfCourseExists.mockResolvedValueOnce(true);

      const lectures = await coursesController.handleGetAllCourseLectures(
        uuid(),
      );

      expect(lectures.every(isLecture)).toBeTruthy();
      expect(lecturesDbRecords.length).toBe(lectures.length);
    });
  });
});
