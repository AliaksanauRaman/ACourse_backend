import { converFromSnakeCaseToCamelCase } from '../../../shared/utils/convert-from-snake-case-to-camel-case';
import { courseDbRecordFactory } from '../../tools/factories/course-db-record.factory';
import { lessonDbRecordFactory } from '../../tools/factories/lecture-db-record.factory';
import { Course } from '../../../modules/courses/types/course.type';
import { Lesson } from '../../../modules/lessons/types/lesson.type';

describe('converFromSnakeCaseToCamelCase util', () => {
  test('should properly convert a course db record', () => {
    // Arrange
    const courseDbRecord = courseDbRecordFactory.build();

    // Act
    const course = converFromSnakeCaseToCamelCase<Course>(courseDbRecord);

    // Assert
    expect(course).toEqual<Course>({
      id: courseDbRecord.id,
      title: courseDbRecord.title,
      description: courseDbRecord.description,
      wantToImprove: courseDbRecord.want_to_improve,
      creatorId: courseDbRecord.creator_id,
      createdAt: courseDbRecord.created_at,
      modifiedAt: courseDbRecord.modified_at,
    });
  });

  test('should properly convert a lesson db record', () => {
    // Arrange
    const lessonDbRecord = lessonDbRecordFactory.build();

    // Act
    const lesson = converFromSnakeCaseToCamelCase<Lesson>(lessonDbRecord);

    // Assert
    expect(lesson).toEqual<Lesson>({
      id: lessonDbRecord.id,
      courseId: lessonDbRecord.course_id,
      type: lessonDbRecord.type,
      title: lessonDbRecord.title,
      description: lessonDbRecord.description,
      createdAt: lessonDbRecord.created_at,
      modifiedAt: lessonDbRecord.modified_at,
    });
  });
});
