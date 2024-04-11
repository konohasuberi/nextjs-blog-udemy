import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getPostsData } from "../lib/post";
import Head from "next/head";
import Image from "next/image";

// SSGの場合
// 外部からデータを一回だけ撮ってくる => getStaticPropsを使う。next側で用意されている関数
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id date title thumbnail
  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: 
//   };

// }


export default function Home({ allPostsData }) {
  return (
    // homeがあることで、他のページとは違い、画像が大きくできている
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          こんにちは〜！
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image src={`${thumbnail}`}
                  width={950}
                  height={400}
                  className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}> 
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>  
      </section>
    </Layout>   
  );
}
