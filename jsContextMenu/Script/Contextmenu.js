//Simple Context Menu - ein jQuery-Plugin
// by Volker Scherf
// fügt einem Feld ein Kontextmenü hinzu
// (mit Inspiration des Kontextmenüs von jsTree)
// als Übergabeparameter wird ein JSON-Object erwartet
// dieses enthält wiederum zwei JSON-Objecte: defaults und items
//Parameter:
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

"use strict";

let scmTarget;
let targetClass = "s-cm-target";

$(document).ready(function () {
    //das Benutzer-Kontextmenü bei Klick im Dokument entfernen
    $(document).on("mousedown", function (e) {
        //hier wird geprüft, ob auf dem Benutzerkontextmenü geklickt wurde,
        //da sonst die Action-Anweisung nicht ausgeführt werden würde
        //Nach Betätigen eines Buttons im Benutzermenü wird eine separate Funktion zum Entfernen ausgeführt
        let t = $(".s-cm");
        if ($(e.target).closest(".s-cm").length === 0) {
            fnHideSCM("fade");
        }
    });
});

jQuery.fn.ContextMenu = function (properties) {
    if (typeof properties === "undefined") { return false; };
    $(this).on("contextmenu", function (e) {
        let effectIn, hideStd, defaults, targetClass;
        scmTarget = $(this);
        defaults = properties["defaults"];
        //Defaultwerte ermitteln
        if (typeof defaults !== "undefined") {
            effectIn = defaults["in"];
            hideStd = defaults["hideDefaultContext"];
            targetClass = defaults["targetClass"];
        }
        $(".s-cm").hide("fade");
        $(".s-cm").promise().done(function () {
            $(".s-cm").remove();

            let scm = new $("<ul>");           //neue Liste erzeugen
            scm.addClass("s-cm");
            let x = e.pageX, y = e.pageY;   //Mousekoordinaten auslesen
            scm.css("top", y);
            scm.css("left", x);
            if (defaults["headline"]) {
                let li = new $("<li>");
                li.addClass("s-cm-headline");
                //hier kann auch etwas Feldspezifisches als Überschrift drinstehen, das z.B. über ein Data-Attribut bereitgestellt wird
                li.html(defaults["headline"]); //hier kann evtl. noch der Inhalt des Felds mit angezeiggt werden: + " - " + scmTarget.html()
                li.appendTo(scm);
            }
            //je nach Bedarf das Standard-Kontextmenü auf dem User-Kontextmenü aus-/einschalten
            if (hideStd) { scm.attr("oncontextmenu", "return false"); }

            fnSetContextMenu(scm, properties, properties["defaults"], scmTarget);

            $("body").append(scm);
            $(".s-cm").find("li:has(ul)").children("a")
                .addClass("s-cm-parent");

            $(".s-cm").find("a.s-cm-parent").not(".s-cm-disabled").parent("li:has(ul)").hover(
                function () {
                    $(this).addClass("s-cm-a-hovered");
                    $(this).children("ul").show();
                },
                function () {
                    $(this).removeClass("s-cm-a-hovered");
                    $(this).children("ul").hide();

                });
            if (typeof effectIn !== "undefined") {
                $(scm).show(effectIn);
            } else {
                $(scm).show();
            }
            if (targetClass) { $(scmTarget).addClass(targetClass); }
        });
    });
};

function fnSetContextMenu(parent, properties, defaults, target) {
    for (let item in properties["items"]) {  //alle Items des Objekts durchlaufen
        let li = new $("<li>");       //neues Listenelement erzeugen
        let element = properties["items"][item];
        li.prop("title", element["title"]);
        let a = new $("<a>"), i = new $("<i>"), span = new $("<span>");
        let isDisabled = element["disabled"];
        let dis = false;
        let disTitle = "Funktion nicht verfügbar";
        if (element["disableTitle"]) { disTitle = element["disableTitle"]; }
        let fn = element["action"];
        if ($.isFunction(isDisabled) && isDisabled($(target))) {
            dis = true;
        }

        switch (element["type"]) {
            case "header":
                let div = new $("<div>");
                div.addClass("s-cm-header");
                if (typeof element["class"] !== "undefined") {
                    div.addClass(element["class"]);
                }
                div.html(element["label"]);
                div.appendTo(li);

                break;
            case "text":
                let txt = new $("<input type='text'>");
                txt.prop("placeholder", element["placeholder"]);
                txt.prop("id", element["id"]);
                if (dis) {
                    txt.prop("title", "dieser Eintrag ist nicht verfügbar");
                    txt.addClass("s-cm-disabled");
                    txt.prop("title", disTitle);
                } else {
                    txt.prop("title", element["title"]);
                    let defVal = element["value"];
                    if ($.isFunction(defVal)) {
                        txt.val(defVal(target));
                    } else {
                        txt.val(defVal);
                    }
                    if ($.isFunction(fn)) {
                        txt.on("change", function () {
                            fn($(this), scmTarget);
                        });
                    }
                }
                txt.appendTo(li);
                break;
            case "select":
                let sel = new $("<select>");
                sel.prop("placeholder", element["placeholder"]);
                sel.prop("id", element["id"]);
                sel.prop("title", element["title"]);

                if (dis) {
                    sel.prop("title", disTitle);
                    sel.addClass("s-cm-disabled");
                    sel.prop("title", disTitle);
                } else {
                    let values = element["listItems"];
                    if ($.isFunction(values)){ values = values();}
                    sel.append($("<option>", { value: null, text: null }));
                    for (let o in values) {
                        sel.append($("<option>", { value: values[o]["val"], text: values[o]["text"] }));
                    }
                    if ($.isFunction(fn)) {
                        sel.on("change", function () {
                            fn($(this), scmTarget);
                        });
                    }
                }
                sel.appendTo(li);
                break;
            case "checkbox":
                let check = new $("<input type='checkbox'>"); //die Checkbox für das Toggleelement
                let cont = new $("<div>");  //der Container für alle Elemente der Checkbox
                let bez = new $("<div>");  //der Container für die Bezeichnung
                let cDiv = new $("<div>");  //der Container für die Toggleelemente
                let lbl = new $("<label>"); //das Toggleelement
                lbl.attr("data-toggle-on", element["dataOn"]);
                lbl.attr("data-toggle-off", element["dataOff"]);
                bez.appendTo(cont);
                check.appendTo(cDiv);
                lbl.appendTo(cDiv);
                cDiv.appendTo(cont);
                cont.addClass("s-cm-checkbox");
                cont.prop("title", element["title"]);
                bez.html(element["label"]);
                check.prop("id", element["id"]);
                let cl = "";
                if (element["mode"]) {
                    switch (element["mode"]) {
                        case "slide":
                        case "flip":
                        case "light":
                        case "flat":
                        case "ios":
                            cl = "s-cm-tgl-" + element["mode"];
                            break;
                        default:
                            cl = "s-cm-tgl-light";
                    }
                } else {
                    cl = "s-cm-tg-light";
                }
                check.addClass("s-cm-tgl " + cl);
                lbl.prop("for", element["id"]);
                let cVal = element["value"];
                let isChecked = false;
                if ($.isFunction(cVal)) {
                    isChecked = cVal(scmTarget);
                    if (isChecked === "true" || isChecked === true) {
                        isChecked = true;
                    } else {
                        isChecked = false;
                    }
                    if (typeof isChecked === "undefined") { isChecked = false; }
                }
                $(check).prop("checked", isChecked);
                if (dis) {
                    cont.addClass("s-cm-disabled");
                    lbl.addClass("s-cm-disabled");
                    cont.prop("title", disTitle);
                } else {
                    if ($.isFunction(fn)) {
                        lbl.on("click", function () {
                            fn(check, scmTarget);
                        });
                    }

                }
                li.css("padding", "0 2px 0 0");
                cont.appendTo(li);
                break;
            case "button":
                a.prop("href", "#");

                i.attr("style", "background:url('" + element["icon"] + "') center center no-repeat");
                let desc = element["label"];
                if (desc.indexOf("</") > 0) { desc = $(desc).text(); }
                if (dis) {
                    a.removeClass();
                    a.addClass("s-cm-disabled");
                    a.html(desc);
                    a.prop("title", disTitle);
                } else {
                    if (typeof element["class"] !== "undefined") {
                        let text = new $("<label>");
                        text.addClass(element["class"]);
                        text.html(desc);
                        text.appendTo(a);
                    } else {
                        a.html(desc);
                    }
                    //let fn = element["action"];
                    let effectOut;
                    if (typeof defaults !== "undefined") {
                        effectOut = defaults["out"];
                    }
                    if ($.isFunction(fn)) {
                        a.on("click", function () {
                            fn($(this), scmTarget);
                            if ($(scmTarget).data("scm-retvalue")) {
                                $(scmTarget).html($(scmTarget).data("scm-retvalue"));
                            }
                            fnHideSCM(effectOut);
                        });
                    }

                    if (element["retValue"]) {
                        a.on("click", function () {
                            scmTarget.html(element["retValue"]);
                            fnHideSCM(effectOut);
                        });
                    }
                }
                span.html("&nbsp;");
                span.addClass("s-cm-separator-pic");
                a.prepend(span);
                a.data("id", element["id"]);
                a.prepend(i);
                a.appendTo(li);
                break;
        }
        parent.append(li);
        if (element["separator_before"]) {
            let sep = new $("<li>");
            let space = new $("<a>");
            space.prop("href", "#");
            space.html("&nbsp;");
            if (element["type"] === "header") {
                sep.addClass("s-cm-separator-header-before");
            } else {
                sep.addClass("s-cm-separator");
            }
            space.appendTo(sep);
            sep.insertBefore(li);
        }
        if (element["separator_after"]) {
            let sep = new $("<li>");
            let space = new $("<a>");
            space.prop("href", "#");
            space.html("&nbsp;");
            if (element["type"] === "header") {
                sep.removeClass("s-cm-separator");
                sep.addClass("s-cm-separator-header-after");
            } else {
                sep.addClass("s-cm-separator");
            }
            space.appendTo(sep);
            sep.insertAfter(li);
        }

        if (typeof element["submenu"] !== "undefined") {
            let sub = new $("<ul>");
            sub.appendTo(li);
            if (!dis) { fnSetContextMenu(sub, element["submenu"], defaults, target); };
        }
    }
}

function fnHideSCM(effect) {
    if (typeof effect !== "undefined") {
        if (typeof scmTarget !== "undefined" && scmTarget.length > 0) {
            if (effect === "transfer") {
                $(".s-cm").hide("transfer", { to: scmTarget, className: "s-cm-effect-transfer" });

            } else {
                $(".s-cm").hide(effect);
                $(".s-cm").promise().done(function () {
                    $(".s-cm").remove();
                    return;
                });

            }
        } else {
            $(".s-cm").hide(effect);
            $(".s-cm").promise().done(function () {
                $(".s-cm").remove();
                return;
            });
        }
    } else {
        $(".s-cm").remove();
        $(".s-cm").promise().done(function () {
            return;
        });
    }

    $("." + targetClass).removeClass(targetClass);
}

