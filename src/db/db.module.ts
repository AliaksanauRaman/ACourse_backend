import {
  FactoryProvider,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

import { DB_POOL } from './tokens/db-pool.token';

const dbProvider: FactoryProvider<Pool> = {
  provide: DB_POOL,
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
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  onModuleDestroy(): void {
    this.dbPool.end();
  }
}
