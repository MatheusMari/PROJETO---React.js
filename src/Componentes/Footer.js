import React from "react";
import "../CSS/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    &copy; {new Date().getFullYear()} Recipe Haven. Todos os
                    direitos reservados.
                </p>
                <nav className="footer-nav">
                    <a href="#sobre" className="footer-link">
                        Sobre
                    </a>
                    <a href="#contato" className="footer-link">
                        Contato
                    </a>
                    <a href="#privacidade" className="footer-link">
                        Política de Privacidade
                    </a>
                </nav>
            </div>
            <div className="footer-socials">
                <a
                    href="https://facebook.com"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Facebook
                </a>
                <a
                    href="https://instagram.com"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
                <a
                    href="https://twitter.com"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>
            </div>
        </footer>
    );
}

export default Footer;
