// src/app/pages/todo/wrapper.todo.ts

import { StatefulWidget } from "../../default/StatefulWidget";
import { create } from "./create.todo";
import { list } from "./list.todo";
import './todo.style.css';

export class todo extends StatefulWidget {
    mountChildWidgets() {
        let widget1 = this.getElementById("widget1");
        let widget2 = this.getElementById("widget2");
        let creating = new create();
        let listing = new list();

        if (widget1) {
            this.childWidgets.push(creating);
            creating.mount(widget1);
        }
        if (widget2) {
            listing.dataChange((value: any) => {
                this.UpdateChildData(value, creating);
            });
            this.childWidgets.push(listing);
            listing.mount(widget2);
        }
    }

    getHtml(): string {
        return `<div class="flex-container">
            <div id="widget1"></div>
        </div>
        <div class="flex-container">
            <div id="widget2"></div>
        </div>`;
    }
}