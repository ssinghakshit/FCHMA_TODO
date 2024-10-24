// src/app/pages/todo/create.todo.ts

import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
import './todo.style.css';
import { getLocalUserId } from "../user/login.service";

export class create extends StatefulWidget {
    addEvents(): void {
        let userId: number = getLocalUserId();
        let order: 1;
        let title = this.getElementById("title") as HTMLInputElement;
        let content = this.getElementById("content") as HTMLInputElement;
        let id = this.getElementById("id") as HTMLInputElement;

        if (this.data) {
            title.value = this.data.title;
            content.value = this.data.content;
            id.value = this.data.id;
        }

        let submitButton = this.getElementById("submit");
        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                if (id.value) {
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "title": title.value,
                        "content": content.value
                    }
                    UpdateComposition(patcherStructure);
                }
                else {
                    MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE).then((mainconcept) => {
                        MakeTheInstanceConceptLocal("title", title.value, false, userId, PRIVATE).then((concept) => {
                            MakeTheInstanceConceptLocal("content", content.value, false, userId, PRIVATE).then((concept2) => {
                                CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(() => {
                                    CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(() => {
                                        LocalSyncData.SyncDataOnline();
                                    })
                                })
                            });
                        });
                    });
                }

                // Clear form after submission
                title.value = '';
                content.value = '';
            }
        }
    }

    getHtml(): string {
        let html = "";
        html = `<div class="container">
            <form>
                <div>
                    <input type="number" id="id" hidden>
                    <div class="formbody">
                        <label>Title</label>
                        <input type="text" id="title" placeholder="Enter todo title">
                    </div>
                    <div class="formbody">
                        <label>Content</label>
                        <textarea id="content" placeholder="Enter todo content" rows="3"></textarea>
                    </div>
                    <button class="btn btn-primary" id="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>`;
        return html;
    }
}