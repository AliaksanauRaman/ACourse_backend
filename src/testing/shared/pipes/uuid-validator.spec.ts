import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { v1 as uuidV1, v4 as uuidV4 } from 'uuid';
import { UUIDValidatorPipe } from '../../../shared/pipes/uuid-validator';

const generalMetadata: ArgumentMetadata = { type: 'param' };

describe('Pipe UUIDValidatorPipe', () => {
  test('should throw bad request exception if provided id is an empty string', async () => {
    return expect(
      UUIDValidatorPipe.transform('', generalMetadata),
    ).rejects.toEqual(
      new BadRequestException('Validation failed (uuid v4 is expected)'),
    );
  });

  test('should throw bad request exception if provided id is not a valid uuid', async () => {
    return expect(
      UUIDValidatorPipe.transform('test', generalMetadata),
    ).rejects.toEqual(
      new BadRequestException('Validation failed (uuid v4 is expected)'),
    );
  });

  test('should throw bad request exception if provided id is not a valid uuid of version 4', async () => {
    return expect(
      UUIDValidatorPipe.transform(uuidV1(), generalMetadata),
    ).rejects.toEqual(
      new BadRequestException('Validation failed (uuid v4 is expected)'),
    );
  });

  test('should result provided id if it is a valid uuid of version 4', async () => {
    const id = uuidV4();

    return expect(
      UUIDValidatorPipe.transform(id, generalMetadata),
    ).resolves.toBe(id);
  });
});
