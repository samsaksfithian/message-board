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
		this.addEventListener('removeComment', this.handleRemoveComment);
		this.addEventListener('editComment', this.handleEditComment);
		this.state = {
			comments: [],
			loading: true,
		};
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
		this.toggleLoading();
	}
	
	// =============================================================
	
	connectedCallback() {
		// argument of the arrow function is the return of the callback function
		this.api.getComments().then(comments => {
			// same as this.setState( { comments: comments } );
			this.setState( { comments, loading: false } );
		});
		this.render();
	}
	
	// =============================================================
	
	toggleLoading() {
		this.loader.style.display = this.state.loading ? "block" : "none";
	}
	
	// =============================================================
	
	render() {
		this.innerHTML = /* html */ `
		<nav>
			<div id="selectSort">
				<select name="sortBy">
					<option value="" selected disabled hidden>Sort By</option>
					<option value="Oldest First">Oldest First</option>
					<option value="Newest First">Newest First</option>
					<option value="Alpha A to Z">Alpha A to Z</option>
					<option value="Alpha Z to A">Alpha Z to A</option>
				</select>
			</div>
			<form>
				<input
					type="text"
					name="search"
					placeholder="Search"
				/>
				<button type="submit">Search</button>
				<button type="button" id="clear-button">Clear</button>
			</form>
		</nav>
		<div class="loader"></div>
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
		this.querySelector('#clear-button').addEventListener('click', this.handleClearSearch);
		this.querySelector('.add-comment form').addEventListener('submit', this.handleAddComment);
		this.querySelector('#selectSort').addEventListener('input', this.handleSortSubmit);
		
		this.loader = this.querySelector('.loader');
		// console.log("Rendered App", this.state.comments);
	}

	// =============================================================

	handleSortSubmit = async event => {
		event.preventDefault();
		this.setState( { loading: true } );
		const sortType = event.target.value;
		// eslint-disable-next-line react/no-access-state-in-setstate
		let updatedComments = this.state.comments;
		if (sortType === 'Oldest First') {
			updatedComments = await this.api.getCommentsSortedByTime(true);
		} else if (sortType === 'Newest First') {
			updatedComments = await this.api.getCommentsSortedByTime(false);
		} else if (sortType === 'Alpha A to Z') {
			updatedComments = await this.api.getCommentsSortedByAlpha(true);
		} else if (sortType === 'Alpha Z to A') {
			updatedComments = await this.api.getCommentsSortedByAlpha(false);
		}
		this.setState( { comments: updatedComments, loading: false } );
	};
	
	// =============================================================
	
	handleSearchSubmit = async event => {
		event.preventDefault();
		this.setState( { loading: true } );
		const searchText = new FormData(event.target).get('search');
		const updatedComments = await this.api.filterCommentsByText(searchText);
		this.setState( { comments: updatedComments, loading: false } );
		// console.log(searchText, this.state.comments);
	};

	// =============================================================
	
	handleClearSearch = async event => {
		event.preventDefault();
		this.setState( { loading: true } );
		event.target.form.reset();
		const updatedComments = await this.api.filterCommentsByText();
		this.setState( { comments: updatedComments, loading: false } );
	};
	
	// =============================================================
	
	handleAddComment = async event => {
		event.preventDefault();
		this.setState( { loading: true } );
		const newCommentText = new FormData(event.target).get('comment');
		event.target.reset();
		const updatedComments = await this.api.addComment(newCommentText);
		this.setState( { comments: updatedComments, loading: false } );
		// console.log(`Comments after add:`, updatedComments);
	};
	
	// =============================================================
	
	handleEditComment = async event => {
		event.preventDefault();
		this.setState( { loading: true } );
		const newComment = window.prompt('Enter new comment text:', `${event.detail}`);
		if (newComment) {
			const updatedComments = await this.api.updateComment(event.target.comment.id, newComment);
			this.setState( { comments: updatedComments, loading: false } );
		}
	};

	// =============================================================
	
	handleRemoveComment = async event => {
		event.preventDefault();
		this.setState( { loading: true } );
		const confirmed = window.confirm(`Really delete "${event.detail}"?`);
		if (confirmed) {
			const updatedComments = await this.api.removeComment(event.target.comment.id);
			this.setState( { comments: updatedComments, loading: false } );
			// console.log(`Comments after remove:`, updatedComments);
		}
	};

	// =============================================================
}

// =============================================================
// =============================================================

export default MessageBoardApp;

// =============================================================
// =============================================================

