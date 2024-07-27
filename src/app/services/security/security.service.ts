import { Injectable } from '@angular/core';
import { JSEncrypt } from 'jsencrypt';
import * as Forge from 'node-forge';
import { StorageService } from '../storage/storage.service';
import { PksKv } from './pkskv.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private jsEncrypt: JSEncrypt;

  constructor(
    private storage: StorageService
  ) { }

  public init() {
    this.jsEncrypt = new JSEncrypt();
    this.getPairKey().then(pair => {
      this.jsEncrypt.setKey(pair.pvtkv);
    });
  }
  
  private generatePairKey(): PksKv {
    let pair = Forge.pki.rsa.generateKeyPair(2048, 0x10001);
    return {
      pvtkv: Forge.pki.privateKeyToPem(pair.privateKey),
      pbckv: Forge.pki.publicKeyToPem(pair.publicKey)
    };
  }

  private async getPairKey() {
    let pairKey = await this.storage.getPksKv();
    if(!pairKey) {
      pairKey = this.generatePairKey();
      await this.storage.setPksKv(pairKey);
    }
    return pairKey;
  }

  public encrypt(data: string) {
    return this.jsEncrypt.encrypt(data);
  }

  public decrypt(data: string) {
    return this.jsEncrypt.decrypt(data);
  }

}
