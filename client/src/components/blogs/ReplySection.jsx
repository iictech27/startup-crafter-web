import React, { useState } from "react";

export default function CommentSection({ comment, comments, setComments }) {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === comment.id
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: c.replies.length + 1,
                    author: "Anonymous",
                    date: new Date().toLocaleDateString(),
                    text: replyText,
                    likes: 0,
                    dislikes: 0,
                  },
                ],
              }
            : c,
        ),
      );
      setReplyText("");
      setIsReplying(false);
    }
  };

  const handleLikeDislike = (commentId, replyId = null, type) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          if (replyId === null) {
            return {
              ...c,
              likes: type === "like" ? c.likes + 1 : c.likes,
              dislikes: type === "dislike" ? c.dislikes + 1 : c.dislikes,
            };
          } else {
            return {
              ...c,
              replies: c.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: type === "like" ? reply.likes + 1 : reply.likes,
                      dislikes:
                        type === "dislike"
                          ? reply.dislikes + 1
                          : reply.dislikes,
                    }
                  : reply,
              ),
            };
          }
        }
        return c;
      }),
    );
  };

  return (
    <article className="p-6 text-base bg-white rounded-lg mb-4">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt={comment.author}
            />
            {comment.author}
          </p>
          <p className="text-sm text-gray-600">
            <time dateTime={comment.date}>{comment.date}</time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500">{comment.text}</p>
      <div className="flex items-center mt-4 space-x-4">
        <i className="fa-solid fa-thumbs-up mr-2 text-base text-gray-500 hover:text-gray-700"></i>
        <i className="fa-solid fa-thumbs-down mr-2 text-base text-gray-500 hover:text-gray-700"></i>
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline font-medium"
          onClick={() => setIsReplying(!isReplying)}
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div>
      {isReplying && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 text-sm border border-gray-200 rounded-lg"
            rows="3"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="mt-2 inline-flex items-center py-1.5 px-3 text-xs font-medium text-center text-blue-700 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            onClick={handleReply}
          >
            Submit Reply
          </button>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="p-4 bg-gray-100 rounded-lg">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                    <img
                      className="mr-2 w-4 h-4 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt={reply.author}
                    />
                    {reply.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    <time dateTime={reply.date}>{reply.date}</time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500">{reply.text}</p>
              <div className="flex items-center mt-2 space-x-4">
                <i
                  className="fa-solid fa-thumbs-up mr-2 text-base text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    handleLikeDislike(comment.id, reply.id, "like")
                  }
                ></i>{" "}
                {reply.likes}
                <i
                  className="fa-solid fa-thumbs-down mr-2 text-base text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    handleLikeDislike(comment.id, reply.id, "dislike")
                  }
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
