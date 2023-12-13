import { Observable } from 'rxjs';

import { FsFileManagerFile } from './file-manager-file';

export interface FsFileManagerConfig {
  fetch: (path: string) => Observable<FsFileManagerFile[]>;
  deleteFile: (path: string) => Observable<any>;
  deleteDirectory: (path: string) => Observable<any>;
  createDirectory: (path: string) => Observable<any>;
  download: (path: string) => Observable<string>;
  downloadZip: (path: string) => void;
  upload: (path: string, file: File) => Observable<any>;
}
