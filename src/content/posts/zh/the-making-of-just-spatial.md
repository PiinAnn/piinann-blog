---
title: "Just Spatial 的誕生"
description: "從純律、粗糙度到雙耳：我怎麼做出一個即時工具，把互相衝突的頻率分到左右耳，降低聲學上的粗糙度。"
pubDate: 2026-06-27
category: studies
tags: ["just-intonation", "roughness", "spatial-audio", "max-msp", "psychoacoustics"]
doi: "10.5281/zenodo.20927968"
---
<div class="note-box">
  <p>刊登於 <a href="https://cycling74.com/articles/spatialization-in-max">Cycling '74</a> · 由 Cycling '74 委託製作</p>
</div>

在歷經一番波折之後（詳見[我的純律之旅](/zh/writings/ji-music/)），我意外發現了另一條很有趣的路，也因此探索出一個有趣的解法：回到人耳聽覺的切面上，去降低頻率之間產生的刺耳感受。這也就是 Just Spatial 的誕生。

<img src="/UI.png" alt="Just Spatial 的介面：音源、效果控制（開關、預設、靈敏度、空間量）、即時的粗糙度下降數值，以及右側每個頻率區間的空間視覺化。" style="max-width: 700px; width: 100%; display: block; margin: 2rem auto; border-radius: 8px;" />

## 建立在妥協上的調律系統

幾百年來，各路音樂家和理論家對調律系統一直有不同的見解和爭議。從畢達哥拉斯開始，他定義了五度相生律，這也是簡單整數比的起源。而後，笛卡兒在《音樂綱要》裡也提到，音樂的本質是數學的比例。

再來是牛頓，他在 1665 年未公開的筆記本裡，試著算出最接近純律的平均律。他把八度切成很多等份，也嘗試了很多種切法，大約和 Nicholas Mercator 同一時期，發現切成 53 等份是當時算出的最好解法。只是這些系統，當時都沒有真正流行起來。

後來真正流行起來的，或許我們可以說是一場妥協。1722 年，巴哈大力推廣良律（well-tempered）。很多人以為巴哈的良律就等於我們今天使用的平均律，其實不完全一樣，那只是當時良律的其中一種。良律裡各個音之間的距離稍微不相等，但它的重點是讓你每個調都能彈，聽起來不會太糟。

平均律要過了很久之後才變成主流，最重要的推手是工業革命，還有 19 世紀像 Broadwood 和 Steinway & Sons 這樣的鋼琴製造商。商人們的目的當然是希望大量生產能完全自由轉調的樂器。現代的音樂就是這樣，最後落在 12 平均律上，以均分的方式成為主流的共識，而像純律那樣討論純粹物理共振的人越來越少。

## 與生俱來的缺陷

12 平均律在轉調上確實是很方便的妥協，只是它有一個與生俱來的缺陷：除了八度以外，它的音程都沒辦法形成簡單的整數比，音與音之間的泛音也就沒辦法完全重合。這會產生聲學上的粗糙度和拍頻。

和諧、粗糙度低的音程，通常會在腦幹裡帶動穩定的相位鎖定（phase-locking）；比較粗糙的音程，產生的同步則比較弱、比較不穩定（Bidelman & Krishnan, 2009）。我推測這可能代表大腦需要多花一點力氣去處理。

純律則是把音程調成純粹的整數比，所以大部分的和弦在示波器上都非常穩定。但它也有自己的問題，在某些音程裡會出現非常不和諧的狼音程（wolf interval），甚至比平均律還要不和諧。

William Sethares（2005）試著解決這個問題。他的主要論點是：聽起來是否和諧，取決於調律和聲音頻譜之間是否匹配，一套固定的音律系統沒辦法保證這件事。他用 Max 做了一個叫 Adaptun 的自適應調律工具，可以即時計算不和諧的程度，在演奏的同時，把音高即時調整到最不粗糙的位置。我認為這是在純律和平均律之間最好的解法。

只是問題在於，如果音高不是固定的，這一刻的 C 和下一刻的 C 不是同一個頻率，就會很難和其他樂器一起演奏，除非所有樂器都在同一個系統裡。後來也出現了更多解決粗糙度的方法，例如移動頻率、遮蔽泛音、重新組織泛音結構等等。這類修正方法最後都會碰到類似的牆，更別說最大的難處在於，現代西方文化對 12 平均律的習慣已經根深蒂固，要大家接受一套新的系統，是一件非常困難的事。

## 換一個維度來看

所以我在想，假設我們換一個維度來看呢？如果不在一開始調整，改成等到最後才調整呢？假設我們拿最後的混音來計算它的粗糙度，再根據聽覺粗糙度的原理，把互相衝突的頻率分開，降低聽覺上的粗糙度呢？

我們來細談聽覺粗糙度底層的產生原因。在經典的粗糙度研究裡，Plomp 和 Levelt（1965）指出，不和諧感是因為兩個頻率落在耳朵裡同一個臨界頻帶，發生了拍頻的現象，而最強烈的不適感，出現在這個頻帶的四分之一處。

運用這個基本的認知，我們在戴耳機的時候，是不是就可以把這兩個頻率分開，分別送進左耳和右耳，解決它們在同一隻耳朵裡打架的情況？

<img src="/figure_2.jpg" alt="周邊機制：兩個相近的頻率進入同一個耳蝸時會產生拍頻，形成粗糙度（a）；把它們分到不同的耳朵，每個耳蝸只處理其中一個，拍頻就不會形成（b）。" style="max-width: 480px; width: 100%; display: block; margin: 2rem auto;" />

## Just Spatial 在做什麼

於是 Just Spatial 這個想法，就在我腦海裡開了花。我在 Max 裡做了一個工具，由 Cycling '74 委託製作。根據上面這些想法，我希望它能在最後的混音階段分析泛音之間的關係，再調整每個聲音在空間裡的位置。把互相衝突的頻率分到不同的耳朵，就可以在聲音進到耳朵之前，大幅降低物理上的粗糙度。

這個方法的優點在於，我們不需要一套完美的調律系統，也可以避開我們文化上習慣的 12 平均律所帶來的不和諧。至於長時間聽下來，是不是比較不會造成疲勞，或是有其他生理上的好處，還需要測試，這也是我下一步想完成的。

工具的細節，包含 FFT 視窗、Vassilakis 的公式這些，我就不在這裡展開了，有興趣的話都寫在預印本裡。這裡只想說這個工具為什麼誕生，並簡單說明它做了什麼：先用短時傅立葉轉換（short-time FFT）把混音拆成好幾千個頻率區間，再用 Vassilakis 的模型估算每一對相鄰區間之間衝突得有多嚴重，衝突嚴重的，就按照等功率（equal-power）的公式推向不同的耳朵。整個過程沒有修改任何頻率，也沒有刪掉任何聲音，只是重新分配它們的位置，整體的能量也維持相等。

<img src="/figure_3.jpg" alt="Max/MSP patch 的訊號流程。" style="max-width: 320px; width: 100%; display: block; margin: 2rem auto;" />

## 聽聽看

<div style="position: relative; padding-bottom: 56.25%; max-width: 700px; margin: 2rem auto;">
  <iframe src="https://www.youtube.com/embed/45RbisnUYfs" style="position:absolute; top:0; left:0; width:100%; height:100%; border-radius:8px;" allowfullscreen loading="lazy"></iframe>
</div>

這是 Just Spatial 第一個版本的聽力測試，你可以聽聽看重新分配之後的差別，記得戴耳機。

## 為什麼這件事重要

核心的想法是，聲學上的摩擦越少，聽起來就越不刺耳。我還在準備感知和生理上的評估，想知道理論上的數值下降，是不是真的能被感覺到。

如果這個假設成立，這個工具或許能成為一個溫和的聆聽選項，給聽覺比較敏感的人，或是任何覺得密集的混音聽久了很累的人。我沒有想要改變現代流行音樂的呈現方式，我也認為粗糙度有它存在的必要。我想提供的，只是一個選項，一種更溫和、更輕鬆的聆聽方式。

---

## 資源

**Patch：** 完整的 Max/MSP patch 可以在 [Cycling '74 的專題文章](https://cycling74.com/articles/spatialization-in-max)裡取得。

**預印本：** Wang, Y.-A. (2026). *Just Spatial: Real-Time Dichotic Roughness Minimization for Stereo Music*. Zenodo. DOI: [10.5281/zenodo.20927968](https://doi.org/10.5281/zenodo.20927968)。裡面有完整的方法、公式、量測結果和限制。

---

## 參考文獻

1. Bidelman, G. M., & Krishnan, A. (2009). Neural correlates of consonance, dissonance, and the hierarchy of musical pitch in the human brainstem. *The Journal of Neuroscience*, 29(42), 13165–13171.
2. Plomp, R., & Levelt, W. J. M. (1965). Tonal consonance and critical bandwidth. *The Journal of the Acoustical Society of America*, 38(4), 548–560.
3. Sethares, W. A. (2005). *Tuning, Timbre, Spectrum, Scale* (2nd ed.). Springer-Verlag.