"use strict";

$(document).ready(function ()
{
    //ein Benutzerkontextmenü für Tabellenfelder
    let scm = {
        "defaults": {
            "out": "transfer",
        },
        "items": {
            "itmHeader1": {
                'label': 'Feld',
                'type': 'header',
                'title': 'Überschrift mit Separator -after-',
                'icon': '/Dateien/Icons/24/information.png',
                'separator_after': true
            },
            "itmBtn1": {
                'id': "btnMenu1Add",
                'type': 'button',
                'label': '<span>hinzufügen</span>',
                'title': 'ein Standard-Button mit Separator -after-',
                'icon': '/Dateien/Icons/24/add.png',
                'action': function (sender, target)
                {
                    fnSetOutput(sender, target);
                    target.html("hinzugefügt");
                },
                "disabled": function (target)
                {
                    //Beispielfunktion, um ein Element zu deaktivieren
                    if ($(target).data("scm-add-disabled")) { return true; }
                }
            },
            "itmBtn2": {
                'id': "btnMenu1Delete",
                'type': 'button',
                'label': 'löschen',
                'disabled': true,
                'title': 'Butten mit eigener CSS-Klasse',
                'class': 's-cm-danger',
                'icon': '/Dateien/Icons/24/delete.png',
                'action': function (sender, target)
                {
                    fnSetOutput(sender, target);
                }
            },
            "itmSubMenu": {
                "label": "Untermenü 1",
                "type": "button",
                "title": "ein Untermenü mit Action",
                //"icon": "/Dateien/Icons/24/information.png",
                "separator_before": true,
                'action': function (sender, target)
                {
                    fnSetOutput(sender, target);
                },
                "disabled": function (target)
                {
                    //Beispielfunktion, um ein Element zu deaktivieren
                    if ($(target).data("scm-sub-disabled")) { return true; }
                },
                "submenu": {
                    "items": {
                        "itmSubBtn1": {
                            'id': "btnMenu2Change",
                            'type': 'button',
                            "label": "ändern",
                            "title": "den Eintrag bearbeiten",
                            "icon": "/Dateien/Icons/24/edit.png",
                            'action': function (sender, target)
                            {
                                fnSetOutput(sender, target);
                            }
                        },
                        "itmSubHeader1": {
                            'label': 'Überschrift 2',
                            'type': 'header',
                            'title': 'Überschrift mit Separator -before- und -after-',
                            'icon': '/Dateien/Icons/24/information.png',
                            'separator_before': true,
                            'separator_after': true
                        },
                        "itmSubBtn2": {
                            'id': "btnMenu2Copy",
                            'type': 'button',
                            "label": "kopieren",
                            "title": "den Eintrag kopieren",
                            "icon": "/Dateien/Icons/24/copy.png",
                            'action': function (sender, target)
                            {
                                fnSetOutput(sender, target);
                            }
                        },
                        "itmSubBtn3": {
                            'id': "btnMenu3Insert",
                            'type': 'button',
                            "label": "einfügen",
                            "title": "den Eintrag einfügen",
                            "icon": "/Dateien/Icons/24/paste.png",
                            'action': function (sender, target)
                            {
                                fnSetOutput(sender, target);
                            }
                        },
                        "itmSubMenu": {
                            "label": "Untermenü 2",
                            "type": "button",
                            "title": "ein Untermenü ohne Action",
                            //"icon": "/Dateien/Icons/24/information.png",
                            "separator_before": true,
                            "submenu": {
                                "items": {
                                    "itmSubBtn1": {
                                        'id': "btnMenu3Change",
                                        'type': 'button',
                                        "label": "ändern",
                                        "title": "den Eintrag bearbeiten",
                                        "icon": "/Dateien/Icons/24/edit.png",
                                        'action': function (sender, target)
                                        {
                                            fnSetOutput(sender, target);
                                        }
                                    },
                                    "itmSubHeader1": {
                                        'label': 'Überschrift 3',
                                        'type': 'header',
                                        'title': 'Überschrift mit Separator -before- und -after-',
                                        'icon': '/Dateien/Icons/24/information.png',
                                        'separator_before': true,
                                        'separator_after': true
                                    },
                                    "itmSubBtn2": {
                                        'id': "btnMenu3Copy",
                                        'type': 'button',
                                        "label": "kopieren",
                                        "title": "den Eintrag kopieren",
                                        "icon": "/Dateien/Icons/24/copy.png",
                                        'action': function (sender, target)
                                        {
                                            fnSetOutput(sender, target);
                                        }
                                    },
                                    "itmSubBtn3": {
                                        'id': "btnMenu3Insert",
                                        'type': 'button',
                                        "label": "einfügen",
                                        "title": "den Eintrag einfügen",
                                        "icon": "/Dateien/Icons/24/paste.png",
                                        'action': function (sender, target)
                                        {
                                            fnSetOutput(sender, target);
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            },
            "itmHeaderTxt": {
                'label': '<div style="color: #ee3300;">ein Eingabefeld</div>',
                'type': 'header',
                'title': 'Überschrift mit Separator -before-\nund eigenem Style-Tag, direkt in der Label-Eigenschaft',
                'separator_before': true

            },
            "itmText1": {
                'type': 'text',
                'id': 'txtSCM1',
                'placeholder': 'nix drin',
                'title': 'einen Text eingeben',
                'value': function (target)
                {
                    if ($(target).html().indexOf(".2") > 0)
                    {
                        return null;
                    }
                    return $(target).html();
                },
                'disabled': function (target)
                {
                    if ($(target).data("scm-txt-disabled")) { return true; }
                },
                'action': function (sender, target)
                {
                    alert(sender.val());
                }
            },
            "itmBtn3": {
                'id': "btnMenu1Mail",
                'type': 'button',
                'label': 'Nachricht',
                'title': 'ein Standard-Button',
                'icon': '/Dateien/Icons/24/@.png',
                'action': function (sender, target)
                {
                    alert("Die Nachricht lautet: '" + $('#txtSCM1').val() + "'");
                    fnSetOutput(sender, target);

                }
            },
            "itmHeaderSel": {
                'label': 'ein Auswahlmenü',
                'type': 'header',
                'title': 'Überschrift für Auswahlmenü',
                'separator_before': true

            },
            "itemSelect1": {
                'type': 'select',
                'id': 'selSCM1',
                'title': 'setzt die Hintergrundfarbe des Kontextfelds',
                'hasNullValue': true,
                'listItems': { // entweder direkt angeben
                    'itm0': { 'val': '', 'text': 'Standard' },
                    'itm1': { 'val': '#ff0000', 'text': 'Rot' },
                    'itm2': { 'val': '#ffff00', 'text': 'Gelb' },
                    'itm3': { 'val': '#00ff00', 'text': 'Grün' },
                    'itm4': { 'val': '#0000ff', 'text': 'Blau' }
                },
                //function () { //oder eine Funktion, die ein JSON-Object zurückgibt
                //    let jsn = {};
                //    jsn = {
                //        'itm0': { 'val': '', 'text': 'Standard' },
                //        'itm1': { 'val': '#ff0000', 'text': 'Rot' },
                //        'itm2': { 'val': '#ffff00', 'text': 'Gelb' },
                //        'itm3': { 'val': '#00ff00', 'text': 'Grün' },
                //        'itm4': { 'val': '#0000ff', 'text': 'Blau' }
                //    };
                //    return jsn;
                //},
                'action': function (sender, target)
                {
                    let value = $(sender).find(":selected").val();
                    let text = $(sender).find(":selected").text();
                    $("#out").html("Es wurde '" + text + "' (value: '" + value + "') ausgewählt.");
                    $(target).css("background-color", value);
                    $(target).attr("data-backcolor", value);
                },
                'disabled': function (target)
                {
                    if ($(target).data("scm-sel-disabled")) { return true; }
                }
            },
            "itmOptionen": {
                "label": 'Optionen',
                "type": 'button',
                "title": 'ein Haufen voller Optionen',
                'separator_before': true,
                "disabled": function (target)
                {
                    if ($(target).data("opt-disabled")) { return true; }
                },
                "disableTitle": "außer Betrieb",
                "submenu": {
                    "items": {
                        "itmSubHeaderOptionan": {
                            'label': 'mögliche Designs für Check-, bzw. Toggelboxen',
                            'type': 'header'
                        },
                        "itemCheck0": {
                            "type": "checkbox",
                            "label": "Standard",
                            "title": "Standard-Checkbox ohne weitere Optionen"
                        },
                        "itemCheck2": {
                            "type": "checkbox",
                            "id": "toggle2",
                            "label": "Flat &nbsp;<span id='status_ist2'></span>",
                            "mode": "flat",
                            "title": "eine feine Checkbox",
                            "action": function (sender, target)
                            {
                                let retVal = !sender.prop("checked");
                                let stat = "OFF";
                                if (retVal) { stat = "ON"; }
                                $("#status_ist2").html(stat);
                            }
                        },
                        "itemCheck4": {
                            "type": "checkbox",
                            "id": "toggle4",
                            "label": "Light &nbsp;<span id='status_ist4'></span>",
                            "mode": "light",
                            "title": "eine feine Checkbox",
                            "dataOn": "On",
                            "dataOff": "Off",
                            "action": function (sender, target)
                            {
                                let retVal = !sender.prop("checked");
                                let stat = "OFF";
                                if (retVal) { stat = "ON"; }
                                $("#status_ist4").html(stat);
                            }
                        },
                        "itemCheck3": {
                            "type": "checkbox",
                            "id": "toggle3",
                            "label": "iOS &nbsp;<span id='status_ist3'></span>",
                            "mode": "ios",
                            "title": "eine feine Checkbox",
                            "dataOn": "On",
                            "dataOff": "Off",
                            "action": function (sender, target)
                            {
                                let retVal = !sender.prop("checked");
                                let stat = "OFF";
                                if (retVal) { stat = "ON"; }
                                $("#status_ist3").html(stat);
                            }
                        },
                        "itemCheck1": {
                            "type": "checkbox",
                            "id": "toggle1",
                            "label": "Slider &nbsp;<span id='status_ist1'></span>",
                            "mode": "slide",
                            "title": "ändert den Wert im Kontextfeld",
                            "dataOn": "On",
                            "dataOff": "Off",
                            "disabled": function (target)
                            {
                                if ($(target).data("check-disabled")) { return true; }
                            },
                            "disableTitle": "außer Betrieb",
                            "action": function (sender, target)
                            {
                                let retVal = !sender.prop("checked");
                                $(target).attr("data-check-value", retVal);
                                $(target).html(retVal.toString());
                                let stat = "OFF";
                                if (retVal) { stat = "ON"; }
                                $("#status_ist1").html(stat);
                            },
                            "value": function (target)
                            {
                                let val = $(target).attr("data-check-value");
                                return val;
                            }
                        },
                        "itemCheck5": {
                            "type": "checkbox",
                            "id": "toggle5",
                            "label": "Flip &nbsp;<span id='status_ist5'></span>",
                            "mode": "flip",
                            "title": "eine feine Checkbox",
                            "dataOn": "On",
                            "dataOff": "Off",
                            "action": function (sender, target)
                            {
                                let retVal = !sender.prop("checked");
                                let stat = "OFF";
                                if (retVal) { stat = "ON"; }
                                $("#status_ist5").html(stat);
                            }
                        }
                    }
                }
            }
        }
    };
    $("td").SimpleContextMenu(scm);

    //ein Benutzerkontextmenü für Kopfzeilen im Header
    scm = {

        "defaults": {
            "in": "slide",
            "out": "blind",
            "headline": "Contextmenü für Spalte"
        },
        "items": {
            "itmBtn1": {
                'label': 'hinzufügen',
                'type': 'button',
                'title': 'ein Standard-Button mit Separator -after-',
                'icon': '/Dateien/Icons/24/add.png',
                'action': function (sender, target)
                {
                    fnSetOutput(sender, target);
                },
                'separator_after': true
            }
        }
    };
    $("thead th").SimpleContextMenu(scm);

    //ein Benutzerkontextmenü für Kopfzeilen im Body
    scm = {
        "items": {
            "itmHeader2": {
                'label': 'Zeile',
                'type': 'header',
                'title': 'Überschrift mit Separator -before- und -after-',
                'icon': '/Dateien/Icons/24/information.png',
                'separator_before': true,
                'separator_after': true

            },
            "itmBtn3": {
                'label': 'Nachricht',
                'type': 'button',
                'title': 'ein Standard-Button',
                'icon': '/Dateien/Icons/24/@.png',
                'action': function (sender, target)
                {
                    fnSetOutput(sender, target);
                }
            }
        }
    };
    $("tbody th").SimpleContextMenu(scm);

    //ein Benutzerkontextmenü für HTML-Elemente
    scm = {
        "items": {
            "itmHeader2": {
                'label': '<div style="color: #eeaa00;">HTML-Element</div>',
                'type': 'header',
                'title': 'Überschrift mit Separator -before- und -after-\nund eigenem Style-Tag, direkt in der Label-Eigenschaft',
                'icon': '/Dateien/Icons/24/information.png',
                'separator_before': true,
                'separator_after': true

            },
            "itmBtn3": {
                'label': 'Nachricht',
                'type': 'button',
                'title': 'ein Standard-Button',
                'icon': '/Dateien/Icons/24/@.png',
                'action': function (sender, target)
                {
                    fnSetOutput(sender, target);
                }
            }
        }
    };
    $(".has-scm").SimpleContextMenu(scm);
});

function fnSetOutput(sender, field)
{
    $("#out").html(
        "<em>Kontextmenü geklickt<br /></em>Button: '" +
        sender.prop("innerText") + "' (Tag: " + sender.prop("tagName") + ")<br />ID: " +
        sender.data("id") + "<br />Sender: " +
        field.prop("tagName") + "<br />Inhalt: '" +
        field.html() + "'");
}
