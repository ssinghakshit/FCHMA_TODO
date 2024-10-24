import { StatefulWidget } from "../../default/StatefulWidget";
import { updateContent } from "../../routes/renderRoute.service";

export class logout extends StatefulWidget{

    addEvents(): void {
        localStorage.removeItem("profile");
        updateContent("/");
        location.reload();
    }


    getHtml(): string {
        return "You are logged out";
    }

}