import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";
import type { ProductResponse } from "../types/productData";

export interface FitAssessmentData {
  runsSmall: number;
  trueToSize: number;
  runsLarge: number;
  totalVotes: number;
  loading: boolean;
}

const EMPTY: FitAssessmentData = {
  runsSmall: 0,
  trueToSize: 0,
  runsLarge: 0,
  totalVotes: 0,
  loading: true,
};

export function useFitAssessment(productId: string | undefined) {
  const [data, setData] = useState<FitAssessmentData>(EMPTY);

  useEffect(() => {
    if (!productId) {
      setData((prev) => ({ ...prev, loading: false }));
      return;
    }

    let active = true;
    setData((prev) => ({ ...prev, loading: true }));

    const fetchFit = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ProductResponse = await response.json();
        if (!active) return;
        const fit = result.data.fitAssessment;
        setData({
          runsSmall: fit.distribution.RUNS_SMALL,
          trueToSize: fit.distribution.TRUE_TO_SIZE,
          runsLarge: fit.distribution.RUNS_LARGE,
          totalVotes: fit.totalResponses,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching fit assessment:", error);
        if (!active) return;
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchFit();

    return () => {
      active = false;
    };
  }, [productId]);

  return data;
}
