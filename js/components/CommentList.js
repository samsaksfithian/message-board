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

	attributeChangedCallback(attrName, oldVal, newVal) {
		// attrName, oldVal, and newVal not super necessary right now, but good to get in the habit/know how it works
		console.log(attrName, oldVal, newVal);
		this.render();
	}

	// =============================================================

	render() {
		this.innerHTML = `${this.comments.map(comment => `<p>${comment.text}</p>`).join('')}`;
		// ^should be <message-board-comment-item></message-board-comment-item>, not generic <p>

		// this.innerHTML = `
		// 	<message-board-comment-item></message-board-comment-item>
		// 	<message-board-comment-item></message-board-comment-item>
		// 	<message-board-comment-item></message-board-comment-item>
		// 	<message-board-comment-item></message-board-comment-item>
		// `;
	}
}

// =============================================================
// =============================================================

