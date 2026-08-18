export type ProductCategory = "men" | "women";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export type FitAssessmentType = "RUNS_SMALL" | "TRUE_TO_SIZE" | "RUNS_LARGE";

export interface FitDistribution {
  RUNS_SMALL: number;
  TRUE_TO_SIZE: number;
  RUNS_LARGE: number;
}

export interface FitAssessment {
  assessment: FitAssessmentType;
  distribution: FitDistribution;
  totalResponses: number;
  hasData: boolean;
}

export interface ProductData {
  product: Product;
  reviewCount: number;
  fitAssessment: FitAssessment;
}

export interface ProductResponse {
  success: boolean;
  data: ProductData;
  meta: Record<string, unknown>;
}
