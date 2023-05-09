const Search = () => {
  return (
    <>
      <div className="tg-widget tg-widgetsearch">
        <form className="tg-formtheme tg-formsearch">
          <div className="form-group">
            <button type="submit">
              <i className="icon-magnifier"></i>
            </button>
            <input
              type="search"
              name="search"
              className="form-group"
              placeholder="Search by title, author, key..."
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
