import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { SOCKET_URL } from "../utils/api";

interface ReviewCountUpdatePayload {
  productId: string;
  reviewCount: number;
}

export function useRealtimeReviewCount(productId: string | undefined, initialCount: number): number {
  const [reviewCount, setReviewCount] = useState<number>(initialCount);
  useEffect(() => {
    setReviewCount(initialCount);
  }, [initialCount]);
  useEffect(() => {
    if (!productId) return;
    const socket: Socket = io(SOCKET_URL);
    socket.on("connect", () => {
      socket.emit("joinProductRoom", { productId });
    });
    socket.on("review_count_updated", (payload: ReviewCountUpdatePayload) => {
      if (payload.productId !== productId) return;
      setReviewCount(payload.reviewCount);
    });

    return () => {
      socket.emit("leaveProductRoom", { productId });
      socket.disconnect();
    };
  }, [productId]);
  return reviewCount;
}
