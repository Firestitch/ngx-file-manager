import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { FS_TRANSFER_HANDLER } from '@firestitch/transfer';
import { TransferHandler } from './app/handlers/transfer.handler';
import { FsMessage, FsMessageModule } from '@firestitch/message';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsFileManagerModule } from '@firestitch/package';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { FsSelectionModule } from '@firestitch/selection';
import { FsExampleModule } from '@firestitch/example';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { FsApiModule } from '@firestitch/api';
import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsFileModule } from '@firestitch/file';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsFileManagerModule.forRoot(), FormsModule, FsLabelModule, FsSelectionModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsApiModule.forRoot(), FsListModule.forRoot(), FsScrollModule.forRoot(), FsFileModule.forRoot(), DragulaModule.forRoot()),
        {
            provide: FS_TRANSFER_HANDLER,
            useClass: TransferHandler,
            deps: [FsMessage],
        },
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch(err => console.error(err));

