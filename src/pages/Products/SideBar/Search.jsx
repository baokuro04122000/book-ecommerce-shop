import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target[1].value;
    navigate('/products/search='+value)
  }
  return (
    <>
      <div className="tg-widget tg-widgetsearch">
        <form className="tg-formtheme tg-formsearch" onSubmit={handleSearch}>
          <div className="form-group">
            <button type="submit">
              <i className="icon-magnifier"></i>
            </button>
            <input
              type="search"
              name="search"
              className="form-group"
              placeholder="Search by name, author, key..."
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
