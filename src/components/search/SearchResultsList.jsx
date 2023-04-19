import "./Search.scss";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return <SearchResult result={result.phone} key={id} />;
            })}
        </div>
    );
};