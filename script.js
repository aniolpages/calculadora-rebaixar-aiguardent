function resize() {
    document.getElementById("t").style.height = "auto", document.getElementById("t").style.height = document.getElementById("t").offsetHeight + "px"
}
window.onresize = resize, document.getElementById("t").style.height = document.getElementById("t").offsetHeight + "px";
var i1 = !1,
    i2 = !1,
    i3 = !1,
    i4 = !1,
    fet = !1;

function novesDades() {
    var e = document.getElementById("a_in").value,
        t = document.getElementById("b_in").value,
        n = document.getElementById("g_in").value,
        i = document.getElementById("n_in").value;
    i1 = "" !== e, i2 = "" !== t, i3 = "" !== n, i4 = "" !== i;
    t = e * (t / "100") / (i / "100"), n *= t / "1000", e = t - e - "0.6" * n, n = Math.round(n), e = Math.round(e), t = Math.round(t);
    if (isFinite(n) && isFinite(e) && isFinite(t) && !isNaN(e) && !isNaN(n) && !isNaN(t) && e != Infinity && n != Infinity && t != Infinity && document.getElementById("a_in").value.length > 0 && document.getElementById("b_in").value.length > 0 && document.getElementById("g_in").value.length > 0 && document.getElementById("n_in").value.length > 0) {
        document.getElementById("f_a").innerHTML = e + " ml";
        document.getElementById("f_s").innerHTML = n + " g";
        
        const resultText = window.i18n ? window.i18n.t('result_text', { volume: t, alcohol: i }) : 
            "Per aconseguir un volum de <b>" + t + " ml</b> a una graduació de <b>" + i + " %</b>. <br><br>Recomanem utilitzar aigua de mineralització molt dèbil. Per minimitzar l'enterboliment de la ratafia, afegiu l'aiguardent sobre el xarop.";
        
        document.getElementById("f_v").innerHTML = resultText;
        
        if (1 == i1 && 1 == i2 && 1 == i3 && 1 == i4 && 0 == fet) {
            fet = !0;
            document.getElementById("r").style.display = "block";
            document.getElementById("t").style.height = Math.floor(document.getElementById("t").offsetHeight + document.getElementById("r").offsetHeight) + "px";
            setTimeout(function () {
                document.getElementById("r").style.opacity = 1;
            }, 150);
        }
    }
}

function setInputFilter(t, n) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (e) {
        t.addEventListener(e, function () {
            n(this.value) ? (this.oldValue = this.value, this.oldSelectionStart = this.selectionStart, this.oldSelectionEnd = this.selectionEnd) : this.hasOwnProperty("oldValue") && (this.value = this.oldValue, this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd))
        })
    })
}
setInputFilter(document.getElementById("b_in"), function (e) {
    return /^\d*\.?\d*$/.test(e)
}), setInputFilter(document.getElementById("a_in"), function (e) {
    return /^\d*\.?\d*$/.test(e)
}), setInputFilter(document.getElementById("g_in"), function (e) {
    return /^\d*\.?\d*$/.test(e)
}), setInputFilter(document.getElementById("n_in"), function (e) {
    return /^\d*\.?\d*$/.test(e)
});

document.getElementById("a_in").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("b_in").focus();
    }
});
document.getElementById("b_in").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("n_in").focus();
    }
});
document.getElementById("n_in").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("g_in").focus();
    }
});
document.getElementById("g_in").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("g_in").blur();
    }
});
