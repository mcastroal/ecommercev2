import "./Footer.css"
export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Dinoco</p>
      <div className="links" >
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}
