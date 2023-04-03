// prisma/prisma.service.ts

import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect();
  }
  // 为确保你的应用程序能够优雅地关闭，enableShutdownHooks 的定义是必要的
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}