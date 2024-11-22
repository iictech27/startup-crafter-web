import React, { useState } from "react";
import ReplySection from "./ReplySection";

export default function BlogComments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Michael Gough",
      date: "Feb. 8, 2022",
      text: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
      likes: 0,
      dislikes: 0,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "Anonymous",
          date: new Date().toLocaleDateString(),
          text: newComment,
          likes: 0,
          dislikes: 0,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <section className="bg-white py-8 lg:py-16 antialiased">
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            {comments.length} Comments
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleAddComment}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setNewComment("")}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-blue-700 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-blue-700 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Comment
            </button>
          </div>
        </form>
        {comments.map((comment) => (
          <ReplySection
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        ))}
      </div>
    </section>
  );
}
