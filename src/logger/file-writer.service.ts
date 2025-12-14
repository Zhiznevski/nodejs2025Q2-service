import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileWriterService {
  private readonly dir: string;
  private readonly fileName: string;
  private readonly filePath: string;

  constructor() {
    this.dir = process.env.LOG_DIR || '/usr/src/app/logs';
    this.fileName = process.env.LOG_FILE || 'app.log';
    this.filePath = path.join(this.dir, this.fileName);
  }

  async appendLine(line: string) {
    await fs.mkdir(this.dir, { recursive: true });
    await fs.appendFile(this.filePath, line + '\n', 'utf8');
  }
}
