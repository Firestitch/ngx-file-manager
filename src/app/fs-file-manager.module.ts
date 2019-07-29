import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatTreeModule,
          MatIconModule,
          MatProgressBarModule,
          MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsMenuModule } from '@firestitch/menu';

import { FsFileManagerComponent } from './components/file-manager/file-manager.component';
import { FsSelectionModule } from '@firestitch/selection';
import { FsDateModule } from '@firestitch/date';
import { FsPromptModule } from '@firestitch/prompt';
import { FsFileModule } from '@firestitch/file';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    FlexLayoutModule,
    FsListModule,
    FsScrollModule,
    FsSelectionModule.forRoot(),
    FsMenuModule,
    FsDateModule,
    FsPromptModule,
    FsFileModule
  ],
  exports: [
    FsFileManagerComponent,
  ],
  declarations: [
    FsFileManagerComponent,
  ],
})
export class FsFileManagerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFileManagerModule
    };
  }
}
