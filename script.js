function resize() {
	document.getElementById('t').style.height = 'auto';
	document.getElementById('t').style.height = document.getElementById('t').offsetHeight + 'px';
}
window.onresize = resize;
document.getElementById('t').style.height = document.getElementById('t').offsetHeight + 'px';
var i1 = false;
var i2 = false;
var i3 = false;
var i4 = false;
var fet = false;
function novesDades() {
	var A = document.getElementById("a_in").value;
	var B = document.getElementById("b_in").value;
	var S = document.getElementById("g_in").value;
	var N = document.getElementById("n_in").value;
	if (A !== '') {
		i1 = true;
	} else {
		i1 = false;
	}
	if (B !== '') {
		i2 = true;
	} else {
		i2 = false;
	}
	if (S !== '') {
		i3 = true;
	} else {
		i3 = false;
	}
	if (N !== '') {
		i4 = true;
	} else {
		i4 = false;
	}
	let M = N / "100";
	let Y = B / "100";
	let C = A * Y;
	let D = C / M;
	let E = D - A;
	let Z = D / "1000";
	let X = S * Z;
	let G = X * "0.6";
	let H = E - G;
	let J = Math.round(X)
	let R = Math.round(H)
	let I = Math.round(D)
	document.getElementById('f_a').innerHTML = R + ' ml';
	document.getElementById('f_s').innerHTML = J + ' g';
	document.getElementById('f_v').innerHTML = 'Per aconseguir un volum de ' + I + ' ml a una graduació de ' + N + "%. Recomanem utilitzar aigua de mineralització molt dèbil. Per minimitzar l'enterboliment de la ratafia, afegiu l'aiguardent sobre el xarop.";
	if (i1 == true) {
		if (i2 == true) {
			if (i3 == true) {
				if (i4 == true) {
					if (fet == false) {
						fet = true;
						document.getElementById('r').style.display = 'block';
						document.getElementById('t').style.height = Math.floor(document.getElementById('t').offsetHeight + document.getElementById('r').offsetHeight) + 'px';
						setTimeout(function() { document.getElementById('r').style.opacity = 1; }, 150);
					}
				}
			}
		}
	}
}
function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		textbox.addEventListener(event, function() {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
		});
	});
}
setInputFilter(document.getElementById("b_in"), function(value) {
	return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("a_in"), function(value) {
	return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("g_in"), function(value) {
	return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("n_in"), function(value) {
	return /^\d*\.?\d*$/.test(value);
});