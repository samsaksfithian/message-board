export default class Comments extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<message-board-comment></message-board-comment>
			<message-board-comment></message-board-comment>
			<message-board-comment></message-board-comment>
			<message-board-comment></message-board-comment>
		`;
	}
}
