import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/* process.cwd()がカレントディレクトリ */
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータをとりだす
export function getPostsData() {
    // posts配下のファイル名を、オブジェクトとして返す
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); //　ファイル名

        // マークダウンファイルを文字列として読みとる
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        // idとデータを返す
        return {
            id,
            ...matterResult.data,
        }
    });
    return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                // ここのidは、[id].jsのidと一致させるため！
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

/*
    [
        params: {
            id: "ssg-ssr"
        },
        
    ]
 */


// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);

    console.log(fullPath)
    const fileContent = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContent);
    

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHtml = blogContent.toString();

    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    }
}