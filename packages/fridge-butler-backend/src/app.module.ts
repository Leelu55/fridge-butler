import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [HealthModule, UploadsModule]
})
export class AppModule {}
