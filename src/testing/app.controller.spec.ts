import { Test } from '@nestjs/testing';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return correct welcome message', () => {
    expect(appController.handleGetWelcomeMessage()).toBe('Welcome to ACourse!');
  });
});
