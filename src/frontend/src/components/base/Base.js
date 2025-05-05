import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Base({ title = 'Cruise-literature', children }) {
    return (
        <HelmetProvider>
            <>
                <div className="min-h-screen bg-background-light text-light dark:bg-background-dark dark:text-dark p-8 transition-colors duration-300">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{title}</title>
                        <meta name="description" content="" />
                        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link
                            rel="stylesheet"
                            href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
                        />
                        <link rel="stylesheet" type="text/css" href="/static/css/style.css" />
                        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
                    </Helmet>
                    <Header />
                    {children}
                    <Footer />
                </div>
            </>
        </HelmetProvider>
    );
}

export default Base;
