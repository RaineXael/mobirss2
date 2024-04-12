# How will we save the data?
(I need to write this out so i can actually plan what i'm doing)


## Save Sections
The save data will be separated into three different sections for IO speed: 
1. Feed Collection: The most top level information about the feed. Only should contain data such as URL, title, description, etc
2. Article Collection: Tied to a specific feed, contains information about the title. The content is not included in here, which it will be in another data layer. (Now that I think about it, this can be appended to the feed collection as these are just titles and shouldn't be too much to load? we'll see in the end)
3. Article Data: The actual HTML of the article itself. To be loaded by the WebView when requested. Each article should be in a separate entry.


## How are we going to know which is which in a key-value save system?

That's a good question.

The keys will be formatted like this:

'Data Type' - 'Example Key' - 'Description'

'FeedURL' - https://www.sdamned.com/comic/rss - Site metadata, contains a list of all comic URLs.

'ArticleData' - https://www.sdamned.com/comic/rss|https://www.sdamned.com/comic/1100 - A keyvalue pair corresponding to one document containing the HTML data and any nessesary metadata.

---
Yeah this can work

## Steps to manipulate data
### Initial Load
1. Get the ENTIRE FEED JSON as we always do
2. Take the name and relevant data of the feed and make a new object. Make an array of articles with their dates and links only. People would (most likely?) only have like a few feeds (not 1000 like with how many Tamberlane pages there are), so we can just have this in a global obj stored in like a 'comic' key.
3. For each article in a feed (that we saw above), add a new keyvalue pair like the above metadata: [SiteURL|ArticleURL].
Do that, and it should be fine for future use.
### On load Main Menu
As the list of feeds are stored in a global JSON save, we can just load that when the webpage starts. It should get all relevant info to be displayed, without all the actual comic data. Relatively easy if we set it up cleanly.
### On load Article List
Doing this should be easy too. We have a new parameter that we pass through, which is the 2nd 'Article Collection' part we mentioned above. It may be not as 'optimal' as storing both seperately, but these would be VERY shortened compared to what we did in MobiRSS1, so loading should still be quick. With how navigation works, we can just pop back the stack and we'd be in the prior menu, no extra loading needed.
### On load Article
This is where it gets interesting. We would load the [SiteURL|ArticleURL] key to get the article information. This includes HTML information for the webview as well as a URL to go to the external site. 

Yeah let's implement this 🔥
