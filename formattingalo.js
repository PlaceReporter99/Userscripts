// ==UserScript==
// @name         Formattingalo
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @description  MORE formatting in SE Chat!
// @author       The Empty String Photographer
// @match       *://chat.stackexchange.com/rooms/*
// @match       *://chat.stackoverflow.com/rooms/*
// @match       *://chat.meta.stackexchange.com/rooms/*
// @match       *://chat.stackexchange.com/transcript/*
// @match       *://chat.stackoverflow.com/transcript/*
// @match       *://chat.meta.stackexchange.com/transcript/*
// @icon64URL    https://cdn-chat.sstatic.net/chat/img/se-chat-logo.png?v=c40d0fda6c03
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function main(...a) {
        console.debug("running");
        let messages = document.getElementsByClassName("message");
        for (let message of messages) {
            let el = message.getElementsByClassName("content")[0];
            el.innerHTML = el.innerHTML.replace(/(?<!<code>)\^\^\^(?<text>(?:(?!<code>|<\/code>)(?:.|\n))+?)\^\^\^(?!<\/code>)/g, `<u>$<text></u>`).replace(/(?<!<code>)###(?<color>[0-9a-f]{6})(?<text>(?:(?!<code>|<\/code>)(?:.|\n))+?)###(?!<\/code>)/g, `<span style="color:#$<color>;">$<text></span>`).replace(/(?<!<code>)\.\.\.(?<size>\d{1,2})(?<text>(?:(?!<code>|<\/code>)(?:.|\n))+?)\.\.\.(?!<\/code>)/g, `<span style="font-size:$<size>px;">$<text></span>`);
        };
    };

    function mainchook(di, id, some_bool) {
        setTimeout(function() {
            if (di.event_type == 1 | di.event_type == 2) {
                main();
            };
        }, 10);
    };

    CHAT.Hub.roomReady.add(main);
    document.getElementById("getmore").onclick = main;
    document.getElementById("getmore-mine").onclick = main;
    CHAT.addEventHandlerHook(mainchook);
})();
