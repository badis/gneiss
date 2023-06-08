import * as fs from 'fs';
import { promisify } from 'util';
import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
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
import { ApiParam } from '@nestjs/swagger';

const unlinkAsync = promisify(fs.unlink);

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const name = uuidv4();
  callback(null, `${name}${fileExtName}`);
};

const allowedImageMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
];

// const allowedFileMimeTypes = [
//   'image/png',
//   'image/jpeg',
//   'image/jpg',
//   'image/webp',
//   'audio/mpeg',
//   'audio/mp4',
//   'video/mp4',
//   'video/webm',
//   'application/pdf',
// ];

const MAX_PROFILE_PICTURE_SIZE = 1000000; // 1Mb
const MAX_PROFILE_BANNER_SIZE = 2000000; // 2Mb

const imagesFilter = function fileFilter(req, file, cb) {
  if (!allowedImageMimeTypes.includes(file.mimetype)) {
    req.fileValidationError = 'unsupported mime type';
    cb(null, false);
  } else {
    cb(null, true);
  }
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
      fileFilter: imagesFilter,
      limits: { fileSize: MAX_PROFILE_PICTURE_SIZE },
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
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
  @ApiParam({
    name: 'guid',
  })
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
  async deleteProfilePicture(@Param('guid') guid: string) {
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

  @Post('profile/banner/upload')
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './uploads/profile/banner/',
        filename: editFileName,
      }),
      fileFilter: imagesFilter,
      limits: { fileSize: MAX_PROFILE_BANNER_SIZE },
    }),
  )
  async uploadProfileBanner(
    @UploadedFile() file: Express.Multer.File,
    @getCurrentUserId() userId: number,
  ) {
    try {
      const profile = await this.profileService.findOne(userId);
      if (profile.banner) {
        const oldBanner = await this.filesService.findOneByGuid(profile.banner);
        if (!oldBanner) return new InternalServerErrorException();
        await unlinkAsync('./uploads/' + oldBanner.key);
        const bannerDeletionResponse = await this.filesService.delete(
          oldBanner.id,
        );
        if (!bannerDeletionResponse) return new InternalServerErrorException();
      }

      const cfDto = new FileDto();
      cfDto.guid = file.filename.split('.')[0];
      cfDto.user_id = userId;
      cfDto.filename = file.originalname;
      cfDto.mimetype = file.mimetype;
      cfDto.size = file.size;
      cfDto.key = 'profile/banner/' + file.filename;

      const bannerCreationResponse = await this.filesService.create(cfDto);
      if (!bannerCreationResponse) return new InternalServerErrorException();

      const profileUpdateResponse = await this.profileService.update(
        bannerCreationResponse.user_id,
        { banner: bannerCreationResponse.guid },
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
  @Get('profile/banner/:guid')
  async viewProfileBanner(@Param('guid') guid, @Res() res) {
    try {
      const banner = await this.filesService.findOneByGuid(guid);
      if (!banner) {
        return res.send({
          response: {
            statusCode: 404,
            message: 'Not Found',
          },
        });
      }
      return res.sendFile(banner.key, {
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

  @Delete('profile/banner/:guid')
  async deleteProfileBanner(@Param('guid') guid: string) {
    const banner = await this.filesService.findOneByGuid(guid);
    if (!banner) return new InternalServerErrorException();

    await unlinkAsync('./uploads/' + banner.key);

    const bannerDeletionResponse = this.filesService.delete(banner.id);
    if (!bannerDeletionResponse) return new InternalServerErrorException();
    return {
      response: {
        statusCode: 204,
        message: 'Deleted',
      },
    };
  }
}
