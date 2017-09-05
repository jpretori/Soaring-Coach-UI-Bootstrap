# Soaring Coach UI

There is a clickable prototype that documents the interface this repo is working towards: https://xd.adobe.com/view/dbea7dcf-03f4-4070-b2fd-a33ac5bb2559/

# Misc Notes
These notes will be integrated elsewhere and cleaned up, later.  For now this is at least a single place to keep them.

## Branching strategy
Git flow will be used, and releases will be synchronised with the SoaringCoach repository: https://github.com/jpretori/SoaringCoach.

One thing to note, is that what is normally called the "develop" branch, will in this project be called "gh-pages".  This way, any new merge into develop (a.k.a. gh-pages) will automatically deploy to https://jpretori.github.io/SoaringCoach-UI-Bootstrap/pages/index.html.

So the long-lived branches are:
 - `master` - used as per normal Git Flow, to track stable versions
 - `gh-pages` - used as **develop** branch, to gather completed features

Short-lived branches are as per usual: `hotfixes`, `features`, `releases`
