// 🔄 Multi-Type Storage System
// 📦 Create a system that can store and manage different types of data.

class MyStorage<T, U> {
  private items: T[] = [];

  addItem(item: T): string {
    this.items.push(item);
    if (typeof item === "object" && item !== null && "name" in item) {
      return `User ${(item as any).name} added.`;
    }
    return `${item} added to storage.`;
  }

  removeItem(value: T): string {
    const index = this.items.findIndex(item => JSON.stringify(item) === JSON.stringify(value));
    if (index !== -1) {
      this.items.splice(index, 1);
      return `${JSON.stringify(value)} removed from storage.`;
    }
    return `Item not found.`;
  }

  getItems(): T[] {
    return this.items;
  }

  findItem(prop: keyof T, val: any): T | undefined {
    return this.items.find(item =>
      typeof item === "object" &&
      item !== null &&
      (item as any)[prop] === val
    );
  }

  updateItem(prop: keyof T, val: any, update: T): string {
    const index = this.items.findIndex(item =>
      typeof item === "object" &&
      item !== null &&
      (item as any)[prop] === val
    );

    if (index !== -1) {
      this.items[index] = update;
      if ("name" in (update as any)) {
        return `${(update as any).name} updated successfully.`;
      }
      return `Item updated successfully.`;
    }
    return `Item not found.`;
  }
}

// ====================
// ✅ Test cases
// ====================

const numberStrStorage = new MyStorage<number, string>();

console.log(numberStrStorage.addItem(10)); // "10 added to storage."
console.log(numberStrStorage.addItem(20)); // "20 added to storage."
console.log(numberStrStorage.getItems());  // [10, 20]
console.log(numberStrStorage.removeItem(10)); // "10 removed from storage."
console.log(numberStrStorage.getItems());  // [20]

const userStorage = new MyStorage<{ id: number; name: string }, string>();

console.log(userStorage.addItem({ id: 1, name: "Alice" })); // "User Alice added."
console.log(userStorage.addItem({ id: 2, name: "Bob" })); // "User Bob added."
console.log(userStorage.getItems()); 
// [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' } ]

console.log(userStorage.findItem("name", "Alice")); 
// { id: 1, name: 'Alice' }

console.log(userStorage.updateItem("id", 1, { id: 1, name: "Alice Updated" })); 
// "Alice Updated updated successfully."

console.log(userStorage.getItems()); 
// [ { id: 1, name: 'Alice Updated' }, { id: 2, name: 'Bob' } ]
