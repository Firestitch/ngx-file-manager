import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { FsClipboard } from '@firestitch/clipboard';
import { FsFile } from '@firestitch/file';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';

import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { FsFileManagerConfig } from '../../interfaces/file-manager-config';


@Component({
  selector: 'fs-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFileManagerComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent)
  public list: FsListComponent;

  @Input('config') public config: FsFileManagerConfig;

  public path = [];
  public items = [];

  public listConfig: FsListConfig;

  private _destroy$ = new Subject();

  constructor(
    private _prompt: FsPrompt,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    private _clipboard: FsClipboard,
  ) { }

  public openDir(path) {
    this._router.navigate([], {
      queryParams: {
        dir: path,
      },
    });
  }

  public fetch(path) {
    this.path = path.replace(/^\//, '').split('/');
    this.reload();
  }

  public reload() {
    this.list.reload();
  }

  public ngOnInit() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._destroy$),
      )
      .subscribe((event) => {
        this.fetch((this._route.snapshot.queryParams.dir || ''));
        this._cdRef.markForCheck();
      });

    this.path = (this._route.snapshot.queryParams.dir || '')
      .replace(/(^\/|\/$)/,'')
      .split('/');

    this.listConfig = {
      rowActions: [
        {
          label: 'Copy URL',
          show: (item) => item.type === 'file' && item.url,
          click: (item) => {
            this._clipboard.copy(item.url)
          },
        },
        {
          label: 'Download',
          show: (item) => item.type === 'file',
          click: (item) => {
            this.download(item);
          },
        },
        {
          label: 'Download',
          show: (item) => item.type === 'directory',
          click: (item) => {
            this.downloadZip(`${this.pathString}/${item.name}`);
          },
        },
        {
          label: 'Delete',
          show: (item) => item.type === 'file',
          click: (item) => {
            this.deleteFile(item);
          },
        },
        {
          label: 'Delete',
          show: (item) => item.type === 'directory',
          click: (item) => {
            this.deleteDirectory(item);
          },
        },
      ],
      fetch: () => {
        return this.config.fetch(this.pathString)
          .pipe(
            map((response) => {
              const data = response
                .map((item: any) => ({
                  ...item,
                  mimeTypeImage: item.mimeType.match(/^image/),
                }));

              return { data };
            }),
          );
      },
    };
  }

  public fetchPathPart(index: number) {
    const path = this.path
      .splice(0, index + 1)
      .join('/');

    this.openDir(path);
  }

  public createDirectory() {
    this._prompt.input({
      title: 'Create Folder',
      required: true,
      template: 'Please specify the directory name',
    })
      .pipe(
        switchMap((name) => this.config.createDirectory(`${this.pathString}/${name}`)),
      )
      .subscribe(() => {
        this.reload();
      });
  }

  public deleteFile(item) {
    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to delete the file?',
    })
      .pipe(
        switchMap(() => this.config.deleteFile(`${this.pathString}/${item.name}`)),
      )
      .subscribe(() => {
        this.reload();
      });
  }

  public downloadZip(path) {
    this.config.downloadZip(path);
  }

  public get pathString() {
    return this.path.join('/');
  }

  public download(item) {
    this.config.download(`${this.pathString}/${item.name}`)
      .subscribe((response) => {
        window.open(response, 'menubar=no,location=no,resizable=no,scrollbars=no,status=no');
      });
  }

  public selectUpload(fsFile: FsFile) {
    this.config.upload(this.pathString, fsFile.file)
      .subscribe(() => {
        this.reload();
      });
  }

  public deleteDirectory(item) {
    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to delete this directory?',
    })
      .pipe(
        switchMap(() => this.config.deleteDirectory(`${this.pathString}/${item.name}`)),
      )
      .subscribe(() => {
        this.reload();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
