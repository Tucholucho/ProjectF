import "./searchbar.modules.css"

export default function SearchBar(props){
    const {
        onSearch,
        diets,
        handleInputChange,
        onFilterSelect,
        onSelect,
        search,
    } = props;

    return(
        <div className="searchContainer">
            <div className="searchDiv">
                <label htmlFor="search">Search </label>
                <input
                    value={search}
                    type="text"
                    name="search"
                    id="search"
                    className="input"
                    placeholder= "Search a Recipe"
                    onChange={handleInputChange}
                />
                <button className="button" onClick={() => onSearch(search)}>
                    <span>Search </span>
                </button>
            </div>
            <div className="filterDiv">
                <span>Order by</span>
                <select name="by" className="input" onChange={onSelect}>
                    <option value="Alphabetical">Alphabetical</option>
                    <option value="HealthScore">Heatlth Score</option>
                </select>
                <select name="order" className="input" oneChange={onSelect}>
                    <option value="Ascendant">Ascendant</option>
                    <option value="Decendant">Descendant</option>
                </select>
                <label htmlFor="diets">Filteres by Diets</label>
                <select name="diets" className="input" onChange={onFilterSelect}>
                    {diets.map((d,i) =>{
                        <option key={i} value={`${d}`}>
                            {d}
                        </option>
                    })}
                </select>
            </div>
        </div>
    );
}