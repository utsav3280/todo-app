import React from "react";
import { useReducer } from "react";
import "../src/styles.css"

const ToDo = () => {
    const reducer = (list, action) => {
        switch (action.type) {
            case "addList":
                if (list.inputValue !== "") {
                    list = { ...list, array: [...list.array, list.inputValue], inputValue: "" };
                }
                break;
            case "readData":
                list = { ...list, inputValue: action.data };
                break;
            case "delete":
                let arr = [];
                for (let i = 0; i < list.array.length; i++) {
                    if (i !== action.index) arr.push(list.array[i]);
                }
                list = { ...list, array: arr };
                break;
            case "edit":
                list.flag = false;
                list = { ...list, inputValue: action.element };
                list.editItem = action.index;
                break;
            case "updateList":
                if (list.inputValue !== "") {
                    for (let i = 0; i < list.array.length; i++) {
                        if (i === list.editItem) list.array[i] = list.inputValue;
                    }
                    list = { ...list, array: list.array, flag: true, editItem: null, inputValue: "" };
                }
                break;
        }
        return list;
    }
    const [list, dispatch] = useReducer(reducer, { array: [], inputValue: "", flag: true, editItem: null });
    return (
        <div id="big-container">
            <div>
                <h1>To-Do List</h1>
                <input type="text" value={list.inputValue} onChange={(event) => { dispatch({ type: "readData", data: event.target.value }) }} id="task" placeholder="Enter To-Do" />
                <input id={(list.flag) ? "btn" : "btn-save"} value={(list.flag) ? "Add Item" : "Update Item"} type="button" onClick={() => { (list.flag) ? dispatch({ type: "addList" }) : dispatch({ type: "updateList" }) }} />
                {
                    list.array.map((ele, idx) => {
                        return (
                            <div key={idx} className="list">
                                <span>{ele}</span>
                                <button className="delete" onClick={() => { dispatch({ type: "delete", index: idx }) }}>Delete</button>
                                <button className="edit" onClick={() => { dispatch({ type: "edit", index: idx, element: ele }) }}>Edit</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ToDo;