/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));


// Clock Zone Action
let currentPopup: any = undefined;
const today = new Date();
const friday = new Date();
friday.setDate(friday.getDate() + (6 + (7 - friday.getDay())) % 7);
  
const difference_In_Time = friday.getTime() - today.getTime();
const difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
const time = difference_In_Days;

WA.room.onEnterLayer('clockZone').subscribe(() => {
    console.log('toto')
    currentPopup =  WA.ui.openPopup("clockPopup",`${time > 1 ? `Noch ${time} Tage bis zum` : 'MORGEN ist' } Wochenende 🥳`,[]);
})

WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}



// Cake Zone Action
WA.room.onEnterLayer('cakeZone').subscribe(() => {
    console.log('cake')
    currentPopup =  WA.ui.openPopup("cakePopup",`🍰 Straf-Kuchenliste: Marco, Pierre, Benny`,[]);
})

WA.room.onLeaveLayer('cakeZone').subscribe(closePopUp)


// Welcome Message
WA.onInit().then(() => {
    WA.chat.sendChatMessage(`Herzlich Willkommen ${WA.player.name}, in unserem digitalen Office!`, 'James');
})



// Sound distance detection
// WA.player.onPlayerMove(console.log)
