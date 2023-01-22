import Head from "next/head";
import { useRouter } from "next/router";

const Meta = ({ title, keywords, description }) => {
  const { locale } = useRouter();
  const NunitoFont = () => {
    return (
      <link
        // type="text/css"
        href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
        rel="stylesheet"
      ></link>
    );
  };
  const ArabicFont = () => {
    return (
      <link
        // type="text/css"
        href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap"
        rel="stylesheet"
      ></link>
    );
  };
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" type="image/x-icon" href="/flower.png" />
      {locale === "ar" ? <ArabicFont /> : <NunitoFont />}
      <title>{title}</title>
    </Head>
  );
};
Meta.defaultProps = {
  title: "Shopping",
  keywords: "testing",
  description: "The best place to get what you want",
};

export default Meta;
