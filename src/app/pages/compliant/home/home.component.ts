import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { SignalrService } from 'src/app/services/signalr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  message = '';
  chatMessages: string[] = [];

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private signalRService: SignalrService
  ) {}

  ngOnInit(): void {
    this.signalRService.message$.subscribe((message) => {
      this.chatMessages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.signalRService.sendMessage(this.message);
      this.message = '';
    }
  }

  downloadApk(): void {
    // this.spinner.show();
    window.location.href =
      'https://hellokitty2-001-site1.etempurl.com/Test/api/download';
    window.open(
      'https://hellokitty2-001-site1.etempurl.com/Test/api/download',
      '_blank'
    );
    // this.authService.downloadApk().subscribe(
    //   (res) => {

    //     this.spinner.hide();
    //   },
    //   (error) => {
    //     this.spinner.hide();
    //     // Swal.fire('Warning', 'Something went wrong', 'warning');
    //   }
    // );
  }
}
