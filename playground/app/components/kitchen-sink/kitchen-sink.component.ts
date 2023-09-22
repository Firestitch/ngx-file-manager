import { Component, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { FsFileManagerConfig } from '@firestitch/package';
import { map } from 'rxjs/operators';
import { FsFileManagerComponent } from 'src/app/components/file-manager';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  @ViewChild('manager') fileManager: FsFileManagerComponent;

  private _url = 'https://boilerplate.local.firestitch.com/api/system/files';

  public config: FsFileManagerConfig = {
    fetch: (path) => {
      const query = { path: path };
      return this.api.get(this._url, query)
        .pipe(
          map(response => response.data.storage_objects)
        );
    },
    deleteFile: (path) => {
      const query = { path: path };
      return this.api.delete(this._url, query)
    },
    deleteDirectory: (path) => {
      const query = { path: path };
      return this.api.delete(this._url + '/directories', query)
    },
    createDirectory: (path) => {
      const query = { path: path };
      return this.api.post(this._url + '/directories', query)
    },
    download: (path) => {
      const query = { path: path };
      return this.api.get(this._url + '/download', query)
        .pipe(
          map(response => response.data.url)
        );
    },
    upload: (path, file) => {
      const query = { path: path, file: file, filename: file.name };
      return this.api.post(this._url + '/upload', query)
        .pipe(
          map(response => response.data.storage_object)
        );
    }
  };

  constructor(
    private exampleComponent: FsExampleComponent,
    private message: FsMessage,
    private api: FsApi
  ) {

  }
}
