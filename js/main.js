// =============================================================
// =============================================================
// Main code to set everything up

// Imports
import MessageBoardApp from './components/MessageBoardApp.js';
import CommentList from './components/CommentList.js';
import CommentItem from './components/CommentItem.js';

// =============================================================

// Custom Element definitions
customElements.define('message-board-app', MessageBoardApp);
customElements.define('message-board-comment-list', CommentList);
customElements.define('message-board-comment-item', CommentItem);

// =============================================================
// =============================================================

