import { Inject, Injectable } from '@nestjs/common';

import {
  COURSES_DB_SERVICE,
  ICoursesDbService,
} from '../interfaces/courses-db-service.interface';
import { ICoursesService } from '../interfaces/courses-service.interface';
import { CourseWithLessonsPreviews } from '../types/course-with-lessons-previews.type';
import { converFromSnakeCaseToCamelCase } from '../../../shared/utils/convert-from-snake-case-to-camel-case';
import { LessonPreview } from '../../lessons/types/lesson-preview.type';

@Injectable()
export class CoursesService implements ICoursesService {
  constructor(
    @Inject(COURSES_DB_SERVICE)
    private readonly coursesDbService: ICoursesDbService,
  ) {}

  public async getCourseWithLessonsPreviews(
    courseId: string,
  ): Promise<CourseWithLessonsPreviews> {
    const courseDbRecord = await this.coursesDbService.getCourseById(courseId);
    const lessonPreviewsDbRecords =
      await this.coursesDbService.getCourseLessonsPreviews(courseId);
    return {
      ...converFromSnakeCaseToCamelCase(courseDbRecord),
      lessonsPreviews: lessonPreviewsDbRecords.map((dbRecord) =>
        converFromSnakeCaseToCamelCase<LessonPreview>(dbRecord),
      ),
    };
  }
}
