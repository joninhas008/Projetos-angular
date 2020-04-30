import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pageTitle = 'My Games';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  changeTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.title) {
            return `${child.snapshot.data.title} ~ ${this.pageTitle}`;
          } else {
            return this.pageTitle;
          }
        }
        return this.pageTitle;
      })).subscribe((title: any) => {
        this.titleService.setTitle(title);
      });
  }

  menuToggle() {
    $(document).ready(() => { // JQuery

      if ($('#links').is(':visible')) { // Se o menu está visível
        this.menuHide(); // Chama o método que oculta o menu
      } else { // Se o menu está oculto
        this.menuShow(); // Chama o método que mostra o menu
      }

    });
    return false; // Retorna sem fazer mais nada
  }

  menuHide() {
    $('#links').slideUp('fast');
  }

  menuShow() {
    $('#links').slideDown('fast');
  }

  ngOnInit(): void {

    this.changeTitle();

    $(document).ready(() => { // JQuery


      $(window).resize(() => {
        if (window.innerWidth > 511) { // Se a largura é maior que 511 px
          $('#links').show(0); // Sempre mostra o menu
        } else { // Se a largura é menor ou igual a 511 px
          $('#links').hide(0); // Sempre oculta o menu
        }
      });

      $(document).on('click', '#links > a', () => {
        if (window.innerWidth < 512) { // Se a largura é menor que 512 px
          $('#links').slideUp('fast'); // Oculta o menu principal
        }
      });

    });

  }

}
