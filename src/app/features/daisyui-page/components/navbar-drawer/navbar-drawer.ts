import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeSwitcher } from "../../../../shared/components/theme-switcher/theme-switcher";

@Component({
  selector: 'app-navbar-drawer',
  imports: [RouterLink, RouterLinkActive, ThemeSwitcher],
  templateUrl: './navbar-drawer.html',
  styleUrl: './navbar-drawer.css',
})
export class NavbarDrawer {

}
