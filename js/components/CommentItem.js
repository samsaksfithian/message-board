// =============================================================
// =============================================================

export default class CommentItem extends HTMLElement {
	// =============================================================

	get comment() {
		if (this.hasAttribute('comment')) {
			return JSON.parse(this.getAttribute('comment'));
		}
		const defaultComment = {
			timestamp: Date.now(),
			text: '',
			id: -1,
		};
		return defaultComment;
	}

	// =============================================================

	set comment(val) {
		this.setAttribute('comment', JSON.stringify(val));
	}
	
	// =============================================================
	
	connectedCallback() {
		this.render();
	}

	// =============================================================

	render() {
		const formattedTS = new Date(this.comment.timestamp);
		const ampm = formattedTS.getHours() - 12 > 0 ? "pm" : "am";
		const displayTime = `${formattedTS.getHours() % 12}:${formattedTS.getMinutes()}${ampm}`;
		const displayDate = `${formattedTS.getMonth() + 1}/${formattedTS.getDate()}/${formattedTS.getFullYear()}`;
		this.innerHTML = `
			<p>${this.comment.text}</p>
			<p class="timestamp-text">Posted at ${displayTime} on ${displayDate}</p>
			<button type="button" class="edit-button">Edit</button>
			<button type="button" class="delete-button">x</button>
		`;

		this.querySelector('button.delete-button').addEventListener('click', this.dispatchRemoveEvent);
		this.querySelector('button.edit-button').addEventListener('click', this.dispatchEditEvent);
		
		// console.log("Rendered Comment", this.comment);
	}

	// =============================================================

	dispatchEditEvent = () => {
		const editEvent = new CustomEvent('editComment', { // second argument is an options object
			bubbles: true,
			detail: this.comment.text,
		});
		this.dispatchEvent(editEvent);
	};

	// =============================================================

	dispatchRemoveEvent = () => {
		const removeEvent = new CustomEvent('removeComment', { // second argument is an options object
			bubbles: true,
			detail: this.comment.text,
		});
		this.dispatchEvent(removeEvent);
	}
}

// =============================================================
// =============================================================

