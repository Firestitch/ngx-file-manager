import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FsApiModule } from '@firestitch/api';
import { FsExampleModule } from '@firestitch/example';
import { FsFileModule } from '@firestitch/file';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsMessage, FsMessageModule } from '@firestitch/message';
import { FsFileManagerModule } from '@firestitch/package';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';
import { FS_TRANSFER_HANDLER } from '@firestitch/transfer';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import {
  ExamplesComponent,
  KitchenSinkComponent,
} from './components';
import { KitchenSinkConfigureComponent } from './components/kitchen-sink-configure';
import { TransferHandler } from './handlers/transfer.handler';
import { AppMaterialModule } from './material.module';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsFileManagerModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsSelectionModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    FsApiModule.forRoot(),
    FsListModule.forRoot(),
    FsScrollModule.forRoot(),
    FsFileModule.forRoot(),
    DragulaModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    KitchenSinkConfigureComponent,
  ],
  providers: [
    {
      provide: FS_TRANSFER_HANDLER,
      useClass: TransferHandler,
      deps: [FsMessage],
    },
  ],
})
export class PlaygroundModule {
}
