import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { FilesModule } from '../../files/files.module';
import { StorageModule } from '../../storage/storage.module';
import { DbModule } from '../../db/db.module';

import { CoursesController } from '../../courses/courses.controller';
import { CoursesDbService } from '../../courses/courses-db.service';
import { LecturesDbService } from '../../courses/lectures-db.service';

import { mapCourseDbRecordToCourse } from '../../courses/utils/map-course-db-record-to-course';

import { courseDbRecordFactory } from '../factories/course-db-record-factory';

describe('CoursesController', () => {
  let coursesDbService: CoursesDbService;
  let coursesController: CoursesController;

  beforeEach(async () => {
    const coursesTestingModule = await Test.createTestingModule({
      imports: [FilesModule, StorageModule, DbModule],
      controllers: [CoursesController],
      providers: [CoursesDbService, LecturesDbService],
    }).compile();

    coursesDbService =
      coursesTestingModule.get<CoursesDbService>(CoursesDbService);
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

    it('should return an empty array when there is no records in the db', async () => {
      spyOnSelectAllCourses.mockResolvedValueOnce([]);

      return expect(coursesController.handleGetAllCourses()).resolves.toEqual(
        [],
      );
    });

    it('should return an array with courses prepared for the frontend', async () => {
      const courseDbRecords = courseDbRecordFactory.buildList(3);
      spyOnSelectAllCourses.mockResolvedValueOnce(courseDbRecords);

      return expect(coursesController.handleGetAllCourses()).resolves.toEqual(
        courseDbRecords.map(mapCourseDbRecordToCourse),
      );
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

    it('should return a course prepared for the frontend', async () => {
      const courseDbRecord = courseDbRecordFactory.build();
      spyOnSelectCourseById.mockResolvedValueOnce(courseDbRecord);

      return expect(
        coursesController.handleGetCourseById(uuid()),
      ).resolves.toEqual(mapCourseDbRecordToCourse(courseDbRecord));
    });
  });
});
