import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ItemCard} from '../housing-location/housing-location';
import {TerrariaItem} from '../housinglocation';
import {ItemService} from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [ItemCard],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filtrar por nombre" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Buscar</button>
      </form>
    </section>
    <section class="results">
      @for (item of filteredItemList; track item.item_id) {
        <app-item-card [item]="item" />
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  itemList: TerrariaItem[] = [];
  itemService: ItemService = inject(ItemService);
  filteredItemList: TerrariaItem[] = [];

  constructor() {
    this.itemService.getAllItems().then((itemList: TerrariaItem[]) => {
      this.itemList = itemList;
      this.filteredItemList = itemList;
      this.changeDetectorRef.markForCheck();
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredItemList = this.itemList;
      return;
    }

    this.filteredItemList = this.itemList.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
