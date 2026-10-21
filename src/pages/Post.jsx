import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import parse from "html-react-parser";
import { pickCover } from "../lib/covers";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const postUserId = post?.UserId || post?.userId;
    const isAuthor = post && userData ? postUserId === userData.$id || !postUserId : false;
    const featuredImage = post?.FeaturedImage || post?.featuredImage;

    useEffect(() => {
        setImageError(false);

        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if (featuredImage) {
                    appwriteService.deleteFile(featuredImage);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <motion.div
            className="py-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <Container>
                <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] animate-scale-in dark:border-slate-800 dark:bg-slate-900/90">
                    {featuredImage && !imageError ? (
                        <img
                            src={appwriteService.getFileView(featuredImage)}
                            alt={post.title}
                            className="max-h-[620px] w-full rounded-[1.5rem] object-cover transition-transform duration-700 hover:scale-[1.01]"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <img
                            src={pickCover(post.$id || post.title || '')}
                            alt=""
                            className="h-[320px] w-full rounded-[1.5rem] object-cover"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mb-6 max-w-4xl animate-fade-up">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">Post detail</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{post.title}</h1>
                </div>
                <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-10 animate-fade-up stagger-1">
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                </div>
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete this post?</DialogTitle>
                            <DialogDescription>
                                {`This permanently deletes "${post.title}" and cannot be undone.`}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setConfirmOpen(false);
                                    deletePost();
                                }}
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Container>
        </motion.div>
    ) : null;
}
