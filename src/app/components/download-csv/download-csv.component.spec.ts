import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../../web-socket.service';

import { DownloadCsvComponent } from './download-csv.component';

describe('DownloadCsvComponent', () => {
  let component: DownloadCsvComponent;
  let fixture: ComponentFixture<DownloadCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCsvComponent ],
      imports: [HttpClientModule],
      providers:[WebSocketService,ToastrService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
