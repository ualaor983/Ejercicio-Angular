import {Component, input} from '@angular/core';
import {TerrariaItem} from '../housinglocation';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [RouterLink],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ item().name }}</h2>
      <p class="listing-id">ID: {{ item().item_id }}</p>
      <p class="listing-station">
        Estacion: {{ item().recipe?.station || 'No tiene receta de creacion' }}
      </p>
      <a [routerLink]="['/details', item().item_id]">Ver detalle</a>
    </section>
  `,
  styleUrls: ['./housing-location.css'],
})
export class ItemCard {
  item = input.required<TerrariaItem>();
}
