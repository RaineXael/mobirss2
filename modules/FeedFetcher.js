import { storeData } from "./DataManager";

const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

/**
 * Fetches and returns an object representation of an RSS Feed 
 * @param {string} link Link of the RSS feed to fetch 
 * @returns An object representation of the feed, an empty object if not found
 */
export async function fetchFeed(link) {

  console.log('Attepting to fetch feed ' + link)
  try {
    const xmlResp = await fetch(link);
    console.log(xmlResp.resp);
    console.log('Feed fetched, parsing XML');
    const xmlString = await xmlResp.text();
    //validate rss
    console.log('XML parsed');
    return parseXML(xmlString);
  }
  catch (e) {
    console.error(e)
    return null;
  }
};

export function parseXML(xmlString) {
  return parser.parse(xmlString).rss.channel;
}

/**
 * Processes raw feed JSON data into the 3 parts mentioned in the
 * savedate-logic-md. They will be returned as an object array.
 * @param {string} feedJSON 
 * @returns [FeedJSON to be added to global list, 
 * array of article metadata to be added individually.]
 */
export function processFeed(feedJSON) {
  //should replace description with content:endcoded:,
  //idk how it works exactly so I'll leave for later
  const articleData = feedJSON.item.map(art => {
    return {
      title: art.title,
      link: art.link,
      pubDate: art.pubDate,
      unread: true
    }
  })
  const feedData = {
    title: feedJSON.title,
    link: feedJSON.link,
    description: feedJSON.description,
    feedLink: feedJSON.feedLink,
    lastBuildDate: feedJSON.lastBuildDate,
  }


  return {
    feed: feedData,
    articleList: articleData,
    articles: feedJSON.item
  }
}

export async function refreshFeed(originalJSON, feedURL) {

  const additionsToArticleList = []
  const processedFeed = await processFeed(await fetchFeed(feedURL))
  const feedData = processedFeed.articles
  const feedArticleList = processedFeed.articleList
  const articleTitles = originalJSON.map((article) => article.title)
  console.log(feedData)

  //Comparison
  for (const element of feedData) {
    if (!articleTitles.includes(element.title)) {
      //Example key: https://sdamned.com/comic/rsshttps://www.sdamned.com/comic/1130 <-- rss url + article link
      await storeData(feedURL + element.link, element); //promise to save article data to proper URL
      additionsToArticleList.push(feedArticleList.find(article => article.title == element.title));
      console.log(element.title + " added!");
    }
  };

  if (additionsToArticleList.length == 0) {
    return originalJSON;
  }

  //save feedArticles to list
  const newFeedArticles = [...originalJSON, ...additionsToArticleList]
  await storeData(feedURL + 'feed', newFeedArticles)
  return newFeedArticles;

}
