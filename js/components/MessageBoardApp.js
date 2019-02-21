// =============================================================
// =============================================================

// Imports
import MessageBoardAPI, { commentData } from "../MessageBoardAPI.js";

// =============================================================
// =============================================================

class MessageBoardApp extends HTMLElement {
	// =============================================================
	
	constructor() {
		super();
		this.api = new MessageBoardAPI(commentData);
		this.state = {
			comments: this.api.getCommentsSortedByTime(),
		};
		this.addEventListener('removeComment', this.handleRemoveComment);
	}
	
	// =============================================================
	
	// want to be able to pass in only the things we've changed
	// e.g. setState( { comments: updatedComments } )
	setState(newState) {
		Object.keys(newState).forEach(key => {
			// e.g. this.state.comments = updatedComments
			this.state[key] = newState[key];
			
			this.querySelectorAll(`[${key}]`).forEach(element => {
				element[key] = newState[key];
			});
		});
	}
	
	// =============================================================
	
	connectedCallback() {
		this.render();
	}
	
	// =============================================================
	
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
			<message-board-comment-list></message-board-comment-list>
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
		
		this.querySelector('message-board-comment-list').setAttribute('comments', JSON.stringify(this.state.comments));
		
		// add event listeners
		this.querySelector('nav form').addEventListener('submit', this.handleSearchSubmit);
		this.querySelector('.add-comment form').addEventListener('submit', this.handleAddComment);
	}
	
	// =============================================================
	
	handleSearchSubmit = event => {
		event.preventDefault();
		const searchText = new FormData(event.target).get('search');
		const updatedComments = this.api.filterCommentsByText(searchText);
		this.setState( { comments: updatedComments } );
		// console.log(searchText, this.state.comments);
	};
	
	// =============================================================
	
	handleAddComment = event => {
		event.preventDefault();
		const newCommentText = new FormData(event.target).get('comment');
		event.target.reset();
		const updatedComments = this.api.addComment(newCommentText);
		this.setState( { comments: updatedComments } );
		console.log(`Comments after add:`, updatedComments);
	};
	
	// =============================================================
	
	handleRemoveComment = event => {
		event.preventDefault();
		const confirmed = window.confirm(`Really delete "${event.detail}"?`);
		if (confirmed) {
			const updatedComments = this.api.removeComment(event.target.comment.id);
			this.setState( { comments: updatedComments } );
			console.log(`Comments after remove:`, updatedComments);
		}
	};
}

// =============================================================
// =============================================================

export default MessageBoardApp;

// =============================================================
// =============================================================

