# How will we save the data?
(I need to write this out so i can actually plan what i'm doing)


## Save Sections
The save data will be separated into three different sections for IO speed: 
1. Feed Collection: The most top level information about the feed. Only should contain data such as URL, title, description, etc
2. Article Collection: Tied to a specific feed, contains information about the title. The content is not included in here, which it will be in another data layer.
3. Article Data: The actual HTML of the article itself. To be loaded by the WebView when requested. Each article should be in a separate entry.


## How are we going to know which is which in a key-value save system?

That's a good question.

(This is code for "I'll write this later.")