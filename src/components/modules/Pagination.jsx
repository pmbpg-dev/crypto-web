import styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  //=================events=================
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  const selectPageHandler = (e) => {
    const pageNum = +e.target.innerText;
    setPage(pageNum);
  };
  //===================jsx=====================
  return (
    <div className={styles.container}>
      <button
        onClick={previousHandler}
        className={page === 1 ? styles.disabled : null}
      >
        previous
      </button>
      <p
        className={page === 1 ? styles.selected : null}
        onClick={selectPageHandler}
      >
        1
      </p>
      <p
        className={page === 2 ? styles.selected : null}
        onClick={selectPageHandler}
      >
        2
      </p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={styles.selected}>{page}</p>
        </>
      )}
      <span>...</span>
      <p
        className={page === 9 ? styles.selected : null}
        onClick={selectPageHandler}
      >
        9
      </p>
      <p
        className={page === 10 ? styles.selected : null}
        onClick={selectPageHandler}
      >
        10
      </p>

      <button
        onClick={nextHandler}
        className={page === 10 ? styles.disabled : null}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
