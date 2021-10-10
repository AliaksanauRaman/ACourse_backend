import {
  FactoryProvider,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

import { PG_POOL } from './pg-pool';

const dbProvider: FactoryProvider<Pool> = {
  provide: PG_POOL,
  useFactory: (configService: ConfigService) => {
    return new Pool({
      connectionString: configService.get('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: false,
      },
    });
  },
  inject: [ConfigService],
};

@Module({
  providers: [ConfigService, dbProvider],
  exports: [dbProvider],
})
export class DbModule implements OnModuleDestroy {
  constructor(@Inject(PG_POOL) private readonly dbPool: Pool) {}

  onModuleDestroy(): void {
    this.dbPool.end();
  }
}
