"use strict";
// 🔄 Multi-Type Storage System
// 📦 Create a system that can store and manage different types of data.
class MyStorage {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
        if (typeof item === "object" && item !== null && "name" in item) {
            return `User ${item.name} added.`;
        }
        return `${item} added to storage.`;
    }
    removeItem(value) {
        const index = this.items.findIndex(item => JSON.stringify(item) === JSON.stringify(value));
        if (index !== -1) {
            this.items.splice(index, 1);
            return `${JSON.stringify(value)} removed from storage.`;
        }
        return `Item not found.`;
    }
    getItems() {
        return this.items;
    }
    findItem(prop, val) {
        return this.items.find(item => typeof item === "object" &&
            item !== null &&
            item[prop] === val);
    }
    updateItem(prop, val, update) {
        const index = this.items.findIndex(item => typeof item === "object" &&
            item !== null &&
            item[prop] === val);
        if (index !== -1) {
            this.items[index] = update;
            if ("name" in update) {
                return `${update.name} updated successfully.`;
            }
            return `Item updated successfully.`;
        }
        return `Item not found.`;
    }
}
// ====================
// ✅ Test cases
// ====================
const numberStrStorage = new MyStorage();
console.log(numberStrStorage.addItem(10)); // "10 added to storage."
console.log(numberStrStorage.addItem(20)); // "20 added to storage."
console.log(numberStrStorage.getItems()); // [10, 20]
console.log(numberStrStorage.removeItem(10)); // "10 removed from storage."
console.log(numberStrStorage.getItems()); // [20]
const userStorage = new MyStorage();
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
