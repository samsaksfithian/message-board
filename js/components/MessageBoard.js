class MessageBoardApp extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = /* html */ `
			<nav>
				<form>
					<input
						type="text"
						name="search"
						placeholder="Search"
					/>
					<button type="submit">Search</button>
				</form>
			</nav>
			<message-board-comments></message-board-comments>
				<div class="add-comment">
					<form>
						<input
							type="text"
							name="comment"
							placeholder="Your opinion here"
						/>
						<button type="submit">Comment</button>
					</form>
				</div>
		`;

		// add event listeners
		this.querySelector('nav form').addEventListener('submit', this.handleSearchSubmit);
		this.querySelector('.add-comment form').addEventListener('submit', this.handleAddComment);
		this.querySelector('message-board-comments').addEventListener('removeComment', this.handleRemoveComment);
	}

	handleSearchSubmit = event => {};

	handleAddComment = event => {};

	handleRemoveComment = event => {};
}

export default MessageBoardApp;
