import {Injectable} from '@angular/core';
import {TerrariaItem} from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly url = 'assets/items.json';
  private itemsPromise?: Promise<TerrariaItem[]>;

  private async loadItems(): Promise<TerrariaItem[]> {
    if (!this.itemsPromise) {
      this.itemsPromise = fetch(this.url).then(async (response) => {
        const data = await response.json();
        return (data as TerrariaItem[]) ?? [];
      });
    }

    return this.itemsPromise;
  }

  async getAllItems(): Promise<TerrariaItem[]> {
    return this.loadItems();
  }

  async getItemById(id: number): Promise<TerrariaItem | undefined> {
    const items = await this.loadItems();
    return items.find((item) => item.item_id === id);
  }
}

