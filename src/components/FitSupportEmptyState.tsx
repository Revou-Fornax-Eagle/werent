import "./FitSupportEmptyState.css";

interface FitSupportEmptyStateProps {
    contactHref: string;
}

export default function FitSupportEmptyState({
    contactHref,
}: FitSupportEmptyStateProps) {
    return (
        <section className="fit-empty-state" aria-labelledby="fit-empty-state-title">
            <h3 id="fit-empty-state-title" className="fit-empty-state__title">
                Need help finding your fit?
            </h3>

            <p className="fit-empty-state__description">
                Fit information isn’t available for this product yet. Contact our
                customer support team for sizing advice.
            </p>

            <a className="fit-empty-state__cta" href={contactHref}>
                Contact customer support
            </a>
        </section>
    );
}