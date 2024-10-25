// src/app/pages/todo/list.todo.ts

import { DeleteConceptById, GetCompositionListListener, NORMAL } from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
import { getLocalUserId } from "../user/login.service";
import './todo.style.css';

export class list extends StatefulWidget {
    todos: any = [];
    inpage: number = 10;
    page: number = 1;
    linker: string = "console_folder_s";

    widgetDidMount(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_todo", userId, this.inpage, this.page, NORMAL).subscribe((output: any) => {
            this.todos = output;
            this.render();
        })
    }

    addEvents() {
        let tableElement = this.getElementById("mainbody");
        if (tableElement) {
            if (this.todos.length > 0) {
                for (let i = 0; i < this.todos.length; i++) {
                    let id = this.todos[i].the_todo.id;

                    if (id) {
                        let row = document.createElement("tr");
                        let col1 = document.createElement("td");
                        let col2 = document.createElement("td");
                        let col3 = document.createElement("td");
                        let col4 = document.createElement("td");

                        let title = document.createElement("span");
                        let titleValue = this.todos[i].the_todo.title;
                        let contentValue = this.todos[i].the_todo.content;
                        title.innerHTML = titleValue;

                        let content = document.createElement("span");
                        content.innerHTML = contentValue;

                        let edit = document.createElement("button");
                        edit.setAttribute('class', 'btn btn-primary');
                        edit.setAttribute('padding', "10px");
                        edit.id = this.todos[i].the_todo.id;
                        edit.innerHTML = "Edit";

                        let del = document.createElement("button");
                        del.setAttribute('class', 'btn btn-primary');
                        del.setAttribute('padding', "10px");
                        del.id = this.todos[i].the_todo.id;
                        del.innerHTML = "Delete";
                        del.onclick = () => {
                            if (id) {
                                DeleteConceptById(id).then(() => {
                                    console.log("Todo deleted");
                                });
                            }
                        }

                        let that = this;
                        edit.onclick = () => {
                            that.data = {
                                "id": edit.id,
                                "title": titleValue,
                                "content": contentValue
                            }
                            that.notify();
                        }

                        col1.append(title);
                        col2.append(content);
                        col3.append(del);
                        col4.append(edit);

                        row.appendChild(col1);
                        row.appendChild(col2);
                        row.appendChild(col3);
                        row.appendChild(col4);
                        tableElement.append(row);
                    }
                }
            }
        }
    }

    getHtml(): string {
        return `<div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody id="mainbody">
                </tbody>
            </table>
        </div>`;
    }
}