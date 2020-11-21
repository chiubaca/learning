const { Octokit } = require("@octokit/rest");

if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
})

function currentDateStamp (){
    const dateObj = new Date();
    const date = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    return year +  month  + date;
}

async function main() {
  try {
    const buffContent = Buffer.from("no entry yet", 'utf-8');
    const contentEncoded =  buffContent.toString('base64');
    const currentDate = currentDateStamp()
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: "chiubaca",
      repo: "learning",
      path: `journal/${currentDate}.md`,
      message: `Create ${currentDate}.md`,
      content: contentEncoded,
      committer: {
        name: process.env.NAME,
        email: process.env.EMAIL,
      },
      author: {
        name: process.env.NAME,
        email: process.env.EMAIL,
      },
    })

    console.log("Created placeholder journal", data)
  } catch (err) {
    console.error("Something went wrong",err)
  }
}

main()