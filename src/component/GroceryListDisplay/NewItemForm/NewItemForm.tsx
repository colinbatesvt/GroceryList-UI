import { useState } from "react";
import GroceryItem from "../../../model/GroceryListItem";
import './NewItemForm.css'
import { addGroceryListItem } from "../../../service/GroceryListService";
import { useDispatch } from "react-redux";
import { updateGroceryList } from "../../../store/state/groceryListSlice";


interface NewItemFormProps {
  listId: number;
}

function NewItemForm(props: NewItemFormProps) {
    const [enteredName, setEnteredName] = useState('');
    const dispatch = useDispatch();

    const nameChanged = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredName(event.currentTarget.value);
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newItem: GroceryItem = {
            name: enteredName,
            checked: false
        };
        
        addGroceryListItem(props.listId, newItem).then(updatedList => {
          if(updatedList) {
            dispatch(updateGroceryList(updatedList));
          }
        });

        setEnteredName("");
    }

    return (
      <form onSubmit={submit} className="flexCenter">
        <div className="form-group mb-2">
            <input className="form-control" id="nameInput" type="text" placeholder="Enter Item Name" value={enteredName} onChange={nameChanged}></input>
        </div>
        
        <button className="btn btn-primary submit mb-2" type="submit">Submit</button>
      </form>
    );
  }
  
  export default NewItemForm;

