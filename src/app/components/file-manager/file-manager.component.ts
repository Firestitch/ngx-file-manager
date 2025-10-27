import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { FsClipboard } from '@firestitch/clipboard';
import { FsCommonModule, guid } from '@firestitch/common';
import { FsDateModule } from '@firestitch/date';
import { FsFile, FsFileModule } from '@firestitch/file';
import { FsGallery, FsGalleryItem } from '@firestitch/gallery';
import { FsListComponent, FsListConfig, FsListModule } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';

import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { FsFileManagerConfig } from '../../interfaces/file-manager-config';


@Component({
  selector: 'fs-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIcon,
    FsFileModule,
    MatMiniFabButton,
    FsListModule,
    FsDateModule,
    FsCommonModule,
  ],
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
    private _gallery: FsGallery,
  ) { }

  public openPreview(item) {
    this.config.download(`${this.pathString}/${item.name}`)
      .subscribe((blob) => {
        const galleryItem: FsGalleryItem = {
          url: new File([blob], item.name),
          name: item.name,
          guid: guid(),
        };
  
        this._gallery.openPreviews([galleryItem], {
          config: {
            details: {
              autoOpen: true,
            },
          },
        });
      });
  }

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
            this._clipboard.copy(item.url);
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
                  mimeTypeImage: item.mimeType?.match(/^image/),
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
      template: 'Please specify the folder name',
    })
      .pipe(
        switchMap((name) => {
          const dir = `${this.pathString}/${name}`;

          return this.config.createDirectory(dir)
            .pipe(
              tap(() => {
                this.openDir(dir);
              }),
            );            
        }),
      )
      .subscribe();
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

  public download(item: FsGalleryItem) {
    this.config.download(`${this.pathString}/${item.name}`)
      .subscribe((file: Blob) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = URL.createObjectURL(file);

        if (item.name) {
          a.download = item.name;
        }

        a.click();
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
      template: 'Are you sure you would like to delete this folder?',
    })
      .pipe(
        switchMap(() => this.config.deleteDirectory(`${this.pathString}/${item.name}`)),
      )
      .subscribe(() => {
        this.reload();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
