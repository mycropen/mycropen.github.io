var chapters = {"Yokoe Rei": ["#0", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#12", "#13", "#14", "#16", "#18", "#21", "#22", "#23", "#25", "#27", "Vol1 Extra 1", "Vol1 Extra 3", "#31", "#34", "#35", "#40", "#43", "#48", "#49", "#51", "Vol2 Extra 1", "Vol2 Extra 2", "#53", "#58", "#61", "#62", "#68", "#69", "#73", "Vol3 Extra", "#74", "#75", "#76", "#77", "#78", "#81", "#86", "#87", "#88", "#89"], "Sugiura Kei": ["#0", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#12", "#13", "#14", "#16", "#18", "#21", "#22", "#23", "#25", "#27", "Vol1 Extra 1", "Vol1 Extra 2", "Vol1 Extra 3", "#31", "#34", "#35", "#40", "#43", "#48", "#49", "#51", "Vol2 Extra 1", "Vol2 Extra 2", "#53", "#58", "#61", "#62", "#68", "#69", "#73", "Vol3 Extra", "#74", "#75", "#76", "#78", "#81", "#87", "#88", "#89"], "Negoro Yatsude": ["#5", "#8", "#12", "#13", "#17", "#18", "#21", "#28", "Vol1 Extra 2", "#31", "#33", "#37", "#41", "#50", "Vol2 Extra 2", "#53", "#58", "#61", "#66", "#68", "#69", "#73", "Vol3 Extra", "#74", "#75", "#76", "#77", "#78", "#81", "#86", "#90"], "Fuji Matsuri": ["#32", "#33", "#38", "#46", "#47", "#50", "#57", "#58", "#64", "#79"], "Hinase Tsubaki": ["#10", "#11", "#13", "#17", "#19", "#21", "#28", "#37", "#39", "#41", "#44", "#45", "#55", "#60", "#63", "#66", "#70", "#71", "#72", "#73", "#74", "#75", "#76", "#78", "#81", "#82", "#83", "#84", "#90"], "Nakatani Hinako": ["#10", "#19", "#26", "#39", "#42", "#55", "#59", "#60", "#63", "#70", "#71", "#72", "#82", "#83"], "Yamashiro Kaname": ["#10", "#19", "#26", "#39", "#42", "#55", "#59", "#63", "#70", "#71", "#72", "#82", "#83"], "Kishiya": ["#32", "#38", "#46", "#47", "#57", "#64", "#79"], "Hinase Hiiragi": ["#11", "#15", "#20", "#24", "#29", "#30", "#36", "#44", "#45", "#52", "#54", "#56", "#60", "#65", "#67", "#82", "#84", "#85"], "Utsugi Ren": ["#15", "#20", "#24", "#29", "#36", "#52", "#56", "#65", "#67", "#84", "#85"], "Sakaki": ["#65", "#80"], "Ueharu": ["#65", "#80"], "Akutami": ["#30", "#54", "#56", "#67", "#80"], "Mochida Mao": ["#52", "#67", "Twitter extras until 2020-10-04"], "Karashima Aoi": ["#52", "#67", "Twitter extras until 2020-10-04"], "Houzuki Hikari": ["#34", "Pixiv and Twitter extras 2", "Pixiv extras and Volume promos until 2020-05"], "Sugiura Yui": ["#22", "#73", "#87", "#89"], "Yoichi Tamaki": ["Pixiv and Twitter extras 2", "Pixiv extras and Volume promos until 2020-05"], "Yuusaki Yoru": ["Pixiv and Twitter extras 2", "Pixiv extras and Volume promos until 2020-05"]}
const all_chapters = new Set(["#0", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10", "#11", "#12", "#13", "#14", "#15", "#16", "#17", "#18", "#19", "#20", "#21", "#22", "#23", "#24", "#25", "#26", "#27", "#28", "#29", "Vol1 Extra 1", "Vol1 Extra 2", "Vol1 Extra 3", "#30", "#31", "#32", "#33", "#34", "#35", "#36", "#37", "#38", "#39", "#40", "#41", "#42", "#43", "#44", "#45", "#46", "#47", "#48", "#49", "#50", "#51", "Vol2 Extra 1", "Vol2 Extra 2", "#52", "#53", "#54", "#55", "#56", "#57", "#58", "#59", "#60", "#61", "#62", "#63", "#64", "#65", "#66", "#67", "#68", "#69", "#70", "#71", "#72", "#73", "Vol3 Extra", "Pixiv extras and Volume promos until 2020-05", "Twitter extras until 2020-10-04", "#74", "#75", "#76", "#77", "#78", "#79", "#80", "#81", "Pixiv and Twitter extras 2", "#82", "#83", "#84", "#85", "#86", "#87", "#88", "#89", "#90"])

var active_filters = new Set();
var possible_unions = Object.keys(chapters);
var active_chapters = all_chapters;
var unwanted_filters = new Set();

function clear_filters(target) {
    active_filters.clear();
    unwanted_filters.clear();
    active_chapters = all_chapters;
    possible_unions = Object.keys(chapters);

    let chapterscoll = target.closest(".serieschapters");
    let chapterlinks = chapterscoll.getElementsByClassName("chapter");
    for (var i = 0; i < chapterlinks.length; i++) {
        chapterlinks[i].classList.remove("filtered");
    }

    let searchcont = target.closest(".searchcontainer");
    let characters = searchcont.getElementsByClassName("characterimage");
    for (var i = 0; i < characters.length; i++) {
        characters[i].classList.remove("selected");
        characters[i].classList.remove("unwanted");
        characters[i].classList.remove("unavailable");
    }
}

function school_zone_filter() {
    evt = null || window.event;
    if (!evt) return;
    target = evt.target;
    if (target.classList.contains("unavailable")) return;

    filter_name = "" || target.id;
    if (!filter_name) return;

    if (filter_name == "clear") clear_filters(target);
    else {
        // unwanted characters
        if (evt.shiftKey) {
            if (unwanted_filters.has(filter_name)) {
                target.classList.remove("unwanted");
                unwanted_filters.delete(filter_name);
            }
            else {
                if (active_filters.has(filter_name)) {
                    target.classList.remove("selected");
                    active_filters.delete(filter_name);
                }
                target.classList.add("unwanted");
                unwanted_filters.add(filter_name);
            }
        }
        else {
            if (active_filters.has(filter_name)) {
                target.classList.remove("selected");
                active_filters.delete(filter_name);
            }
            else {
                if (unwanted_filters.has(filter_name)) {
                    target.classList.remove("unwanted");
                    unwanted_filters.delete(filter_name);
                }
                target.classList.add("selected");
                active_filters.add(filter_name);
            }
        }
    }

    if (active_filters.size == 0 && unwanted_filters.size == 0) clear_filters(target);
    else {
        // just remake all filters
        var new_active_chapters = new Set();
        var new_possible_unions = new Set();

        // filtered chapters
        for (var ch of all_chapters.values()) {
            let excluded = 0;
            for (name of unwanted_filters.values()) {
                if (chapters[name].includes(ch)) {
                    excluded++;
                    break;
                }
            }
            if (excluded) continue;

            let included = 0;
            for (name of active_filters.values()) {
                if (chapters[name].includes(ch)) {
                    included++;
                    continue;
                }
            }
            if (included == active_filters.size) new_active_chapters.add(ch);
        }

        let chapterscoll = target.closest(".serieschapters");
        let chapterlinks = chapterscoll.getElementsByClassName("chapter");
        for (var i = 0; i < chapterlinks.length; i++) {
            if (!new_active_chapters.has(chapterlinks[i].innerText.trim())) chapterlinks[i].classList.add("filtered");
            else chapterlinks[i].classList.remove("filtered");
        }

        // highlighted characters
        for (char of Object.keys(chapters)) {
            let possible = false;
            for (var i = 0; i < chapters[char].length; i++) {
                if (new_active_chapters.has(chapters[char][i])) {
                    possible = true;
                    break;
                }
            }

            if (possible) {
                new_possible_unions.add(char);
                document.getElementById(char).classList.remove("unavailable");
            }
            else {
                if (!document.getElementById(char).classList.contains("unwanted") && !document.getElementById(char).classList.contains("selected"))
                    document.getElementById(char).classList.add("unavailable");
            }
        }

        active_chapters = new_active_chapters;
        possible_unions = new_possible_unions;
    }
}