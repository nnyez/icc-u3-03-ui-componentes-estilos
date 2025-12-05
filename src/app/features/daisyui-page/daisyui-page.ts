import { Component } from '@angular/core';
import { Code } from './components/code/code';
import { Table } from './components/table/table';
import { Card } from './components/card/card';
import { CardResponsivew } from './components/card-responsivew/card-responsivew';
import { Hover } from './components/hover/hover';
import { HoverGallery } from './components/hover-gallery/hover-gallery';

@Component({
  selector: 'app-daisyui-page',
  imports: [Code, Table, Card, CardResponsivew, Hover, HoverGallery],
  templateUrl: './daisyui-page.html',
  styleUrl: './daisyui-page.css',
})
export class DaisyuiPage {}
