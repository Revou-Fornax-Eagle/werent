import "./FitDistributionScale.css";

export type FitScaleVariant = "mobile" | "sidebar";

interface FitDistributionScaleProps {
  runsSmall: number;
  trueToSize: number;
  runsLarge: number;
  totalVotes: number;
  loading?: boolean;
  variant?: FitScaleVariant;
  onSupportClick?: () => void;
}

const LABELS = {
  RUNS_SMALL: "Runs Small",
  TRUE_TO_SIZE: "True to Size",
  RUNS_LARGE: "Runs Large",
} as const;

type Bucket = keyof typeof LABELS;

const BUCKET_ORDER: Bucket[] = ["RUNS_SMALL", "TRUE_TO_SIZE", "RUNS_LARGE"];

const TIE_BREAK_ORDER: Bucket[] = ["TRUE_TO_SIZE", "RUNS_SMALL", "RUNS_LARGE"];

const clampCount = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0);

const clampCenter = (value: number) => Math.min(88, Math.max(12, value));

export default function FitDistributionScale({
  runsSmall,
  trueToSize,
  runsLarge,
  totalVotes,
  loading,
  variant = "mobile",
  onSupportClick,
}: FitDistributionScaleProps) {
  if (loading) {
    return (
      <div className="fit-scale fit-scale--skeleton" data-variant={variant} aria-busy="true" aria-label="Loading fit distribution">
        <div className="fit-scale__skel fit-scale__skel--header" />
        <div className="fit-scale__skel fit-scale__skel--badge" />
        <div className="fit-scale__skel fit-scale__skel--pointer" />
        <div className="fit-scale__skel fit-scale__skel--track" />
        <div className="fit-scale__skel fit-scale__skel--labels" />
      </div>
    );
  }

  const counts: Record<Bucket, number> = {
    RUNS_SMALL: clampCount(runsSmall),
    TRUE_TO_SIZE: clampCount(trueToSize),
    RUNS_LARGE: clampCount(runsLarge),
  };

  const votes = clampCount(totalVotes);
  const total = counts.RUNS_SMALL + counts.TRUE_TO_SIZE + counts.RUNS_LARGE;

  if (votes <= 0 || total <= 0) {
    return (
      <div className="fit-scale" data-variant={variant}>
        <div className="fit-scale__header">
          <span className="fit-scale__title">FITTING</span>
        </div>
        <p className="fit-scale__empty-title">No fit data yet</p>
        <p className="fit-scale__empty-text">
          Renters have not shared how this item fits yet. Get in touch with our customer support to discuss the fitting.
        </p>
        <button type="button" className="fit-scale__support" onClick={onSupportClick}>
          Discuss with customer support
        </button>
      </div>
    );
  }

  const percents: Record<Bucket, number> = {
    RUNS_SMALL: (counts.RUNS_SMALL / total) * 100,
    TRUE_TO_SIZE: (counts.TRUE_TO_SIZE / total) * 100,
    RUNS_LARGE: (counts.RUNS_LARGE / total) * 100,
  };

  const dominant = TIE_BREAK_ORDER.reduce<Bucket>(
    (best, bucket) => (counts[bucket] > counts[best] ? bucket : best),
    BUCKET_ORDER[0],
  );

  let acc = 0;
  const centers = {} as Record<Bucket, number>;
  for (const bucket of BUCKET_ORDER) {
    centers[bucket] = acc + percents[bucket] / 2;
    acc += percents[bucket];
  }

  const dominantCenter = clampCenter(centers[dominant]);

  const trackLabel = `Fit distribution from ${votes} votes: ${LABELS.RUNS_SMALL} ${Math.round(percents.RUNS_SMALL)} percent, ${LABELS.TRUE_TO_SIZE} ${Math.round(percents.TRUE_TO_SIZE)} percent, ${LABELS.RUNS_LARGE} ${Math.round(percents.RUNS_LARGE)} percent. Most renters say ${LABELS[dominant]}.`;

  return (
    <div className="fit-scale" data-variant={variant}>
      <div className="fit-scale__header">
        <span className="fit-scale__title">FITTING</span>
        <span className="fit-scale__votes">{votes} VOTES</span>
      </div>

      <span className="fit-scale__assessment">{LABELS[dominant]}</span>

      <div className="fit-scale__pointer-zone" aria-hidden="true">
        <span className="fit-scale__pointer" style={{ left: `${dominantCenter}%` }} />
      </div>

      <div className="fit-scale__track" role="img" aria-label={trackLabel}>
        {BUCKET_ORDER.map((bucket) => (
          <span
            key={bucket}
            className={`fit-scale__segment${bucket === dominant ? " fit-scale__segment--dominant" : ""}`}
            style={{ flexGrow: percents[bucket] }}
          />
        ))}
      </div>

      <div className="fit-scale__labels">
        {BUCKET_ORDER.map((bucket) => (
          <div
            key={bucket}
            className={`fit-scale__label${bucket === dominant ? " fit-scale__label--dominant" : ""}`}
            style={{ left: `${clampCenter(centers[bucket])}%` }}
          >
            <span className="fit-scale__label-name">{LABELS[bucket]}</span>
            <span className="fit-scale__label-percent">{Math.round(percents[bucket])}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
