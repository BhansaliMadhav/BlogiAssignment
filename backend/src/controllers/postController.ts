import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const posts = await prisma.post.findMany({ where: { authorId: userId } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts", error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const userId = (req as any).user.id;

    const newPost = await prisma.post.create({
      data: { title, content, authorId: userId },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;

    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost || existingPost.authorId !== userId) {
      res.status(403).json({ error: "Not allowed to modify this post" });
      return;
    }

    await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost || existingPost.authorId !== userId) {
      res.status(403).json({ error: "Not allowed to delete this post" });
      return;
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
