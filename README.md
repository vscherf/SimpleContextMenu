# SimpleContextMenu
stellt ein einfaches Kontextmenü für HTML-Steuerelemente zur Verfügung

by Volker Scherf
fügt einem HTML-Feld ein Kontextmenü hinzu
(mit Inspiration des Kontextmenüs von jsTree)
als Übergabeparameter wird ein JSON-Object erwartet
dieses enthält wiederum zwei JSON-Objecte: defaults und items
Parameter:
// Legende:  * Pflichtfelder
//           # zwar keine Pflichtfelder, aber ohne macht es keinen rechten Sinn

// 'defaults': {                                optional
//  'in': 'fade',                               optional: Effekt zum einblenden
//  'out': 'fade',                              optional: Effekt zum ausblenden
//  'hideDefaultContext': 'true',               optional: legt fest, ob auf dem Kontextmenü selbst, das Standard-Kontextmenu ausgeblendet werden soll, wenn nicht, dann Parameter weglassen
//  'targetClass': 's-cm-target',               optional: legt fest, ob beim Rechtsklick auf das Feld, dieses markiert wird, wenn nicht, dann Parameter weglassen
//  'headline': 'Überschrift'                   optional: legt fest, welcher Text als Überschrift angezeigt werden soll (wenn nicht vorhanden, dann keine Überschrift)
// }
// wenn keine defaults angebenen werden, dann werden Standardwerte hergenommen
// 'items' : {
//  'newItem': {                                * neues Element   
//      'label': 'ein Text',                    * die Beschriftung des Eintrags
//      'title': 'ein Tooltip',                 optional: der Tooltip
//      'type': 'button',                       * definiert die Art des Elements
//      'icon': 'Pfad zum Icon',                optional: Platzhalter auf max. 24x24 optimiert
//      'separator_before': 'true',             optional: wenn Trennzeile vor Element gewünscht ist, ansonsten Parameter weglassen
//      'separator_after': 'true',              optional: wenn Trennzeile nach Element gewünscht ist, ansonsten Parameter weglassen
//      'action': function(sender, field){      # die Funktion, die auf Klick ausgeführt werden soll (als Parameter werden immer das Kontextmenu-Element(sender) und das Kontextfeld(target) übergeben)
//                      //irgendwas
//                  },
//      'disabled': function(target){           optional: legt fest ob der Eintrag aktiviert sein soll (es wird das Kontextfeld übergeben, auf das geklickt wurde)
//                      //irgendwas
//                  },
//      'disableTitle' : 'ein Text'             optional: legt den Tooltip fest, wenn ein element deaktivert ist
//      'submenu':                              optional: leitet ein Untermenü ein, hier werden wieder die Items, wie vorstehend definiert
//          {'items': ...}
//  }
// }
//
//zusätzliche Parameter für ein neues Item, je nach Typ:
// CheckBox:
//      'mode': 'slide',                        optional: definiert die Art der Checkbox (mögliche Werte: light, ios, flat, slide, flip)
//      'dataOn': 'Ein'.                        * Toggletext Ein bei mode=slide und flip
//      'dataOff': 'Aus',                       * Toggletext Aus bei mode=slide und flip
//      'value' : function(){}                  optional: die Vorbelegung der Checkbox
// Dropdown:
//      'values': {JSON-Object},                # die Listenelemente des Dropdowns, entweder direkt als JSON-Object oder eine Funktion, die ein JSON-Object zurückgibt (siehe Beispiel)


//zusätzlich werden noch folgende data-Attribute des Kontextfeldes ausgewertet:
// data-retvalue   : wenn vorhanden, dann wird dieser Wert in das Kontextfeld zurückgeschrieben
// da in den 'action' und 'disabled'-Eigenschaften jeweils die Ursprungsfelder übergeben werden, können hier z.B. die data-Eigenschaften ausgewertet werden
//
//am besten, die Elemente des Kontextmenüs in eine Variable verpacken und
//dann dann mit "$(myElement).ContextMenu(items)" aufrufen
