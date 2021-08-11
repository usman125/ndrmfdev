import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-attachments',
  templateUrl: './show-attachments.component.html',
  styleUrls: ['./show-attachments.component.css']
})
export class ShowAttachmentsComponent implements OnInit {
  complainToedit: any;
  downloadingFileLink: BinaryType;
  fileUrl;
  constructor(
    private userServices: UserService,
  ) { }

  ngOnInit(): void {
    this.complainToedit = JSON.parse(localStorage.getItem('complainToEdit'));
    console.log("complaint to edit ", this.complainToedit)
    this.userServices.downLoadFile(this.complainToedit.id).subscribe(
      (result) => {
        this.downloadingFileLink = result
      },
      err => {
        console.log(err)
      }
    );
  }
  downloadFile() {
    let data = this.downloadingFileLink
    console.log("in which shape", data)
  }
}
