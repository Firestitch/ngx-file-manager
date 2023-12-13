import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTreeModule } from '@angular/material/tree';


import { FsCommonModule } from '@firestitch/common';
import { FsDateModule } from '@firestitch/date';
import { FsFileModule } from '@firestitch/file';
import { FsListModule } from '@firestitch/list';
import { FsMenuModule } from '@firestitch/menu';
import { FsPromptModule } from '@firestitch/prompt';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';

import { FsFileManagerComponent } from './components/file-manager/file-manager.component';


@NgModule({
  imports: [
    CommonModule,

    FlexLayoutModule,

    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,

    FsListModule,
    FsScrollModule,
    FsSelectionModule,
    FsMenuModule,
    FsDateModule,
    FsPromptModule,
    FsFileModule,
    FsCommonModule,
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
      ngModule: FsFileManagerModule,
    };
  }
}
