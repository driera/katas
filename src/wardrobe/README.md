# Configure your own wardrobe

https://kata-log.rocks/configure-wardrobe-kata

Imagine you have just moved into your new apartment, and then you notice that you still need a new wardrobe for your dressing room. Regrettably, you won’t find a wardrobe that fits exactly to the size of your wall. But fortunately, the Swedish furniture dealer of your choice offers you the opportunity to build your own, customized wardrobe by combining individual wardrobe elements.

The wardrobe elements are available in the following sizes: 50cm, 75cm, 100cm, and 120cm. The wall on which the wardrobe elements are placed has a total length of 250cm. With which combinations of wardrobe elements can you make the most of the space?

Write a function that returns all combinations of wardrobe elements that exactly fill the wall.

## Additional Task
Here is the price list for the available wardrobe elements:

50cm => 59 USD
75cm => 62 USD
100cm => 90 USD
120cm => 111 USD
Write a second function that checks which of the resulting combinations is the cheapest one.

## Notes
I took my own implementation consisting on returning the optimal set of elements that fill a given wall, thus being the cheapest ones form those that leave less remaining space (remaining could be > 0).
