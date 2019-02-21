//=============================================================
//=============================================================

export default class Comments extends HTMLElement {
	static get observedAttributes() {
		return ['comments'];
	}

	//=============================================================
	
	get comments(){
		if (this.hasAttribute('comments')) {
			return JSON.parse(this.getAttribute('comments'));
		} else {
			return [];
		}
	}

	//=============================================================

	// avoid using...
	set comments(val) {
		this.setAttribute('comments', JSON.stringify(val));
	}
	
	//=============================================================	
	
	connectedCallback() {
		this.render();
	}

	//=============================================================	

	attributeChangedCallback(attrName, oldVal, newVal){
		this.render();
	}

	//=============================================================

	render() {
		this.innerHTML = `${this.comments.map(comment => `<p>${comment.text}</p>`).join('')}`;
		// ^should be <message-board-comment></message-board-comment>, not generic <p>

		// this.innerHTML = `
		// 	<message-board-comment></message-board-comment>
		// 	<message-board-comment></message-board-comment>
		// 	<message-board-comment></message-board-comment>
		// 	<message-board-comment></message-board-comment>
		// `;
	}
}

//=============================================================
//=============================================================

