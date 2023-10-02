import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocationAlertService } from 'src/app/services/location-alert.service';
import Swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-crime-mapping',
  templateUrl: './crime-mapping.component.html',
  styleUrls: ['./crime-mapping.component.scss'],
})
export class CrimeMappingComponent implements OnInit {
  currentPage: number = 1;
  resultPerPage: number = 10;

  constructor(
    private locationAlertService: LocationAlertService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initialMaps();
  }

  initialMaps(
    currentPageVal: number = 1,
    resultPerPageVal: number = 1000000
  ): void {
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
      zoom: 8,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        // {
        //   featureType: 'administrative',
        //   elementType: 'labels.text.fill',
        //   stylers: [{ color: '#444444' }],
        // },
        // {
        //   featureType: 'landscape',
        //   elementType: 'all',
        //   stylers: [{ color: '#f2f2f2' }],
        // },
        // {
        //   featureType: 'poi',
        //   elementType: 'all',
        //   stylers: [{ visibility: 'off' }],
        // },
        // {
        //   featureType: 'road',
        //   elementType: 'all',
        //   stylers: [{ saturation: -100 }, { lightness: 45 }],
        // },
        // {
        //   featureType: 'road.highway',
        //   elementType: 'all',
        //   stylers: [{ visibility: 'simplified' }],
        // },
        // {
        //   featureType: 'road.arterial',
        //   elementType: 'labels.icon',
        //   stylers: [{ visibility: 'off' }],
        // },
        // {
        //   featureType: 'transit',
        //   elementType: 'all',
        //   stylers: [{ visibility: 'off' }],
        // },
        // {
        //   featureType: 'water',
        //   elementType: 'all',
        //   stylers: [{ color: '#5e72e4' }, { visibility: 'on' }],
        // },
      ],
    };

    this.locationAlertService
      .getLocationList(
        'not closed completed',
        '',
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;
          console.log('this.result: ', result);
          map = new google.maps.Map(map, mapOptions);
          if (result.length >= 2) {
            result.forEach((item, index) => {
              var marker = new google.maps.Marker({
                position: { lat: item.Lat, lng: item.Long },
                map: map,
                animation: google.maps.Animation.DROP,
                title: 'Hello World!',
              });

              // var contentString =
              //   '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
              //   '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

              // var infowindow = new google.maps.InfoWindow({
              //   content: contentString,
              // });

              google.maps.event.addListener(marker, 'click', function () {
                // infowindow.open(map, marker);
              });
            });
          } else if (result.length == 1) {
            var marker = new google.maps.Marker({
              position: { lat: result[0].Lat, lng: result[0].Long },
              map: map,
              animation: google.maps.Animation.DROP,
              title: 'Hello World!',
            });

            // var contentString =
            //   '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
            //   '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

            // var infowindow = new google.maps.InfoWindow({
            //   content: contentString,
            // });

            google.maps.event.addListener(marker, 'click', function () {
              // infowindow.open(map, marker);
            });
          } else {
            console.log('zero results:');
          }

          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire('Warning', 'Something went wrong', 'warning');
        }
      );
  }
}
