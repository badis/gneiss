import { Inject, Injectable } from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { Repository } from 'typeorm';
import { TFile } from './entities';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<TFile>,
  ) {}

  create(fileDto: FileDto) {
    return this.fileRepository.save(fileDto);
  }

  findOneByGuid(guid: string) {
    return this.fileRepository.findOneBy({ guid });
  }

  delete(id: number) {
    return this.fileRepository.delete(id);
  }
}
