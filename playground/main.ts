import { enableProdMode, importProvidersFrom } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
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
import { AppComponent } from './app/app.component';
import { ExamplesComponent } from './app/components';
import { TransferHandler } from './app/handlers/transfer.handler';
import { environment } from './environments/environment';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsFileManagerModule.forRoot(), FormsModule, FsLabelModule, FsSelectionModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsApiModule.forRoot(), FsListModule.forRoot(), FsScrollModule.forRoot(), FsFileModule.forRoot()),
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

