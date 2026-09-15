import { LoaderCircle } from 'lucide-react';
import './Loading.css';

export default function Loading({ isLoading, message = 'Loading...' }) {
    if (!isLoading) {
        return null;
    }

    return (
        <div className="loading-overlay" role="status" aria-live="polite">
            <div className="loading-popup">
                <LoaderCircle className="loading-spinner" size={150} aria-hidden="true" />
                <span>{message}</span>
            </div>
        </div>
    );
}