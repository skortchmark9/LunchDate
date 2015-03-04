# LunchDate

1.) Usage: One person per email field, as many teams as you want. All bets off when using the back button/refreshing. I built some of the backend for different organizations but no frontend - so everyone is yours. If you hit "Make Pairs" without creating anyone, it will just make pairs with everyone it has already. As far as features go, about all that works is adding people and going forward a week. I expect refresh works too but there isn't a whole lot of variance between pairs. It will make more sense if we let users drag-n-drop pairs, but that's a project for another day.

2.) My strategy for making pairs isn't awesome - I'm afraid I left it a little late, but it's totally an interesting problem. Part of the reason I'm writing this when I am is because of a long wikipedia-flume that took me through a whole mess of assignment problems. Anyway, the formula is this:

needyness(p) = least recent time paired w/a currently free teammate - #teammates + missedDates

(missedDates is only a factor if you have an odd number of people.)

I take needy people and then pair them with needy teammates. If it all works out the people remaining will still have some available teammates (b/c of high number of connections to begin with) and they can pair with each other.

3.) Testing: clearly, not a whole lot. Lots and lots of console logging to test functional output of computation, esp. the pairing stuff. My only defense is that I didn't want to have to learn the MEAN stack and ALSO its testing stuff on the same project.

4.) I've been wanting to learn MEAN for a while - a lot of the stuff I did is I think overkill for this kind of project, but it was overall a good learning experience. Stuff with the routes got a little crazy at the end, and it's a little cringe-inducing to see all the business logic taking place in api.js. Surely, there's a better place for it all, probably the db models, but mongoose's documentation is so terrible I just did it wherever I knew I wouldn't be breaking anything. I just started running out of time to do things the 'right' way at the end. Bootstrap CSS was a surprising plus, it just came with the box and made everything look nice: I definitely felt like I learned a lot of cool frontendy stuff.

5.) I built enough infrastructure already that I might as well make this a thing right? Things that should probably happen: email, drag-n-drop, fun animations on the "hamburger menu," a graphier pairing algorithm, a more specific color scheme, fixing the svg backround, a logo for the slidey menu, flatter input boxes
