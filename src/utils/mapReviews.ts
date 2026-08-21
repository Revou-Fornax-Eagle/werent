export interface ApiReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  body: string;
  fitFeedback: string | null;
  createdAt: string;
}

export function mapApiReview(r: ApiReview) {
  return {
    // reviewerStats: "165 CM   65 KG   88 / 78 / 110 CM",
    reviewerStats: r.title,
    fitFeedback: r.fitFeedback,
    rating: r.rating,
    reviewText: r.body,
    date: new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    likeCount: 0, // placeholder — belum ada fitur like
  };
}
