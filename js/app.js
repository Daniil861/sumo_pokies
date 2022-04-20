(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (document.querySelector(".slot") || document.querySelector(".fortune")) {
        document.querySelector(".block-bet__coins").textContent = 50;
        sessionStorage.setItem("current-bet", 50);
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelector(block).classList.add("_delete-money");
            document.querySelector(block).textContent = sessionStorage.getItem("money");
        }), 500);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_delete-money");
        }), 1500);
    }
    function no_money(block) {
        document.querySelector(block).classList.add("_no-money");
        setTimeout((() => {
            document.querySelector(block).classList.remove("_no-money");
        }), 1e3);
    }
    function current_bet() {
        return +sessionStorage.getItem("current-bet");
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelector(block).textContent = +sessionStorage.getItem("money") + count;
            document.querySelector(block).classList.add("_anim-add-money");
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_anim-add-money");
        }), delay_off);
    }
    function get_random_animate() {
        let number = get_random(0, 4);
        let arr = [ "jump", "jump-2", "rotate", "scale" ];
        let block_icon = document.querySelector(".item-money__icon");
        if (block_icon.classList.contains("_anim-icon-jump")) block_icon.classList.remove("_anim-icon-jump"); else if (block_icon.classList.contains("_anim-icon-jump-2")) block_icon.classList.remove("_anim-icon-jump-2"); else if (block_icon.classList.contains("_anim-icon-rotate")) block_icon.classList.remove("_anim-icon-rotate"); else if (block_icon.classList.contains("_anim-icon-scale")) block_icon.classList.remove("_anim-icon-scale");
        block_icon.classList.add(`_anim-icon-${arr[number]}`);
    }
    if (document.querySelector(".item-money__icon")) setInterval((() => {
        get_random_animate();
    }), 12e3);
    var minTime = 1e3;
    var maxTime = 2500;
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    var casino4 = document.querySelector("#slot4");
    var casino5 = document.querySelector("#slot5");
    if (casino1 && casino2 && casino3 && casino4 && casino5) {
        let a, b, c, d, e;
        var mcasino1 = new SlotMachine(casino1, {
            active: 3,
            delay: 800,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 800,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 6,
            delay: 800,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino4 = new SlotMachine(casino4, {
            active: 4,
            delay: 800,
            onComplete: function(active) {
                d = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino5 = new SlotMachine(casino5, {
            active: 5,
            delay: 800,
            onComplete: function(active) {
                e = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        function gameSlot() {
            mcasino1.shuffle(10);
            mcasino2.shuffle(10);
            mcasino3.shuffle(10);
            mcasino4.shuffle(10);
            mcasino5.shuffle(10);
            setTimeout((() => mcasino1.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino4.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino5.stop()), get_random(minTime, maxTime));
        }
        var casinoAutoSpin;
        if (document.querySelector(".actions-slot__button-play")) document.querySelector(".actions-slot__button-play").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            d = 666;
            e = 666;
            if (casino1 && casino2 && casino3 && casino4 && casino5 && +sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
                delete_money(+sessionStorage.getItem("current-bet"), ".check");
                clearInterval(casinoAutoSpin);
                gameSlot();
                document.querySelector(".actions-slot__button-play").classList.add("_hold");
                setTimeout((() => {
                    document.querySelector(".actions-slot__button-play").classList.remove("_hold");
                }), 3500);
            } else no_money(".check");
        }));
        if (document.querySelector(".actions-slot__button-auto")) document.querySelector(".actions-slot__button-auto").addEventListener("click", (() => {
            if (casino1 && casino2 && casino3 && casino4 && casino5 && +sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
                delete_money(+sessionStorage.getItem("current-bet"), ".check");
                gameSlot();
                document.querySelector(".actions-slot__button-auto").classList.add("_hold");
                let casinoAutoSpinCount = 0;
                casinoAutoSpin = setInterval((function() {
                    casinoAutoSpinCount++;
                    if (casinoAutoSpinCount < 10 && +sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
                        delete_money(+sessionStorage.getItem("current-bet"), ".check");
                        gameSlot();
                    } else {
                        clearInterval(casinoAutoSpin);
                        document.querySelector(".actions-slot__button-auto").classList.remove("_hold");
                    }
                }), 4500);
            }
        }));
    }
    let config = {
        program: 0,
        item_left: 0,
        item_top: 0,
        current_number_dot: 0,
        current_bonus: 0,
        current_position_dot: 1,
        current_sum_number: 0,
        arr: [ 2, 3, 4, 5, 6, 7 ],
        current_arr: []
    };
    if (document.querySelector(".fortune")) sessionStorage.setItem("current-level", 1);
    document.addEventListener("touchstart", start_count_cube, false);
    document.addEventListener("touchend", stop_count_cube, false);
    function start_count_cube(e) {
        let targetElement = e.target;
        if (targetElement.closest(".fortune__cube img")) {
            targetElement.oncontextmenu = function() {
                return false;
            };
            if (+sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) config.program = get_random(1, 8);
        }
    }
    function stop_count_cube(e) {
        let targetElement = e.target;
        if (targetElement.closest(".fortune__cube img")) if (+sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
            delete_money(+sessionStorage.getItem("current-bet"), ".check");
            rotate_cub();
            if (0 == config.current_sum_number) create_items_huble();
            setTimeout((() => {
                get_random_cube();
                add_hold_cube();
                setTimeout((() => {
                    check_and_jump_dragon();
                }), 500);
            }), 500);
        } else no_money(".check");
    }
    function get_random_cube() {
        if (0 == config.current_sum_number) {
            let number = get_random(1, 7);
            config.current_number_dot = number + 1;
            config.current_sum_number = number;
            let image = document.createElement("img");
            image.setAttribute("src", `img/game/cub-${number}.svg`);
            document.querySelector(".fortune__cube img").remove();
            document.querySelector(".fortune__cube").append(image);
            let block = document.querySelector(`.fortune__hubble_${number + 1}`);
            get_coord_block(block);
        } else {
            let num = config.current_sum_number;
            let balance_num = 6 - num;
            let number = 0;
            if (balance_num <= 1) number = 1; else number = get_random(1, balance_num);
            config.current_number_dot = number + config.current_number_dot;
            config.current_sum_number += number;
            let image = document.createElement("img");
            image.setAttribute("src", `img/game/cub-${number}.svg`);
            document.querySelector(".fortune__cube img").remove();
            document.querySelector(".fortune__cube").append(image);
            let block = document.querySelector(`.fortune__hubble_${number + 1}`);
            get_coord_block(block);
        }
    }
    function rotate_cub() {
        let block = document.querySelector(".fortune__cube");
        if (1 == config.program) {
            block.style.transform = "rotate(-90deg)";
            block.style.right = "12vw";
        } else if (2 == config.program) {
            block.style.transform = "rotate(-180deg)";
            block.style.right = "18vw";
        } else if (3 == config.program) {
            block.style.transform = "rotate(-270deg)";
            block.style.right = "26vw";
        } else if (4 == config.program) {
            block.style.transform = "rotate(-360deg)";
            block.style.right = "32vw";
        } else if (5 == config.program) {
            block.style.transform = "rotate(-450deg)";
            block.style.right = "40vw";
        } else if (6 == config.program) {
            block.style.transform = "rotate(-540deg)";
            block.style.right = "48vw";
        } else if (7 == config.program) {
            block.style.transform = "rotate(-630deg)";
            block.style.right = "56vw";
        }
    }
    function get_start_position_cube() {
        let block = document.querySelector(".fortune__cube");
        block.style.transform = "rotate(0deg)";
        block.style.right = "5vw";
    }
    function add_hold_cube() {
        document.querySelector(".fortune__cube").classList.add("_hold");
    }
    function remove_hold_cube() {
        if (document.querySelector(".fortune__cube").classList.contains("_hold")) document.querySelector(".fortune__cube").classList.remove("_hold");
    }
    function get_coord_block(block) {
        config.item_left = block.getBoundingClientRect().left;
        config.item_top = block.getBoundingClientRect().top;
    }
    function move_dragon() {
        document.querySelector(".fortune__dragon").style.top = `${config.item_top - 120}px`;
        document.querySelector(".fortune__dragon").style.left = `${config.item_left - 10}px`;
    }
    function check_and_jump_dragon() {
        let delay1 = 1500, delay2 = 1500, delay3 = 1500, delay4 = 1500, delay5 = 1500, delay6 = 1500;
        if (2 == config.current_position_dot) delay1 = 0, delay2 = 1500, delay3 = 1500, 
        delay4 = 1500, delay5 = 1500, delay6 = 1500; else if (3 == config.current_position_dot) delay1 = 0, 
        delay2 = 0, delay3 = 1500, delay4 = 1500, delay5 = 1500, delay6 = 1500; else if (4 == config.current_position_dot) delay1 = 0, 
        delay2 = 0, delay3 = 0, delay4 = 1500, delay5 = 1500, delay6 = 1500; else if (5 == config.current_position_dot) delay1 = 0, 
        delay2 = 0, delay3 = 0, delay4 = 0, delay5 = 1500, delay6 = 1500; else if (6 == config.current_position_dot) delay1 = 0, 
        delay2 = 0, delay3 = 0, delay4 = 0, delay5 = 0, delay6 = 1500;
        if (1 == config.current_position_dot) jump_dragon(2);
        setTimeout((() => {
            if (1 == config.current_position_dot) config.current_position_dot = 2;
            if (config.current_number_dot == config.current_position_dot) {
                move_dragon();
                setTimeout((() => {
                    check_game_over();
                }), 1500);
                return false;
            } else {
                if (2 == config.current_position_dot) {
                    jump_dragon(3);
                    config.current_position_dot = 3;
                }
                setTimeout((() => {
                    if (config.current_number_dot == config.current_position_dot) {
                        move_dragon();
                        setTimeout((() => {
                            check_game_over();
                        }), 1500);
                        return false;
                    } else {
                        if (3 == config.current_position_dot) {
                            jump_dragon(4);
                            config.current_position_dot = 4;
                        }
                        setTimeout((() => {
                            if (config.current_number_dot == config.current_position_dot) {
                                move_dragon();
                                setTimeout((() => {
                                    check_game_over();
                                }), 1500);
                                return false;
                            } else {
                                if (4 == config.current_position_dot) {
                                    jump_dragon(5);
                                    config.current_position_dot = 5;
                                }
                                setTimeout((() => {
                                    if (config.current_number_dot == config.current_position_dot) {
                                        move_dragon();
                                        setTimeout((() => {
                                            check_game_over();
                                        }), 1500);
                                        return false;
                                    } else {
                                        if (5 == config.current_position_dot) {
                                            jump_dragon(6);
                                            config.current_position_dot = 6;
                                        }
                                        setTimeout((() => {
                                            if (config.current_number_dot == config.current_position_dot) {
                                                move_dragon();
                                                setTimeout((() => {
                                                    check_game_over();
                                                }), 1500);
                                                return false;
                                            } else {
                                                jump_dragon(7);
                                                setTimeout((() => {
                                                    move_dragon();
                                                    setTimeout((() => {
                                                        check_game_over();
                                                    }), 1500);
                                                    return false;
                                                }), delay6);
                                            }
                                        }), delay5);
                                    }
                                }), delay4);
                            }
                        }), delay3);
                    }
                }), delay2);
            }
        }), delay1);
    }
    function jump_dragon(num_dot) {
        get_coord_block(document.querySelector(`.fortune__hubble_${num_dot}`));
        setTimeout((() => {
            document.querySelector(".fortune__dragon").style.top = `${config.item_top - 180}px`;
            document.querySelector(".fortune__dragon").style.left = `${config.item_left - 10}px`;
            setTimeout((() => {
                document.querySelector(".fortune__dragon").style.top = `${config.item_top - 120}px`;
                document.querySelector(".fortune__dragon").style.left = `${config.item_left - 10}px`;
            }), 500);
        }), 500);
    }
    function create_result_bomb(num) {
        let bomb_item = document.createElement("div");
        bomb_item.classList.add("fortune__bomb");
        let image = document.createElement("img");
        image.setAttribute("src", "img/game/bomb.png");
        image.setAttribute("alt", "Icon");
        bomb_item.append(image);
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).append(bomb_item);
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).dataset.value = "bomb";
    }
    function create_result_coins(num) {
        let arr = [ 0, 0, 1, 2, 3, 5 ];
        let random_number = get_random(0, 6);
        let random = arr[random_number];
        let coins_item = document.createElement("div");
        coins_item.classList.add("fortune__bonus");
        let count = document.createElement("div");
        count.classList.add("fortune__count");
        let item_win = +sessionStorage.getItem("current-bet") * random;
        count.textContent = `+${item_win}`;
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/coin.png");
        image.setAttribute("alt", "Icon");
        coins_item.append(count, image);
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).append(coins_item);
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).dataset.value = item_win;
    }
    function create_result_bonus_coins(num) {
        let arr = [ 0, 0, 1, 2, 3, 5 ];
        let random_number = get_random(0, 6);
        let random = arr[random_number];
        let coins_item = document.createElement("div");
        coins_item.classList.add("fortune__bonus");
        let count = document.createElement("div");
        count.classList.add("fortune__count");
        let item_win = +sessionStorage.getItem("current-bet") * random;
        count.textContent = `+${item_win}`;
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/coin.png");
        image.setAttribute("alt", "Icon");
        coins_item.append(count, image);
        document.querySelector(`.bonus__open-image_${num}`).append(coins_item);
        document.querySelector(`.bonus__image_${num}`).dataset.value = item_win;
    }
    function create_result_bonus(num) {
        let box_bonus = document.createElement("div");
        box_bonus.classList.add("fortune__box-bonus");
        let box_close = document.createElement("div");
        box_close.classList.add("fortune__box-close");
        let box_close_image = document.createElement("img");
        box_close_image.setAttribute("src", "img/game/box.png");
        box_close.append(box_close_image);
        let box_open = document.createElement("div");
        box_open.classList.add("fortune__box-open");
        let box_open_image = document.createElement("img");
        box_open_image.setAttribute("src", "img/game/open-box.png");
        let bonus = document.createElement("div");
        bonus.classList.add("fortune__bonus");
        let count = document.createElement("div");
        count.classList.add("fortune__count");
        let item_win = 10 * +sessionStorage.getItem("current-bet");
        count.textContent = `+${item_win}`;
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/coin.png");
        image.setAttribute("alt", "Icon");
        bonus.append(count, image);
        box_open.append(box_open_image, bonus);
        box_bonus.append(box_close, box_open);
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).append(box_bonus);
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).dataset.value = item_win;
        document.querySelector(`.fortune__hubble_${config.current_arr[num]}`).dataset.box = 1;
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [ array[j], array[i] ];
        }
        return array;
    }
    function create_items_huble() {
        config.current_arr = shuffle(config.arr);
        if (1 == +sessionStorage.getItem("current-level")) {
            create_result_bomb(0);
            create_result_coins(1);
            create_result_coins(2);
            create_result_coins(3);
            create_result_coins(4);
            create_result_coins(5);
        } else if (2 == +sessionStorage.getItem("current-level")) {
            create_result_bomb(0);
            create_result_bomb(1);
            create_result_coins(2);
            create_result_coins(3);
            create_result_coins(4);
            create_result_coins(5);
            create_result_bonus_coins(1);
            create_result_bonus_coins(2);
            create_result_bonus_coins(3);
        } else if (3 == +sessionStorage.getItem("current-level")) {
            create_result_bomb(0);
            create_result_bomb(1);
            create_result_bonus(2);
            create_result_coins(3);
            create_result_coins(4);
            create_result_coins(5);
        }
    }
    function check_game_over() {
        let current_dragon_position = config.current_number_dot;
        document.querySelector(`.fortune__hubble_${current_dragon_position}`).classList.add("_active");
        if ("bomb" == document.querySelector(`.fortune__hubble_${current_dragon_position}`).dataset.value) {
            document.querySelector(".fortune__dragon").style.top = `${config.item_top - 149}px`;
            config.current_sum_number = 0;
            config.current_number_dot = 0;
            config.current_position_dot = 1;
            setTimeout((() => {
                document.querySelector(".loose").classList.add("_active");
            }), 1e3);
        } else if (+document.querySelector(`.fortune__hubble_${current_dragon_position}`).dataset.value > 0) {
            if (1 == +sessionStorage.getItem("current-level") || 2 == +sessionStorage.getItem("current-level")) {
                add_money(get_count_win(), ".check", 1e3, 2e3);
                if (config.current_sum_number > 5) {
                    document.querySelector(".fortune__btn-next-level").classList.add("_active");
                    if (2 == +sessionStorage.getItem("current-level")) setTimeout((() => {
                        document.querySelector(".bonus").classList.add("_active");
                    }), 1e3);
                } else {
                    get_start_position_cube();
                    remove_hold_cube();
                }
            }
            if (3 == +sessionStorage.getItem("current-level")) if (config.current_sum_number > 5) write_text_play_in_btn(); else {
                get_start_position_cube();
                remove_hold_cube();
            }
        } else if (0 == +document.querySelector(`.fortune__hubble_${current_dragon_position}`).dataset.value) {
            if (1 == +sessionStorage.getItem("current-level") || 2 == +sessionStorage.getItem("current-level")) if (config.current_sum_number > 5) {
                document.querySelector(".fortune__btn-next-level").classList.add("_active");
                if (2 == +sessionStorage.getItem("current-level")) setTimeout((() => {
                    document.querySelector(".bonus").classList.add("_active");
                }), 1e3);
            } else {
                get_start_position_cube();
                remove_hold_cube();
            }
            if (3 == +sessionStorage.getItem("current-level")) if (config.current_sum_number > 5) write_text_play_in_btn(); else {
                get_start_position_cube();
                remove_hold_cube();
            }
        }
    }
    function write_text_play_in_btn() {
        if (3 == +sessionStorage.getItem("current-level")) {
            document.querySelector(".fortune__btn-next-level p").textContent = "play again";
            document.querySelector(".fortune__btn-next-level").classList.add("_active");
        } else document.querySelector(".fortune__btn-next-level").classList.add("_active");
    }
    function check_level() {
        let level = +sessionStorage.getItem("current-level");
        if (1 == level) sessionStorage.setItem("current-level", 2); else if (2 == level) {
            if (document.querySelector(".bonus") && document.querySelector(".bonus").classList.contains("_active")) document.querySelector(".bonus").classList.remove("_active");
            sessionStorage.setItem("current-level", 3);
        }
    }
    function get_count_win() {
        return +document.querySelector(`.fortune__hubble_${config.current_number_dot}`).dataset.value;
    }
    function remove_items() {
        document.querySelectorAll(".fortune__bonus").forEach((el => el.remove()));
        document.querySelectorAll(".fortune__bomb").forEach((el => el.remove()));
        document.querySelectorAll(".fortune__hubble").forEach((el => {
            if (el.classList.contains("_active")) el.classList.remove("_active");
        }));
        if (document.querySelector(".fortune__box-bonus")) document.querySelector(".fortune__box-bonus").remove();
    }
    function reset_current_actions() {
        document.querySelector(".fortune__btn-next-level").classList.remove("_active");
        config.current_sum_number = 0;
        config.current_number_dot = 0;
        config.current_position_dot = 1;
        remove_items();
        get_start_position_cube();
        remove_hold_cube();
        draw_bg_current_level();
        remove_dot_positions();
        add_dot_positions();
        get_coord_block(document.querySelector(".fortune__hubble_1"));
        move_dragon();
    }
    function draw_bg_current_level() {
        delete_fortune_bg();
        if (1 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune").classList.add("fortune_bg-1"); else if (2 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune").classList.add("fortune_bg-2"); else if (3 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune").classList.add("fortune_bg-3");
    }
    function delete_fortune_bg() {
        if (document.querySelector(".fortune").classList.contains("fortune_bg-1")) document.querySelector(".fortune").classList.remove("fortune_bg-1"); else if (document.querySelector(".fortune").classList.contains("fortune_bg-2")) document.querySelector(".fortune").classList.remove("fortune_bg-2"); else if (document.querySelector(".fortune").classList.contains("fortune_bg-3")) document.querySelector(".fortune").classList.remove("fortune_bg-3");
    }
    function add_dot_positions() {
        if (1 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune__field").classList.add("_level-1"); else if (2 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune__field").classList.add("_level-2"); else if (3 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune__field").classList.add("_level-3");
    }
    function remove_dot_positions() {
        if (2 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune__field").classList.remove("_level-1"); else if (3 == +sessionStorage.getItem("current-level")) document.querySelector(".fortune__field").classList.remove("_level-2");
    }
    function remove_dataset() {
        document.querySelectorAll(`.fortune__hubble`).forEach((el => {
            if (el.dataset.box) el.removeAttribute("data-box");
        }));
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".block-bet__minus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet >= 50) {
                sessionStorage.setItem("current-bet", current_bet - 50);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".block-bet__plus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank - 49 > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 50);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            } else no_money(".check");
        }
        if (targetElement.closest(".fortune__btn-next-level")) {
            check_level();
            reset_current_actions();
            if (3 == +sessionStorage.getItem("current-level")) remove_dataset();
        }
        if (targetElement.closest(".loose__btn-restart")) {
            reset_current_actions();
            document.querySelector(".loose").classList.remove("_active");
            if (3 == +sessionStorage.getItem("current-level")) remove_dataset();
        }
        if (targetElement.closest(".bonus__image")) setTimeout((() => {
            targetElement.closest(".bonus__image").classList.add("_active");
            config.current_bonus = +targetElement.closest(".bonus__image").dataset.value;
            add_money(config.current_bonus, ".check", 1e3, 2e3);
            document.querySelector(".bonus").classList.add("_hold");
            setTimeout((() => {
                document.querySelector(".bonus").classList.add("_hide");
            }), 1500);
            setTimeout((() => {
                document.querySelector(".bonus").remove();
            }), 3e3);
        }), 200);
        if (targetElement.closest(".fortune__box-bonus")) {
            targetElement.closest(".fortune__box-bonus").classList.add("_active");
            add_money(get_count_win(), ".check", 1e3, 2e3);
        }
    }));
    isWebp();
})();