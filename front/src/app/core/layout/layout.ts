import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';

@Component({
  imports: [Navbar, RouterOutlet],
  selector: 'app-layout',
  templateUrl: './layout.html',
})
export class Layout {}
