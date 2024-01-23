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
    return parser.parse(xmlString);
  }
  catch(e){
    console.error(e)
    return null;
  }
  
};