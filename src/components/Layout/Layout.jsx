import AppBar from "../AppBar/AppBar";
import css from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={css.div}>
      <AppBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;