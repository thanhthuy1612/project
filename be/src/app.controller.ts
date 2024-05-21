import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import { ResponseData } from './global/globalClass';
import { HttpMessage, HttpStatus } from './global/globalEnum';

interface FileParams {
  fileName: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now();
          const filename = `${uniqueSuffix}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return new ResponseData<Express.Multer.File>(
        file,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Express.Multer.File>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('getFile')
  postFile(@Res() res: Response, @Body() file: FileParams) {
    res.sendFile(path.join(__dirname, '../uploads/' + file.fileName));
  }

  @Get('getFile/:fileName')
  getFile(@Res() res: Response, @Param('fileName') fileName: string) {
    res.sendFile(path.join(__dirname, '../uploads/' + fileName));
  }
}
