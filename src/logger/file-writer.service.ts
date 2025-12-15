import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileWriterService {
  private readonly dir: string;
  private readonly allLogsFileName: string;
  private readonly allLogsFilePath: string;
  private readonly errorLogsFileName: string;
  private readonly errorLogsFilePath: string;

  constructor() {
    this.dir = process.env.LOG_DIR || '/usr/src/app/logs';
    this.allLogsFileName = process.env.ALL_LOGS_FILE || 'app.log';
    this.allLogsFilePath = path.join(this.dir, this.allLogsFileName);

    this.errorLogsFileName = process.env.ERROR_LOG_FILE || 'error.log';
    this.errorLogsFilePath = path.join(this.dir, this.errorLogsFileName);
  }

  async appendAllLogs(line: string) {
    await fs.mkdir(this.dir, { recursive: true });
    await fs.appendFile(this.allLogsFilePath, line + '\n', 'utf8');
  }

  async appendErrorLog(line: string) {
    await fs.mkdir(this.dir, { recursive: true });
    await fs.appendFile(this.errorLogsFilePath, line + '\n', 'utf8');
  }
}
