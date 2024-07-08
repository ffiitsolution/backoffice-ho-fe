import { Component } from '@angular/core';

import { navItems } from './_nav';
import { IdleService } from '../../services/idle.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: 'default-layout.component.html',
  styleUrls: ['default-layout.component.scss']
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor (
    private idleService: IdleService
  ) {}
}
