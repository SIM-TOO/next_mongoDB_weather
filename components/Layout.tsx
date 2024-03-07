import Head from "next/head";
import React, { ReactNode } from "react";
import Card from "./Card";

const Layout = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Nextjs weather app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Card className={className}>{children}</Card>
      </main>
    </>
  );
};

export default Layout;
