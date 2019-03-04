// =============================================================
// =============================================================

/**
 * Promise version of setTimeout function (uses setTimeout)
 * @param {number} ms Time to wait in milliseconds
 * @returns {Promise}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================================
// =============================================================

class MessageBoardAPI {
  constructor(comments = []) {
    this.comments = comments;
  }

  // =============================================================

  /**
   * Returns all comments
   * @returns {Promise<array>}
   */
  getComments() {
    return fetch(
      'https://ssaksfithian-express-codealong.herokuapp.com/api/comments',
    ).then(response => response.json());
  }

  // =============================================================

  /**
   * Adds a new comment to the comments array
   * @param {string} text Text for our new comment
   * @returns {Promise<array>} Updated comments array
   */
  addComment(text) {
    const body = { text };
    return fetch(
      'https://ssaksfithian-express-codealong.herokuapp.com/api/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    ).then(response => response.json());
  }

  // =============================================================

  /**
   * Updates comment text
   * @param {number} id Unique Id for comment
   * @param {string} text Updated comment text
   * @returns {Promise<array>} Updated comments array
   */
  updateComment(id, text) {
    // this.comments.find(comment => comment.id === id).text = text;
    // return wait(1000).then(() => this.comments);
    const body = { text };
    return fetch(
      `https://ssaksfithian-express-codealong.herokuapp.com/api/comments/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    ).then(response => response.json());
  }

  // =============================================================

  /**
   * Removes comment from the list
   * @param {number} id Unique Id for comment to be removed
   * @returns {Promise<array>} Updated comments array
   */
  removeComment(id) {
    return fetch(
      `https://ssaksfithian-express-codealong.herokuapp.com/api/comments/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(response => response.json());
  }

  // =============================================================

  /**
   * Lists comments sorted by timestamp in desc or asc order
   * @param {boolean} orderAsc If true sorts by oldest to newest, else sorts newest to oldest
   *  @returns {Promise<array>} Sorted array of comment objects
   */
  getCommentsSortedByTime(orderAsc = true) {
    const clonedComments = JSON.parse(JSON.stringify(this.comments));
    clonedComments.sort((lhs, rhs) => {
      if (orderAsc) {
        return lhs.timestamp < rhs.timestamp ? -1 : 1;
      }
      return lhs.timestamp < rhs.timestamp ? 1 : -1;
    });
    return wait(1000).then(() => clonedComments);
  }

  // =============================================================

  /**
   * Lists comments sorted by comment text in desc or asc order
   * @param {boolean} orderAsc If true sorts A to Z, else sorts Z to A
   *  @returns {Promise<array>} Sorted array of comment objects
   */
  getCommentsSortedByAlpha(orderAsc = true) {
    const clonedComments = JSON.parse(JSON.stringify(this.comments));
    clonedComments.sort((lhs, rhs) => {
      if (orderAsc) {
        return lhs.text < rhs.text ? -1 : 1;
      }
      return lhs.text < rhs.text ? 1 : -1;
    });
    return wait(1000).then(() => clonedComments);
  }

  // =============================================================

  /**
   * Filters comments by a substring contained in the text
   * @param {string} substring Substring to be filtered
   * @returns {Promise<array>} Filtered array of comment objects
   */
  filterCommentsByText(substring = '') {
    return wait(1000).then(() =>
      this.comments.filter(comment =>
        comment.text.toLowerCase().includes(substring.toLowerCase()),
      ),
    );
  }
}

// =============================================================
// =============================================================

export default MessageBoardAPI;

// =============================================================
// =============================================================

// Use this comment data for testing
export const commentData = [
  {
    text: 'Love this!',
    id: 5,
    timestamp: 1549581565,
  },
  {
    text: 'Super good',
    id: 4,
    timestamp: 1549577965,
  },
  {
    text: 'You are the best',
    id: 3,
    timestamp: 1549495165,
  },
  {
    text: 'Ramen is my fav food ever',
    id: 2,
    timestamp: 1548976765,
  },
  {
    text: 'Nice Nice Nice!',
    id: 1,
    timestamp: 1546903165,
  },
];

// =============================================================
// =============================================================
