import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { FsListConfig, FsListComponent } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';
import { FsFile } from '@firestitch/file';
import { FsFileManagerConfig } from '../../interfaces/file-manager-config';


/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'fs-file-manager',
  templateUrl: 'file-manager.component.html',
  styleUrls: [ 'file-manager.component.scss' ]
})
export class FsFileManagerComponent implements OnInit {

  @ViewChild('list') list: FsListComponent;
  public path = '';
  public pathParts = [];
  public items = [];

  public listConfig: FsListConfig;

  @Input('config') config: FsFileManagerConfig;

  constructor(private _prompt: FsPrompt) {}

  fetch(path) {
    this.path = path.replace(/^\//, '');
    this.pathParts = this.path.split('/');
    this.list.reload();
  }

  refresh() {
    this.fetch(this.path);
  }

  ngOnInit() {

    this.listConfig = {
      fetch: (query) => {

        return Observable.create(observer => {
          this.config.fetch(this.path)
          .subscribe(response => {
            this.items = response;

            observer.next({ data: response });
          });
        });
      }
    }
  }

  fetchPathPart(index) {
    const path = this.pathParts
                  .splice(0, index + 1)
                  .join('/');
    this.fetch(path);
  }

  createDirectory() {
    this._prompt.input({
      title: 'Create Folder',
      template: 'Please specify the directory name'
    }).subscribe((name) => {
      this.config.createDirectory(this.path + '/' + name)
      .subscribe(response => {
        this.refresh();
      });
    }, (error: any) => {

    });
  }

  deleteFile(item) {
    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to delete the file?'
    }).subscribe(() => {
      this.config.deleteFile(this.path + '/' + item.name)
      .subscribe(response => {
        this.refresh();
      });
    }, (error: any) => {

    });
  }

  download(item) {
    this.config.download(this.path + '/' + item.name)
    .subscribe(response => {
      window.open(response, 'menubar=no,location=no,resizable=no,scrollbars=no,status=no');
    });
  }

  selectUpload(fsFile: FsFile) {
    this.config.upload(this.path, fsFile.file)
    .subscribe(response => {
      this.refresh();
    });
  }

  deleteDirectory(item) {
    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to delete this directory?'
    }).subscribe(() => {
      this.config.deleteDirectory(this.path + '/' + item.name)
      .subscribe(response => {
        this.refresh();
      });
    }, (error: any) => {

    });
  }
}
