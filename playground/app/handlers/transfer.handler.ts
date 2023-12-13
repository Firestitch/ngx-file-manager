import { FsMessage } from '@firestitch/message';
import { FsTransferHandler, Request } from '@firestitch/transfer';

export class TransferHandler extends FsTransferHandler {
  constructor(private _message: FsMessage) {
    super();
  }

  public begin(request: Request) {
    console.log('begin ', request);

    this._message.info('Starting download...');

    return request.clone({ path: request.path });
  }

  public error(data, raw) {

    const message = data && data.message ? data.message : 'There was a problem with the download';

    this._message.error(message);
  }
}
