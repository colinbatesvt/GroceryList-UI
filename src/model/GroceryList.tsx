import GroceryListItem from './GroceryListItem';

export default interface GroceryList {
    name: string;
    items: GroceryListItem[];
}