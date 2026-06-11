export default function App({ Component, pageProps }) {
  return <>
    <style>{`*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}body{min-height:100vh}`}</style>
    <Component {...pageProps} />
  </>;}
