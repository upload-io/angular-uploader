import { Directive, HostListener, Input, OnInit } from "@angular/core";
import { Uploader, UploaderOptions, UploaderResult } from "uploader";

@Directive({
  selector: "[uploadButton]"
})
export class UploadButtonDirective implements OnInit {
  @Input("uploadOptions") options?: UploaderOptions;
  @Input("uploader") uploader?: Uploader;
  @Input("uploadComplete") onComplete?: (files: UploaderResult[]) => void;

  @HostListener("click", ["$event"]) onClick(event: any) {
    event.preventDefault();

    this.getUploader()
      .open(this.options)
      .then(
        files => {
          if (this.onComplete !== undefined) {
            this.onComplete(files);
          }
        },
        error => console.error("Uploader error.", error)
      );
  }

  ngOnInit(): void {
    try {
      this.getUploader();
    } catch (e) {
      console.error(e);
    }
  }

  private getUploader(): Uploader {
    if (this.uploader === undefined) {
      throw new Error(
        "[angular-uploader] You must provide the 'uploader' attribute to elements marked with the 'uploadButton' directive."
      );
    }

    return this.uploader;
  }
}