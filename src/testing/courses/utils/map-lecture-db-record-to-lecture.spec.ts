import { mapLectureDbRecordToLecture } from '../../../courses/utils/map-lecture-db-record-to-lecture';
import { isLecture } from '../../../courses/types/lecture';
import { lectureDbRecordFactory } from '../../tools/factories/lecture-db-record-factory';

describe('Function mapLectureDbRecordToLecture', () => {
  test('should return a lecture prepared for frontend from lecture db record', () => {
    const lectureDbRecord = lectureDbRecordFactory.build();

    const lecture = mapLectureDbRecordToLecture(lectureDbRecord);

    expect(isLecture(lecture)).toBeTruthy();
    expect(lecture).toEqual({
      id: lectureDbRecord.id,
      title: lectureDbRecord.title,
      description: lectureDbRecord.description,
      createdAt: lectureDbRecord.created_at,
      modifiedAt: lectureDbRecord.modified_at,
    });
  });
});
