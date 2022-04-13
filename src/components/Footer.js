import '../styles/Footer.css';

function Footer() {
    return (
        <footer>
            <div>
                Application made by{' '}
                <a href="https://sheacronin.github.io/">Shea Cronin</a>.
            </div>
            <a href="https://sheacronin.github.io/blog-viewing">
                View Blog Posts
            </a>
            <div>
                Repositorites:{' '}
                <a href="https://github.com/sheacronin/blog-api">API</a> |{' '}
                <a href="https://github.com/sheacronin/blog-viewing">
                    Bloggit View
                </a>{' '}
                |{' '}
                <a href="https://github.com/sheacronin/blog-authoring">
                    Bloggit Author
                </a>
            </div>
        </footer>
    );
}

export default Footer;
