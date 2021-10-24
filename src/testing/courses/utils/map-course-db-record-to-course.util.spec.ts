import { mapCourseDbRecordToCourse } from '../../../courses/utils/map-course-db-record-to-course.util';
import { isCourse } from '../../../courses/types/course.type';
import { courseDbRecordFactory } from '../../tools/factories/course-db-record.factory';

describe('Function mapCourseDbRecordToCourse', () => {
  test('should return a course prepared for frontend from course db record', () => {
    const courseDbRecord = courseDbRecordFactory.build();

    const course = mapCourseDbRecordToCourse(courseDbRecord);

    expect(isCourse(course)).toBeTruthy();
    expect(course).toEqual({
      id: courseDbRecord.id,
      title: courseDbRecord.title,
      description: courseDbRecord.description,
      wantToImprove: courseDbRecord.want_to_improve,
      createdAt: courseDbRecord.created_at,
      modifiedAt: courseDbRecord.modified_at,
    });
  });
});
