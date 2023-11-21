import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service';

const services = [PrismaService];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class CommonModule {}
