# Why

There are plenty of encounter calculators for 5e online. The two I'm most familiar with are [dhmstark's encounter calculator](https://dhmstark.co.uk/rpgs/encounter-calculator-5th/) and [Kobold Fight Club](https://kobold.club/fight/#/encounter-builder).

Here's what I'm looking for when I'm building encounters:
1. ease of use/ergonomics
2. at-a-glance assessment of an encounter once I make changes to the characters and/or monsters
3. ability to budget for an entire adventuring day (per DMG recommendations, i.e. 6-8 medium encounters per day)

Let's assess the two options above to see how they do.

## dhmstark's encounter calculator
1. ease of use/ergonomics :x:

* :disappointed: Why do I have to press "Calculate" whenever I make a change?
* :disappointed: Why can't I remove an arbitrary row? "Remove row" always removes the bottom row. This is inconvenient.

2. at-a-glance assessment of an encounter once I make changes to the characters and/or monsters :white_check_mark:

There's no yellow check, so we're gonna give it to them here.
* :slightly_smiling_face: Showing the math (monster multipliers, base XP, etc.) is pretty nice
* :confused: It's pretty easy to see easy/medium/hard/deadly and the associated XP thresholds. But each encounter difficulty designation is a scale, and you have to do some thinking to see where on a given scale your encounter falls. E.g. a "medium" encounter for four level 1 character has 100XP of wiggle room between the "medium" minimum and maximum (i.e. the "hard" minimum). This wiggle room obviously only increases at higher levels. So this isn't really at-a-glance.

3. ability to budget for an entire adventuring day :x:

* :disappointed: just not there

## Kobold Fight Club
1. ease of use/ergonomics :white_check_mark:

Again with the "no yellow/in between color, so we're gonna give it to them".
* :slightly_smiling_face: the search/selection UI is pretty clean (definitely fancier than I have the energy to build...probably)
* :confused: I find that choosing a specific monster rather than just entering "X monsters of CR Y" is cumbersome, but this is personal preference. I prefer to work backwards from easy/medium/hard/deadly to XP target to combination of monsters by CR. Seeing all the options for a monster of CR Y is a bit distracting because I've probably already got a sense of the encounter's context and therefore what kind of monsters I want in there. But I can see how the way KFC handles this would benefit some DMs.

2. at-a-glance assessment of an encounter once I make changes to the characters and/or monsters :x:
* :disappointed: it's kind of hard to immediately see which threshold your encounter is at (they just bold the text rather than using any kind of color coding; also the text is pretty small and not at all centered in the screen)

3. ability to budget for an entire adventuring day :x:
* :disappointed: They only list the daily XP budget. You can't enter multiple encounters and see how they all add up. Also, the budget is a range, and they just list the minimum (6 medium encounters).

## So?
So since I have all this beef with existing solutions, I figured I should put my money where my mouth is and build something better. I think KFC will always have more features than whatever I wind up building and being happy with, but I'm definitely NOT trying to compete/steal users. I just wanted to code this up, both because I needed a project and because I figured it'd be a good way to get more familiar with the guts of the 5e engine.
