import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsFileManagerConfig } from '@firestitch/package';
import { FsTransferService } from '@firestitch/transfer';
import { of } from 'rxjs';

import { map } from 'rxjs/operators';

import { FsFileManagerComponent } from 'src/app/components/file-manager';
import { FsFileManagerComponent as FsFileManagerComponent_1 } from '../../../../src/app/components/file-manager/file-manager.component';

@Component({
    selector: 'kitchen-sink',
    templateUrl: './kitchen-sink.component.html',
    styleUrls: ['./kitchen-sink.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsFileManagerComponent_1],
})
export class KitchenSinkComponent {
  private _api = inject(FsApi);
  private _transfer = inject(FsTransferService);


  @ViewChild('manager')
  public fileManager: FsFileManagerComponent;

  public config: FsFileManagerConfig = {
    fetch: (path) => {
      const query = { path };

      return this._getData()
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

  private _getData() {
    return of({"storageObjects":[{"fullPath":"pub\/ac","path":"pub","name":"ac","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/ac"},{"fullPath":"pub\/ai","path":"pub","name":"ai","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/ai"},{"fullPath":"pub\/assets","path":"pub","name":"assets","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/assets"},{"fullPath":"pub\/assetsactual","path":"pub","name":"assetsactual","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/assetsactual"},{"fullPath":"pub\/av","path":"pub","name":"av","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/av"},{"fullPath":"pub\/content","path":"pub","name":"content","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/content"},{"fullPath":"pub\/fdi","path":"pub","name":"fdi","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/fdi"},{"fullPath":"pub\/field","path":"pub","name":"field","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/field"},{"fullPath":"pub\/fimactual","path":"pub","name":"fimactual","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/fimactual"},{"fullPath":"pub\/fp","path":"pub","name":"fp","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/fp"},{"fullPath":"pub\/fv","path":"pub","name":"fv","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/fv"},{"fullPath":"pub\/im","path":"pub","name":"im","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/im"},{"fullPath":"pub\/imactual","path":"pub","name":"imactual","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/imactual"},{"fullPath":"pub\/oc","path":"pub","name":"oc","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/oc"},{"fullPath":"pub\/oi","path":"pub","name":"oi","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/oi"},{"fullPath":"pub\/op","path":"pub","name":"op","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/op"},{"fullPath":"pub\/ox","path":"pub","name":"ox","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/ox"},{"fullPath":"pub\/pbi","path":"pub","name":"pbi","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/pbi"},{"fullPath":"pub\/pi","path":"pub","name":"pi","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/pi"},{"fullPath":"pub\/processes","path":"pub","name":"processes","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/processes"},{"fullPath":"pub\/ps","path":"pub","name":"ps","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/ps"},{"fullPath":"pub\/rp","path":"pub","name":"rp","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/rp"},{"fullPath":"pub\/sf","path":"pub","name":"sf","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/sf"},{"fullPath":"pub\/share","path":"pub","name":"share","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/share"},{"fullPath":"pub\/si","path":"pub","name":"si","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/si"},{"fullPath":"pub\/st","path":"pub","name":"st","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/st"},{"fullPath":"pub\/test","path":"pub","name":"test","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/test"},{"fullPath":"pub\/tq","path":"pub","name":"tq","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/tq"},{"fullPath":"pub\/us","path":"pub","name":"us","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/us"},{"fullPath":"pub\/ws","path":"pub","name":"ws","type":"directory","size":null,"mimeType":"application\/force-download","modified":null,"url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/ws"},{"fullPath":"pub\/background-beach-blue-sky-1007657.jpg","path":"pub","name":"background-beach-blue-sky-1007657.jpg","type":"file","size":1616073,"mimeType":"image\/jpeg","modified":"2019-08-26T15:57:00+00:00","url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/background-beach-blue-sky-1007657.jpg"},{"fullPath":"pub\/firestitch-logo.png","path":"pub","name":"firestitch-logo.png","type":"file","size":1008,"mimeType":"image\/png","modified":"2023-06-07T19:25:42+00:00","url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/firestitch-logo.png"},{"fullPath":"pub\/Invoice 119008.pdf","path":"pub","name":"Invoice 119008.pdf","type":"file","size":34750,"mimeType":"application\/pdf","modified":"2019-08-26T15:57:00+00:00","url":"https:\/\/firestitch-local.s3.amazonaws.com\/pub\/Invoice 119008.pdf"}]});
  }

}
