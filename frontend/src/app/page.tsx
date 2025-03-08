"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  author: { username: string };
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/check-auth",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch {
        console.log("User Authentication failed");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Platform</h1>
        {!isAuthenticated && (
          <Button onClick={() => router.push("/auth")}>Login / Register</Button>
        )}
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              className="shadow-md hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  By <span className="font-medium">{post.author.username}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(post.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Updated: {new Date(post.updatedAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}
