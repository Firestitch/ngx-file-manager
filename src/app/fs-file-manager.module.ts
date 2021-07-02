import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsMenuModule } from '@firestitch/menu';

import { FsSelectionModule } from '@firestitch/selection';
import { FsDateModule } from '@firestitch/date';
import { FsPromptModule } from '@firestitch/prompt';
import { FsFileModule } from '@firestitch/file';

import { FsFileManagerComponent } from './components/file-manager/file-manager.component';


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
    FsSelectionModule,
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
  static forRoot(): ModuleWithProviders<FsFileManagerModule> {
    return {
      ngModule: FsFileManagerModule
    };
  }
}
