import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BUILD_INFO } from '../../_shared/build-info';

@Component({
  selector: 'laksh-build-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-info.component.html',
  styleUrls: ['./build-info.component.scss']
})
export class BuildInfoComponent implements OnInit {
  buildInfo = BUILD_INFO;

  buildVersion = '';
  buildAdditionData = '';

  ngOnInit(): void {
    this.buildVersion = this.buildInfo.version;
    this.buildAdditionData = this.buildInfo.commitHash + ' ' + this.buildInfo.buildDate;
  }

}
