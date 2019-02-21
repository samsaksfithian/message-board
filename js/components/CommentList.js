// =============================================================
// =============================================================

export default class CommentList extends HTMLElement {
	static get observedAttributes() {
		return ['comments'];
	}

	// =============================================================

	get comments() {
		if (this.hasAttribute('comments')) {
			return JSON.parse(this.getAttribute('comments'));
		}
		return [];
	}

	// =============================================================

	// avoid using...
	set comments(val) {
		this.setAttribute('comments', JSON.stringify(val));
	}
	
	// =============================================================	
	
	connectedCallback() {
		this.render();
	}

	// =============================================================	

	attributeChangedCallback() {
		// often/normally, args will be: (attrName, oldVal, newVal)
		// not super necessary right now, but good to get in the habit/know how it works
		this.render();
	}

	// =============================================================

	render() {
		this.innerHTML = '';
		this.comments.forEach(comment => {
			// create a comment-list element
			const newComment = document.createElement('message-board-comment-item');
			// set its comment attribute
			newComment.comment = comment;
			this.appendChild(newComment);
		});
	}
}

// =============================================================
// =============================================================

