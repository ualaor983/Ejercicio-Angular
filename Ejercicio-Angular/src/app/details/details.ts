import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../housing.service';
import {TerrariaItem} from '../housinglocation';

@Component({
  selector: 'app-details',
  imports: [],
  template: `
    <article>
      <section class="listing-description">
        <h2 class="listing-heading">{{ item?.name }}</h2>
        <p class="listing-subtitle">ID: {{ item?.item_id }}</p>
      </section>

      <section class="listing-features">
        <h3 class="section-heading">Receta de creacion</h3>
        @if (item?.recipe) {
          <p class="listing-station">Estacion: {{ item?.recipe?.station }}</p>
          <ul>
            @for (ingredient of item?.recipe?.ingredients ?? []; track $index) {
              <li>{{ ingredient.quantity }}x {{ ingredient.name }}</li>
            }
          </ul>
        } @else {
          <p>Este objeto no tiene receta de creacion.</p>
        }
      </section>

      <section class="listing-features">
        <h3 class="section-heading">Participa en recetas</h3>
        @if ((item?.used_in_recipes?.length ?? 0) > 0) {
          <ul>
            @for (recipeUse of item?.used_in_recipes ?? []; track $index) {
              <li>{{ recipeUse.quantity }}x {{ recipeUse.result }}</li>
            }
          </ul>
        } @else {
          <p>No participa en otras recetas.</p>
        }
      </section>
    </article>
  `,
  styleUrls: ['./details.css'],
})
export class Details {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  itemService = inject(ItemService);
  item: TerrariaItem | undefined;

  constructor() {
    const itemId = parseInt(this.route.snapshot.params['id'], 10);
    this.itemService.getItemById(itemId).then((item) => {
      this.item = item;
      this.changeDetectorRef.markForCheck();
    });
  }
}


