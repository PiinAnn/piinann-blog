---
title: "The Making of Just Spatial"
description: "From Just Intonation to roughness to space: how I built a real-time tool that lowers acoustic roughness by separating clashing frequencies between the two ears."
pubDate: 2026-06-27
category: studies
tags: ["just-intonation", "roughness", "spatial-audio", "max-msp", "psychoacoustics"]
---
<a href="https://doi.org/10.5281/zenodo.20927968"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.20927968.svg" alt="DOI" class="doi-badge" /></a>

From my journey through Just Intonation (JI) and roughness *([My Beautiful Journey of Just Intonation Music](https://piinann.com/writings/ji-music/))*, I ended up going down another fascinating path leading toward a new solution.

<img src="/UI.png" alt="The Just Spatial interface: audio source, effect controls (on/off, presets, sensitivity, spatial amount), the live roughness-decline readout, and the per-bin spatial visualization on the right." style="max-width: 700px; width: 100%; display: block; margin: 2rem auto; border-radius: 8px;" />

## A Tuning System Built on Compromise

For centuries, musicians and theorists have been fighting over tuning systems. Pythagoras defined Pythagorean tuning. René Descartes, in his *Compendium of Music*, said the essence of music is mathematical proportion. Isaac Newton, in a 1665 notebook, played with dividing the octave into lots of equal parts to get close to just intonation, he tried all kinds, and noticed (around the same time as Nicholas Mercator) that 53 divisions get remarkably close. But none of these ever really caught on.

What caught on was compromise. In 1722 J.S. Bach championed "well-tempered" tuning, but here's a common myth: this wasn't the equal temperament we use today. It was one of several *well temperaments*, slightly unequal systems that just let you play in every key without it sounding awful. Equal temperament only took over much later, pushed by the industrial revolution and 19th-century piano makers like Broadwood and Steinway & Sons, who wanted to mass-produce instruments with total freedom to change keys. That's how modern music ended up running on Twelve-Tone Equal Temperament (TET), instead of the pure physical resonance of just intonation.

## The Built-In Flaw
TET is a convenient compromise for changing keys, but it has a built-in flaw: it's slightly out of tune, which creates acoustic 'roughness' and beating. Consonant, low-roughness intervals tend to drive robust, stable phase-locking in the brainstem, while rougher ones produce weaker, less stable synchronization (Bidelman & Krishnan 2009), which I suspect translates into a bit more work for the brain to process. JI goes the other way: it tunes intervals to pure integer ratios, so most chords can be perfectly clean. But it has its own problem too. In certain keys you get a 'wolf' interval that sounds horribly dissonant.

William Sethares (2005) tried to fix this. His whole idea was that consonance depends on matching the tuning to the sound's spectrum, and he built *Adaptun*, an adaptive tuning tool in Max that calculates dissonance in real time and nudges the pitches toward better intervals as you play. The problem is, the pitches drift: the same C might not be the same C a moment later, so it's really hard to play alongside other instruments unless everything's in the same system. Sethares wasn't alone in this. Others have tried shifting frequencies, masking partials, reorganizing the overtone structure. Every fix like this runs into a similar wall, not to mention how hard it'd be, culturally, to get anyone to switch the habit of TET.

## Looking at It From Another Dimension
So I thought: what if we look at this from another dimension? What if I don't adjust at the very beginning, but at the very end? What if I take the final mix, calculate the roughness, and separate the clashing frequencies through auditory *space*?

Here's the thing: the classic roughness research deals with two frequencies landing in the same critical band within the ear (Plomp & Levelt 1965). But that clash is strongest when the sounds hit the same ear. With headphones, we can put sounds in each ear separately, so if two frequencies are fighting, we can pull them apart in space and soften the roughness before it ever reaches the ears.

<img src="/figure_2.jpg" alt="The peripheral mechanism: when two close frequencies reach the same cochlea they beat, producing roughness (a); routing them to different ears lets each cochlea process only one, so the beating doesn't form (b)." style="max-width: 480px; width: 100%; display: block; margin: 2rem auto;" />

## What Just Spatial Actually Does
Therefore Just Spatial sparked in my head. I built a tool in Max/MSP, commissioned by Cycling '74, that looks at the harmonic relationships right at the end of the final mix and adjusts where each sound sits in space. By separating the clashing frequencies across the two ears, we can drastically reduce the physical roughness before it hits the ears. And by doing this, we don't need JI's perfect ratios *and* we sidestep TET's dissonance. Whether this actually feels less fatiguing over a long listen is something I still need to test. That's the next step.


I'm not going to walk through the FFT windows, the Vassilakis math, or the ERB scale here. That's all in the preprint if you want it. Here I just want to say what the tool actually does: a short-time FFT breaks the mix into thousands of frequency bins, a Vassilakis-style model estimates how much each pair of close bins is clashing, and the worst offenders get pushed toward opposite ears with an equal-power pan. Nothing is retuned or removed, only redistributed.

<img src="/figure_3.jpg" alt="Signal flow of the Max/MSP patch." style="max-width: 320px; width: 100%; display: block; margin: 2rem auto;" />


## Why It Matters
 I'm still preparing the perceptual and physiological evaluation to test whether the measured reduction corresponds to a felt one. But the main idea is that less acoustic friction means a less harsh listening experience. If this holds true, this tool could be a gentle option for listeners with heightened auditory sensitivity, anyone who finds dense mixes wearing over a long listen.

---

## Preprint
If you are interested in the full method, equations, measurements, and limitations are all documented in the paper below.

Wang, Y.-A. (2026). *Just Spatial: Real-Time Dichotic Roughness Minimization for Stereo Music*. Zenodo. DOI: [10.5281/zenodo.20927968](https://doi.org/10.5281/zenodo.20927968)


---

## References

1. Bidelman, G. M., & Krishnan, A. (2009). Neural correlates of consonance, dissonance, and the hierarchy of musical pitch in the human brainstem. *The Journal of Neuroscience*, 29(42), 13165–13171.
2. Plomp, R., & Levelt, W. J. M. (1965). Tonal consonance and critical bandwidth. *The Journal of the Acoustical Society of America*, 38(4), 548–560.
3. Sethares, W. A. (2005). *Tuning, Timbre, Spectrum, Scale* (2nd ed.). Springer-Verlag.
