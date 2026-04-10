/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  create(file: Express.Multer.File, userId: string) {
    return this.prisma.image.create({
      data: {
        filename: file.filename,
        path: file.path,
        size: file.size,
        userId,
      },
    });
  }

  findAllByUser(userId: string) {
    return this.prisma.image.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
