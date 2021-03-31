import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'anms-explications',
  templateUrl: './explications.component.html',
  styleUrls: ['./explications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplicationsComponent implements OnInit {
  large: boolean;

  constructor(private ref: ChangeDetectorRef,
    private observableMedia: MediaObserver) { }

  ngOnInit(): void {
  }
  ngAfterContentInit() {

    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log('change');
      console.log(change);
      
      console.log(change[0].mqAlias)
      if(change[0].mqAlias == "sm"|| change[0].mqAlias == "xs"){
        this.large = false;
      }else{
        this.large = true;
      }
  
      this.ref.markForCheck();
      });
    }
}
