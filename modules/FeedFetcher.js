const { XMLParser} = require("fast-xml-parser");
const parser = new XMLParser();

/**
 * Fetches and returns an object representation of an RSS Feed 
 * @param {string} link Link of the RSS feed to fetch 
 * @returns An object representation of the feed, an empty object if not found
 */
export async function fetchFeed(link){
 
  try{
    const xmlResp = await fetch(link);
    const xmlString = await xmlResp.text();
    //validate rss
    
    return parser.parse(xmlString).rss.channel;
  }
  catch(e){
    console.error(e)
    return null;
  }
  
};

/**
 * Processes raw feed JSON data into the 3 parts mentioned in the
 * savedate-logic-md. They will be returned as an object array.
 * @param {string} feedJSON 
 * @returns [FeedJSON to be added to global list, 
 * array of article metadata to be added individually.]
 */
export function processFeed(feedJSON){
  //should replace description with content:endcoded:,
  //idk how it works exactly so I'll leave for later
  const articleData = feedJSON.item.map(art=>{
    return{
      title:art.title,
      link:art.link,
      pubDate:art.pubDate
    }
  })
  const feedData = {
      title:feedJSON.title,
      link: feedJSON.link,
      description:feedJSON.description,
      feedLink: feedJSON.feedLink,
      lastBuildDate: feedJSON.lastBuildDate, 
    }
  

  return {
    feed: feedData,
    articleList:articleData,
    articles: feedJSON.item
  }
  
}