import { Module } from '@nestjs/common';
import { PrismaService } from './service';

const services = [PrismaService];

@Module({
  providers: [...services],
  exports: [...services],
})
export class CommonModule {}
