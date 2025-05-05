import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddReviewMutation } from '@/lib/features/reviewApi/productReviewSlice';

const AddReviewModal = ({ isModalOpen, setIsModalOpen, productId, productName }) => {
    const [newReview, setNewReview] = useState({
        author: "",
        rating: 5,
        comment: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [addReview, { isLoading }] = useAddReviewMutation();

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const payload = {
                productId,
                stars: newReview.rating,
                description: newReview.comment,
                author: newReview.author, // Include if your API supports it
            };
            await addReview(payload).unwrap();
            setSuccessMsg("Review added successfully!");
            setNewReview({ author: "", rating: 5, comment: "" });

            setTimeout(() => {
                setSuccessMsg("");
                setIsModalOpen(false);
            }, 1500);
        } catch (err) {
            const errMsg = err?.data?.message || "Failed to add review.";
            setErrorMsg(errMsg);
            setTimeout(() => setErrorMsg(""), 2000);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button>Add Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Your Review</DialogTitle>
                    <DialogDescription>
                        Share your thoughts about the {productName}.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={newReview.author}
                            onChange={(e) =>
                                setNewReview({ ...newReview, author: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="rating">Rating</Label>
                        <select
                            id="rating"
                            value={newReview.rating}
                            onChange={(e) =>
                                setNewReview({
                                    ...newReview,
                                    rating: Number.parseInt(e.target.value),
                                })
                            }
                            className="w-full border rounded-md p-2"
                            required
                        >
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating} Star{rating !== 1 ? "s" : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="comment">Review</Label>
                        <Textarea
                            id="comment"
                            value={newReview.comment}
                            onChange={(e) =>
                                setNewReview({ ...newReview, comment: e.target.value })
                            }
                            required
                        />
                    </div>

                    {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
                    {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit Review"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddReviewModal;
