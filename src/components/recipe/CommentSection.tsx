"use client";

import { useState } from "react";
import { MessageCircle, Send, ChefHat } from "lucide-react";
import { Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  comments: Comment[];
  recipeId: string;
}

export function CommentSection({ comments, recipeId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call for Phase 1
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNewComment("");
    setIsSubmitting(false);
    // In Phase 2, this will actually post the comment
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-heading text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-terracotta" />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-parchment-dark flex items-center justify-center flex-shrink-0">
            <span className="text-charcoal-light font-medium text-sm">You</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts or ask a question..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-parchment-dark bg-parchment focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all resize-none"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-terracotta hover:bg-terracotta-dark disabled:bg-terracotta-light text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-parchment-dark pb-6 last:border-0 last:pb-0">
              {/* User Comment */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sage font-medium text-sm">
                    {comment.user.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-charcoal">
                      {comment.user.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-charcoal-light">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-charcoal">{comment.content}</p>
                </div>
              </div>

              {/* Admin Reply */}
              {comment.adminReply && (
                <div className="mt-4 ml-13 pl-6 border-l-2 border-terracotta">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center flex-shrink-0">
                      <ChefHat className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-terracotta">Chef Sarah</span>
                        <span className="text-xs bg-terracotta/10 text-terracotta px-2 py-0.5 rounded">
                          Admin
                        </span>
                        {comment.adminReplyAt && (
                          <span className="text-xs text-charcoal-light">
                            {formatDistanceToNow(comment.adminReplyAt, { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      <p className="text-charcoal">{comment.adminReply}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-charcoal-light py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </div>
  );
}
