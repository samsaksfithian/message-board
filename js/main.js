//=============================================================
//=============================================================
// Main code to set everything up

// Imports
import MessageBoard from './components/MessageBoard.js';
import Comments from './components/Comments.js';
import Comment from './components/Comment.js';

//=============================================================

// Custom Element definitions
customElements.define('message-board', MessageBoard);
customElements.define('message-board-comments', Comments);
customElements.define('message-board-comment', Comment);

//=============================================================
//=============================================================


