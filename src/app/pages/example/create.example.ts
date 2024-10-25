// create.todo.ts
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
            submitButton.onclick = async (ev: Event) => { //async worked/ without async not displaying data
                ev.preventDefault();

                if (id.value) {
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "title": title.value,
                        "content": content.value
                    }
                    await UpdateComposition(patcherStructure);
                }
                else {
                    try {
                        const mainConcept = await MakeTheInstanceConceptLocal("the_todo","", true, userId, PRIVATE);

                        const titleConcept = await MakeTheInstanceConceptLocal("title", title.value, false, userId, PRIVATE);
                        const contentConcept = await MakeTheInstanceConceptLocal("content", content.value, false, userId, PRIVATE);

                        await CreateTheConnectionLocal(mainConcept.id, titleConcept.id, mainConcept.id, order, "", userId);
                        await CreateTheConnectionLocal(mainConcept.id, contentConcept.id, mainConcept.id, order, "", userId);
                        
                        await LocalSyncData.SyncDataOnline();
                    } catch (error) {
                        console.error("Error creating todo:", error);
                    }
                }

                //clear field after subimt
                title.value = '';
                content.value = '';
                id.value = '';
            }
        }
    }

    getHtml(): string {
        return `<div class="container">
            <form>
                <div>
                    <input type="number" id="id" hidden>
                    <div class="formbody">
                        <label>Title</label>
                        <input type="text" id="title" placeholder="Enter todo title" required>
                    </div>
                    <div class="formbody">
                        <label>Content</label>
                        <textarea id="content" placeholder="Enter todo content" rows="3" required></textarea>
                    </div>
                    <button class="btn btn-primary" id="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>`;
    }
}

