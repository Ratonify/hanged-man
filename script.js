/* Last edit: 6/12/2020 */

const hangedman = document.getElementById('hangedman');
const showMessage = document.getElementById('showMessage');
const findWord = document.getElementById('findWord');
const illustration = document.getElementById('illustration');
const myKeyboard = document.getElementById('myKeyboard');

const hangedstart = document.getElementById('hangedstart');
const myWord = document.getElementById('kindWord');
const inputStart = document.getElementById('startGame');

/* Vérifier s'il y a du texte */
function checkValues(event) {
	/* A moitié fonctionnel : changement requis */
	if (event >= 65 && event <= 90) {
		inputStart.disabled = myWord.value === "" || myWord.value.length <= 4 ? true : false;
		myWord.value.length <= 4 ? myWord.classList.add('is-invalid') : myWord.classList.remove('is-invalid');
	}
	else {
		inputStart.disabled = true;
		inputStart.disabled ? myWord.classList.add('is-invalid') : myWord.classList.remove('is-invalid');
	}
}

class Hangedman {
	constructor() {
		this.wordArray = [];
		this.letterUsed = [];
		this.keyboard = "AZERTYUIOPQSDFGHJKLMWXCVBN";
		this.tries = 5;
		this.winz = 0;
		this.whatsMyWord = kindWord.value.toUpperCase();

		/* Masquer l'input et afficher le jeu */
		hangedstart.classList.remove('show');
		hangedstart.classList.add('hide');
		hangedman.classList.remove('hide');
		hangedman.classList.add('show');

		/* Faire un span avec un _ pour chaque lettre du mot à trouver */
		for(let i = 0; i < kindWord.value.length; i++) {
			let spanLetter = document.createElement('SPAN');
			spanLetter.id = i;
			spanLetter.textContent = '_';
			findWord.appendChild(spanLetter);
			
			this.wordArray.push(this.whatsMyWord[i]);
		}

		console.log(this.wordArray);

		/* Créer le clavier */
		for(let m = 0; m < this.keyboard.length; m++) {
			let createButton  = document.createElement('BUTTON');
			createButton.classList.add('kbc-button');
			createButton.textContent = this.keyboard.charAt(m);
			myKeyboard.appendChild(createButton);
			
			/* Revenir à la ligne après les lettres P et M */
			if(m == 9 || m == 19) {
				let createSpan  = document.createElement('SPAN');
				createSpan.classList.add('span');
				myKeyboard.appendChild(createSpan);
			}

			/* Mise en place d'un évènement pour les boutons */
			createButton.addEventListener('click', () => {
				this.check(createButton.textContent);
				createButton.disabled = true;
			});
		}

		/* Mise en place d'un évènement pour les touches du clavier */
		window.addEventListener('keyup', (e) => {
			this.check(e.key);
			createButton.disabled = true;
		});
	}

	check(e) {
		/* Tout en majuscule */
		let letterUppercased = e.toUpperCase();

		/* Vérifier si le caractère est une lettre et si elle n'a pas déjà été pressée */
		if (this.keyboard.indexOf(letterUppercased) >= 0 && this.letterUsed.indexOf(letterUppercased) === -1) {
			let letterEntered = false;
			this.letterUsed.push(letterUppercased);

			/* Vérifier dans le tableau si la lettre est présente */
			for(let j = 0; j < this.wordArray.length; j++) {
				if(this.wordArray[j] === e.toUpperCase()) {
					document.getElementById(j).textContent = e.toUpperCase();
					letterEntered = true;
					this.winz++;

					this.winCondition();
				}
			}
		
			/* Gestion des erreurs */
			if(!letterEntered) {
				/* Supprimer une vie */
				let removeLife = document.getElementsByClassName('fa-circle-notch');
				removeLife[0].parentNode.removeChild(removeLife[0]);

				/* Changement d'image de fond */
				illustration.classList.remove(`tries${this.tries}`);
				this.tries--;
				illustration.classList.add(`tries${this.tries}`);

				this.winCondition();

				console.log(`Reste ${this.tries} essais.`);
			}
		}
	}

	winCondition() {
		/* Si la condition de victoire est remplie */
		if(this.winz == this.wordArray.length || this.tries == 0) {
			/* Désactiver tous les boutons */
			let disableButtons = document.getElementsByClassName('kbc-button');
			for(let n = 0; n < disableButtons.length; n++) {
				disableButtons[n].disabled = true;
			}

			/* Afficher de quoi relancer une partie */
			let zed = document.getElementById('zed');
			zed.textContent = "";
			zed.classList.add("retry");
			let icon = document.createElement('I');
			icon.classList.add("fas", "fa-sync-alt");
			zed.appendChild(icon);
			let textnode = document.createTextNode(" Recommencer ?");
			zed.appendChild(textnode);

			zed.addEventListener('click', () => {
				document.location.reload();
			});

			/* Conditions de victoire */
			if(this.winz == this.wordArray.length) {
				showMessage.classList.add('victory');
				findWord.classList.add('victory');
				showMessage.textContent = "Victoire !";
				console.log("Victoire !");
			} 
			/* Si plus d'essais, perdu ! Fin de partie */
			else if (this.tries == 0) {
				findWord.classList.add('annihilation');
				findWord.textContent = kindWord.value;
				showMessage.textContent = "Perdu !";
				document.getElementById('tarot').textContent = "The Hanged Cat";
			}
		}
	}
}

window.addEventListener("load", () => {
	console.log("Pendu !");

	inputStart.addEventListener('click', () => {
		this.pendu = new Hangedman();
	});
});
