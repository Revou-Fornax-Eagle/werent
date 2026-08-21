import { useEffect, useState } from "react";
import heroImg from "./assets/product-image.webp";
import CheckoutBar from "./components/CheckoutBar";
import ProductPage, { type ReviewSubmitData } from "./components/ProductPage";
import { API_URL } from "./utils/api";
import { type FitAssessment, type Product, type ProductResponse } from "./types/productData";
import { useRealtimeReviewCount } from "./hooks/useRealtimeReviewCount";
import "./App.css";
import { mapApiReview, type ApiReview } from "./utils/mapReviews";

// Falls back here when the URL has no /products/:id segment (e.g. bare "/").
const DEFAULT_PRODUCT_ID = "8e8ed7ea-c51e-488e-a30b-b15b899aed0f"; // Kemeja Linen Oversize (seeded)
const DEFAULT_USER_ID = "f2587cb1-4951-4cbb-9958-10dbe275dec6";

/** REV-26: product id comes from the URL path, so navigating to a different
 * /products/:id fetches a different product instead of always the same one. */
function getProductIdFromPath(): string {
  const match = window.location.pathname.match(/^\/products\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : DEFAULT_PRODUCT_ID;
}

function getUserIdFromPath(): string {
  const match = window.location.pathname.match(/\/users\/([^/]+)/);
  console.log(match ? decodeURIComponent(match[1]) : "gagal");
  return match ? decodeURIComponent(match[1]) : DEFAULT_USER_ID;
}

function App() {
  const [product, setProduct] = useState<Product | null>(null);
  const [productResponse, setProductResponse] = useState<ProductResponse | null>(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const PRODUCT_ID = getProductIdFromPath();
  const USER_ID = getUserIdFromPath(); // dewi@example.com (seeded)

  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [fitAssesment, setFitAssesment] = useState<FitAssessment | null>(null);
  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/products/${PRODUCT_ID}`);
      if (response.status === 404) {
        setProductNotFound(true);
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProductNotFound(false);
      const data: ProductResponse = await response.json();
      console.log("Fetched product data:", data);
      setProductResponse(data);
      setProduct(data.data.product);
      setFitAssesment(data.data.fitAssessment);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  // fetch product
  useEffect(() => {
    fetchProduct();
  }, [PRODUCT_ID]);

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
      //re fetch producst for simulate real-time
      // label percentage on fit feedback
      await fetchProduct();
      return true;
    } catch (error) {
      console.error("Submit review failed:", error);
      setSubmitError(error instanceof Error ? error.message : "Gagal menyimpan review");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const processFitPercentage = (totalResponse: number, distribution: number): number => {
    return Number(((distribution / totalResponse) * 100).toFixed(2));
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

      {productNotFound && <p className="submit-error">Product not found for id "{PRODUCT_ID}".</p>}

      <ProductPage
        heroImageUrl={heroImg}
        heroCredit=""
        title={product?.name ?? ""}
        rating={liveReviewCount > 0 ? 5 : 0}
        reviewCount={liveReviewCount}
        fitAssessment={productResponse?.data.fitAssessment}
        supportContactHref="mailto:support@werent.id?subject=Product%20fit%20consultation"
        size="M"
        fabric="SILK"
        fit={fitAssesment?.assessment ?? ""}
        details={product?.description ?? ""}
        sizeGuide={[{ size: "M", bust: "78 cm", length: "89 cm" }]}
        ratingBreakdown={[
          { label: "Small", percent: processFitPercentage(fitAssesment?.totalResponses ?? 0, fitAssesment?.distribution.RUNS_SMALL ?? 0) },
          { label: "True to Size", percent: processFitPercentage(fitAssesment?.totalResponses ?? 0, fitAssesment?.distribution.TRUE_TO_SIZE ?? 0) },
          { label: "Large", percent: processFitPercentage(fitAssesment?.totalResponses ?? 0, fitAssesment?.distribution.RUNS_LARGE ?? 0) },
        ]}
        reviews={reviews.map(mapApiReview)}
        submitting={isSubmitting}
        submitError={submitError}
        onViewSizeGuide={() => alert("View size guide")}
        onViewCollection={() => alert("View the collection")}
        onViewMoreReviews={() => alert("View more reviews")}
        onSubmitReview={handleSubmitReview}
      />

      <CheckoutBar price="Rp 300.000" duration="4 Day" onAdd={() => alert("Added to cart")} />
      {/* 
      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section> */}
    </>
  );
}

export default App;
