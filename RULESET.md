# Snake — Ruleset

## Overview
Async skill-based Snake. All players share the same seeded food queue — same seed means the same food spawns in the same order, making scores directly comparable.

## Objective
Eat as much food as possible within the 90-second time limit without hitting a wall or your own body.

## How to Play
- Arrow keys (desktop) or swipe (mobile) to change direction
- Timer starts on your **first move** — you can study the board before committing
- Each food pellet eaten = **10 points**

## Speed Escalation
- Starts at 200 ms/tick
- Every 5 food eaten, speed increases by 15 ms/tick
- Floor: 80 ms/tick

## Seeded Challenge Mode
- Each game session generates a 6-character hex seed
- Share your seed to challenge friends — they get identical food spawn positions
- Use the **Share Challenge Code** button on the end screen to copy seed + score to clipboard

## Losing Conditions
- Snake hits a wall
- Snake runs into itself
- Time expires (score is kept — not a loss, just time's up)

## Stats Tracked
- High score (persistent via localStorage)
- Games played
- Total food eaten
