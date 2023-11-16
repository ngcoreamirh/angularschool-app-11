import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dragAndDropUpload]'
})
export class DragAndDropUploadDirective {

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() filesDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(_evt) {
    _evt.preventDefault();
    _evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(_evt) {
    _evt.preventDefault();
    _evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(_evt) {
    _evt.preventDefault();
    _evt.stopPropagation();
    this.fileOver = false;
    let files = _evt.dataTransfer.files;
    if (files.length > 0) {
      this.filesDropped.emit(files);
    }
  }

}
