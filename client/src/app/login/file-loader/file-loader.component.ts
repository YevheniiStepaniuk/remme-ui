import { KeyStore } from './../../core/auth/key-store.model';
import { Component, OnInit } from '@angular/core';
import { ReadFile, ReadMode } from 'ngx-file-helpers';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss']
})
export class FileLoaderComponent {
  public readMode = ReadMode.dataURL;
  @Output() fileLoaded: EventEmitter<KeyStore> = new EventEmitter();

  public onFilePicked(file: ReadFile) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const keyStore = JSON.parse(reader.result);
        this.fileLoaded.emit(keyStore);
      } catch (e) {
        // message.error('Your file is not a valid');
      }
    };
    reader.readAsText(file.underlyingFile);
  }

  public onDragEnter($event: UIEvent) {
    if($event.target as HTMLDivElement){
      const div = $event.target as HTMLDivElement;
      div.classList.add('hover');
    }
  }

  public onDragOver($event: UIEvent){
    if($event.target as HTMLDivElement){
      const div = $event.target as HTMLDivElement;
      div.classList.remove('hover');
    }
  }
}
