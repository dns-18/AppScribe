import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";

export default function PostForm({ post }) {
    const existingFeaturedImage = post?.FeaturedImage || post?.featuredImage;
    const [existingImageError, setExistingImageError] = useState(false);
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const selectedImage = watch("image")?.[0];
    const [selectedImagePreview, setSelectedImagePreview] = useState("");

    React.useEffect(() => {
        if (!selectedImage) {
            setSelectedImagePreview("");
            return;
        }

        const previewUrl = URL.createObjectURL(selectedImage);
        setSelectedImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [selectedImage]);

    const submit = async (data) => {
        setError("");
        setIsSubmitting(true);

        try {
            const image = data.image?.[0] || null;

            if (post) {
                const file = image ? await appwriteService.uploadFile(image, userData?.$id) : null;

                if (file && existingFeaturedImage) {
                    appwriteService.deleteFile(existingFeaturedImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    toast.success(post ? 'Post updated' : 'Post published');
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!image) {
                    throw new Error("Please select a featured image before submitting.");
                }

                const file = await appwriteService.uploadFile(image, userData?.$id);

                if (!file?.$id) {
                    throw new Error("Image upload failed. Please try again.");
                }

                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData?.$id,
                });

                if (dbPost) {
                    toast.success(post ? 'Post updated' : 'Post published');
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            setError(error.message || "Unable to save post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <Card>
            <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                <CardTitle>{post ? "Edit post" : "New post"}</CardTitle>
                <CardDescription>
                    Build a polished article with a clear title, strong imagery, and a clean reading experience.
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(submit)} className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
                    {error && (
                        <div className="lg:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
                            {error}
                        </div>
                    )}
                    <div className="space-y-5">
                        <Input
                            label="Title"
                            placeholder="Write a strong headline"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <p className="text-red-600 mb-4">Title is required.</p>}
                        <Input
                            label="Slug"
                            placeholder="Auto-generated from the title"
                            className="bg-slate-50 dark:bg-slate-800"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        {errors.slug && <p className="text-red-600 mb-4">Slug is required.</p>}
                        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <Input
                            label="Featured image"
                            type="file"
                            className="cursor-pointer bg-white dark:bg-slate-950"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {errors.image && <p className="text-red-600 mb-4">Featured image is required.</p>}
                        {selectedImagePreview && (
                            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                                <img
                                    src={selectedImagePreview}
                                    alt="Selected featured preview"
                                    className="h-[220px] w-full object-cover"
                                />
                            </div>
                        )}
                        {post && existingFeaturedImage && !existingImageError && (
                            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                                <img
                                    src={appwriteService.getFileView(existingFeaturedImage)}
                                    alt={post.title}
                                    className="max-h-[250px] w-full object-cover"
                                    onError={() => setExistingImageError(true)}
                                />
                            </div>
                        )}
                        {post && existingFeaturedImage && existingImageError && (
                            <p className="text-sm text-rose-600 dark:text-rose-300">Existing image could not be loaded.</p>
                        )}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="bg-white"
                            {...register("status", { required: true })}
                        />
                        <Button type="submit" variant={post ? "secondary" : "default"} className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : post ? "Update" : "Submit"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
