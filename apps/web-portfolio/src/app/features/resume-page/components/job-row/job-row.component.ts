import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Job } from '@tbs/portfolio-data';

@Component({
  selector: 'app-job-row',
  templateUrl: './job-row.component.html',
  styleUrls: ['./job-row.component.scss'],
})
export class JobRowComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  @Input() job: Job;

  trustedHTML(html: string) {
    console.log(html);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
