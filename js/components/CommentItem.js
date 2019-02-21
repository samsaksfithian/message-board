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
		this.innerHTML = `
			<p>${this.comment.text}</p>
			<button type="button" class="delete-button">x</button>
		`;

		this.querySelector('button.delete-button').addEventListener('click', this.dispachRemoveEvent);
	}

	dispachRemoveEvent = () => {
		const removeEvent = new CustomEvent('removeComment', { // second argument is an options object
			bubbles: true,
			detail: this.comment.text,
		});
		this.dispatchEvent(removeEvent);
	}
}

// =============================================================
// =============================================================

