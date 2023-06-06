import * as fs from 'fs';
import { promisify } from 'util';
import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Res,
  InternalServerErrorException,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { Public, getCurrentUserId } from '@/auth/decorators';
import { FilesService } from './files.service';
import { FileDto } from './dto/file.dto';
import { ProfilesService } from '@/profiles/profiles.service';

const unlinkAsync = promisify(fs.unlink);

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const name = uuidv4();
  callback(null, `${name}${fileExtName}`);
};

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private profileService: ProfilesService,
  ) {}

  @Post('profile/picture/upload')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads/profile/picture/',
        filename: editFileName,
      }),
    }),
  )
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }), // maxSize in bytes.
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
      file: Express.Multer.File,
    @getCurrentUserId() userId: number,
  ) {
    try {
      const profile = await this.profileService.findOne(userId);
      if (profile.picture) {
        const oldPicture = await this.filesService.findOneByGuid(
          profile.picture,
        );
        if (!oldPicture) return new InternalServerErrorException();
        await unlinkAsync('./uploads/' + oldPicture.key);
        const pictureDeletionResponse = await this.filesService.delete(
          oldPicture.id,
        );
        if (!pictureDeletionResponse) return new InternalServerErrorException();
      }

      const cfDto = new FileDto();
      cfDto.guid = file.filename.split('.')[0];
      cfDto.user_id = userId;
      cfDto.filename = file.originalname;
      cfDto.mimetype = file.mimetype;
      cfDto.size = file.size;
      cfDto.key = 'profile/picture/' + file.filename;

      const pictureCreationResponse = await this.filesService.create(cfDto);
      if (!pictureCreationResponse) return new InternalServerErrorException();

      const profileUpdateResponse = await this.profileService.update(
        pictureCreationResponse.user_id,
        { picture: pictureCreationResponse.guid },
      );

      if (!profileUpdateResponse) return new InternalServerErrorException();

      return {
        response: {
          statusCode: 201,
          message: 'Created',
        },
      };
    } catch (e) {
      return new InternalServerErrorException();
    }
  }

  @Public()
  @Get('profile/picture/:guid')
  async viewProfilePicture(@Param('guid') guid, @Res() res) {
    try {
      const picture = await this.filesService.findOneByGuid(guid);
      if (!picture) {
        return res.send({
          response: {
            statusCode: 404,
            message: 'Not Found',
          },
        });
      }
      return res.sendFile(picture.key, {
        root: './uploads/',
      });
    } catch (e) {
      return res.send({
        response: {
          statusCode: 500,
          message: 'Internal Server Error',
        },
      });
    }
  }

  @Delete('profile/picture/:guid')
  async delete(@Param('guid') guid: string) {
    const picture = await this.filesService.findOneByGuid(guid);
    if (!picture) return new InternalServerErrorException();

    await unlinkAsync('./uploads/' + picture.key);

    const pictureDeletionResponse = this.filesService.delete(picture.id);
    if (!pictureDeletionResponse) return new InternalServerErrorException();
    return {
      response: {
        statusCode: 204,
        message: 'Deleted',
      },
    };
  }
}
