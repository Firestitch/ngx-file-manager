import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsFileManagerConfig } from '@firestitch/package';
import { FsTransferService } from '@firestitch/transfer';

import { map } from 'rxjs/operators';

import { FsFileManagerComponent } from 'src/app/components/file-manager';

@Component({
  selector: 'kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenSinkComponent {

  @ViewChild('manager')
  public fileManager: FsFileManagerComponent;

  public config: FsFileManagerConfig = {
    fetch: (path) => {
      const query = { path };

      return this._api.get(this._url, query)
        .pipe(
          map((response) => response.storageObjects),
        );
    },
    deleteFile: (path) => {
      const query = { path };

      return this._api.delete(this._url, query);
    },
    deleteDirectory: (path) => {
      const query = { path };

      return this._api.delete(`${this._url}/directories`, query);
    },
    createDirectory: (path) => {
      const query = { path };

      return this._api.post(`${this._url}/directories`, query);
    },
    download: (path) => {
      const query = { path };

      return this._api.get(`${this._url}/download`, query)
        .pipe(
          map((response) => response.url),
        );
    },
    downloadZip: (path) => {
      const query = { path };

      return this._transfer.post(`${this._url}/download/zip`, query);
    },
    upload: (path, file) => {
      const query = { path, file, filename: file.name };

      return this._api.post(`${this._url}/upload`, query)
        .pipe(
          map((response) => response.storageObject),
        );
    },
  };

  private _url = 'https://specify.local.firestitch.com/api/system/files';

  constructor(
    private _api: FsApi,
    private _transfer: FsTransferService,
  ) {
  }

}
