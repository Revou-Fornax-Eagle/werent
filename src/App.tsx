import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import designerImg from "./assets/designers/designer-banner.png";
import CheckoutBar from "./components/CheckoutBar";
import ProductPage, { type ReviewSubmitData } from "./components/ProductPage";
import { API_URL } from "./utils/api";
import type { Product, ProductResponse } from "./types/productData";
import { useRealtimeReviewCount } from "./hooks/useRealtimeReviewCount";
import "./App.css";
import { mapApiReview, type ApiReview } from "./utils/mapReviews";

function App() {
  const [product, setProduct] = useState<Product | null>(null);
  const [productResponse, setProductResponse] = useState<ProductResponse | null>(null);
  const PRODUCT_ID = "3a137a8b-da7a-4e26-a1e2-860c896ea42e";
  const USER_ID = "95cba87f-cb43-4552-9a00-0f7d4d9c62a5";

  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${PRODUCT_ID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProductResponse = await response.json();
        // console.log("Fetched product data:", data);
        setProductResponse(data);
        setProduct(data.data.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);

  //fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews/product/${PRODUCT_ID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched review data:", data);
        setReviews(data.data.reviews);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchReviews();
  }, []);
  const liveReviewCount = useRealtimeReviewCount(PRODUCT_ID, productResponse?.data.reviewCount ?? 0);
  const handleSubmitReview = async (data: ReviewSubmitData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: PRODUCT_ID,
          userId: USER_ID,
          rating: data.rating,
          title: data.title,
          body: data.body,
          fitFeedback: data.fitFeedback,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message ?? `HTTP error! status: ${response.status}`);
      }
      // count ter-update sendiri via socket listener (liveReviewCount)
      setReviews((prev) => [result.data.review, ...prev]);
    } catch (error) {
      console.error("Submit review failed:", error);
      setSubmitError(error instanceof Error ? error.message : "Gagal menyimpan review");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {/* <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section> */}

      <ProductPage
        heroImageUrl={heroImg}
        heroCredit="source: Amina Moroccan Abaya"
        title={product?.name ?? ""}
        rating={liveReviewCount > 0 ? 5 : 0}
        reviewCount={liveReviewCount}
        size="M"
        fabric="SILK"
        fit="TRUE TO SIZE"
        details={product?.description ?? ""}
        sizeGuide={[{ size: "M", bust: "78 cm", length: "89 cm" }]}
        designerName="Amina"
        designerImageUrl={designerImg}
        ratingBreakdown={[
          { label: "Small", percent: 2 },
          { label: "True to Size", percent: 85 },
          { label: "Large", percent: 13 },
        ]}
        reviews={reviews.map(mapApiReview)}
        submitting={isSubmitting}
        onViewSizeGuide={() => alert("View size guide")}
        onViewCollection={() => alert("View the collection")}
        onViewMoreReviews={() => alert("View more reviews")}
        onSubmitReview={handleSubmitReview}
      />

      {submitError && <p className="submit-error">Error: {submitError}</p>}

      <CheckoutBar price="Rp 300.000" duration="4 Day" onAdd={() => alert("Added to cart")} />

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
