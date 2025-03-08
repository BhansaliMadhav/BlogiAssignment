"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(false); // <-- Added state

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/posts/", {
          credentials: "include",
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [refreshTrigger]); // <-- Depend on refreshTrigger

  // Open create/edit post modal
  const openDialog = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setForm({ title: post.title, content: post.content });
    } else {
      setEditingPost(null);
      setForm({ title: "", content: "" });
    }
    setShowDialog(true);
  };

  // Handle post submission (create/update)
  const handleSubmit = async () => {
    const url = editingPost
      ? `http://localhost:5000/api/posts/${editingPost.id}`
      : "http://localhost:5000/api/posts/";
    const method = editingPost ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setShowDialog(false);
        setRefreshTrigger((prev) => !prev); // <-- Trigger refresh
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Delete post
  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setRefreshTrigger((prev) => !prev); // <-- Trigger refresh
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button onClick={() => openDialog()}>+ New Post</Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={() => openDialog(post)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No posts found. Create one!</p>
        )}
      </div>

      {/* Modal Dialog for Create/Edit Post */}
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <h2 className="text-xl font-bold">
              {editingPost ? "Edit Post" : "Create Post"}
            </h2>
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <Button onClick={handleSubmit}>
              {editingPost ? "Update" : "Create"}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
