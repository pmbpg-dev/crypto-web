import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header>
        <h1>Crypto App</h1>
        <h3>PMBPG</h3>
      </header>
      {children}
      <footer>
        <p>Hand coded by pmbpg</p>
      </footer>
    </>
  );
}

export default Layout;
