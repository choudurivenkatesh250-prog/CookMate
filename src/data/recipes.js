import eggFriedRice from "@/assets/egg-fried-rice.jpg";
import tomatoRice from "@/assets/tomato-rice.jpg";
import vegUpma from "@/assets/veg-upma.jpg";
import lemonRice from "@/assets/lemon-rice.jpg";
import paneerBhurji from "@/assets/paneer-bhurji.jpg";
import masalaOmelette from "@/assets/masala-omelette.jpg";
import breadUpma from "@/assets/bread-upma.jpg";
import poha from "@/assets/poha.jpg";
import vegPulao from "@/assets/veg-pulao.jpg";
import curdRice from "@/assets/curd-rice.jpg";
const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "South Indian",
  "North Indian",
  "Vegetarian",
  "Non-Vegetarian"
];
const COMMON_INGREDIENTS = [
  "Rice",
  "Egg",
  "Onion",
  "Tomato",
  "Potato",
  "Milk",
  "Bread",
  "Paneer",
  "Curd",
  "Semolina",
  "Poha",
  "Lemon",
  "Peanuts",
  "Peas",
  "Carrot",
  "Cauliflower",
  "Chickpeas",
  "Moong Dal",
  "Tamarind"
];
const RECIPES = [
  {
    id: "egg-fried-rice",
    title: "Egg Fried Rice",
    description: "Leftover rice turned into a hot, savoury one-pan dinner in minutes.",
    cookingTime: 15,
    difficulty: "Easy",
    cost: 60,
    servings: 2,
    categories: ["Dinner", "Lunch", "Non-Vegetarian"],
    image: eggFriedRice,
    ingredients: ["Rice", "Egg", "Onion", "Peas", "Carrot"],
    steps: [
      "Chop the onion, carrot and keep cooked rice ready.",
      "Heat a pan on medium-high and add a spoon of oil.",
      "Crack in the eggs and scramble them until just set, then move to one side.",
      "Add onion, carrot and peas and stir-fry for 2 minutes.",
      "Add the rice, salt and pepper, toss everything together for 3 minutes and serve hot."
    ]
  },
  {
    id: "tomato-rice",
    title: "Tomato Rice",
    description: "Tangy South Indian rice that needs only tomatoes, rice and basic spices.",
    cookingTime: 20,
    difficulty: "Easy",
    cost: 45,
    servings: 2,
    categories: ["Lunch", "South Indian", "Vegetarian"],
    image: tomatoRice,
    ingredients: ["Rice", "Tomato", "Onion"],
    steps: [
      "Chop tomatoes and onion finely.",
      "Heat oil in a pan and splutter mustard seeds and curry leaves.",
      "Add onion and cook until soft.",
      "Add tomatoes, salt, turmeric and chilli powder; cook until mushy.",
      "Fold in cooked rice, mix gently and rest for 2 minutes before serving."
    ]
  },
  {
    id: "vegetable-upma",
    title: "Vegetable Upma",
    description: "A filling semolina breakfast with whatever vegetables are in the fridge.",
    cookingTime: 20,
    difficulty: "Easy",
    cost: 40,
    servings: 2,
    categories: ["Breakfast", "South Indian", "Vegetarian"],
    image: vegUpma,
    ingredients: ["Semolina", "Onion", "Carrot", "Peas"],
    steps: [
      "Dry roast semolina until it smells nutty, then keep aside.",
      "Heat oil, splutter mustard seeds, add onion and green chilli.",
      "Add chopped carrot and peas and cook for 3 minutes.",
      "Pour in 2.5 cups hot water with salt and bring to a boil.",
      "Lower the flame, add semolina slowly while stirring, cover for 3 minutes and fluff up."
    ]
  },
  {
    id: "lemon-rice",
    title: "Lemon Rice",
    description: "Bright, zesty rice that works as a lunchbox meal or a quick dinner.",
    cookingTime: 15,
    difficulty: "Easy",
    cost: 35,
    servings: 2,
    categories: ["Lunch", "South Indian", "Vegetarian"],
    image: lemonRice,
    ingredients: ["Rice", "Lemon", "Peanuts"],
    steps: [
      "Cook rice and spread it out to cool slightly.",
      "Heat oil, add mustard seeds, peanuts and curry leaves.",
      "Add turmeric and green chilli and switch off the flame.",
      "Squeeze in lemon juice and add salt.",
      "Mix the tempering into the rice until every grain is yellow."
    ]
  },
  {
    id: "paneer-bhurji",
    title: "Paneer Bhurji",
    description: "Protein-packed scrambled paneer that pairs with bread or rice.",
    cookingTime: 15,
    difficulty: "Easy",
    cost: 90,
    servings: 2,
    categories: ["Dinner", "North Indian", "Vegetarian"],
    image: paneerBhurji,
    ingredients: ["Paneer", "Onion", "Tomato"],
    steps: [
      "Crumble the paneer with your hands.",
      "Chop onion and tomato finely.",
      "Heat oil, cook onion until golden, then add tomato and cook until soft.",
      "Add turmeric, chilli powder and salt and stir for a minute.",
      "Add crumbled paneer, toss for 3 minutes and finish with coriander."
    ]
  },
  {
    id: "masala-omelette",
    title: "Masala Omelette",
    description: "The fastest hot meal there is \u2014 eggs, onion and a hot pan.",
    cookingTime: 10,
    difficulty: "Easy",
    cost: 30,
    servings: 1,
    categories: ["Breakfast", "Snacks", "Non-Vegetarian"],
    image: masalaOmelette,
    ingredients: ["Egg", "Onion", "Tomato"],
    steps: [
      "Beat 2 eggs with salt and a pinch of chilli powder.",
      "Stir in finely chopped onion, tomato and coriander.",
      "Heat a non-stick pan with a little oil.",
      "Pour in the mixture and spread evenly.",
      "Cook 2 minutes per side until golden and serve with bread."
    ]
  },
  {
    id: "bread-upma",
    title: "Bread Upma",
    description: "Turn leftover bread slices into a spicy, satisfying snack.",
    cookingTime: 15,
    difficulty: "Easy",
    cost: 35,
    servings: 2,
    categories: ["Snacks", "Breakfast", "Vegetarian"],
    image: breadUpma,
    ingredients: ["Bread", "Onion", "Tomato"],
    steps: [
      "Cut bread slices into small cubes.",
      "Heat oil and splutter mustard seeds and curry leaves.",
      "Add onion and green chilli and cook until soft.",
      "Add tomato, turmeric and salt and cook until mushy.",
      "Toss in the bread cubes, mix for 2 minutes and serve immediately."
    ]
  },
  {
    id: "poha",
    title: "Poha",
    description: "Light flattened-rice breakfast ready before your tea cools down.",
    cookingTime: 15,
    difficulty: "Easy",
    cost: 30,
    servings: 2,
    categories: ["Breakfast", "Vegetarian"],
    image: poha,
    ingredients: ["Poha", "Onion", "Potato", "Peanuts", "Lemon"],
    steps: [
      "Rinse poha in a colander and let it soften for 5 minutes.",
      "Heat oil, fry peanuts, then add mustard seeds and curry leaves.",
      "Add onion and diced potato and cook until the potato is tender.",
      "Add turmeric, salt and sugar, then fold in the poha.",
      "Cover for 2 minutes, finish with lemon juice and coriander."
    ]
  },
  {
    id: "vegetable-pulao",
    title: "Vegetable Pulao",
    description: "A one-pot rice dinner with mixed vegetables and gentle spices.",
    cookingTime: 30,
    difficulty: "Medium",
    cost: 80,
    servings: 3,
    categories: ["Dinner", "North Indian", "Vegetarian"],
    image: vegPulao,
    ingredients: ["Rice", "Onion", "Carrot", "Peas", "Potato"],
    steps: [
      "Soak rice for 15 minutes and drain.",
      "Heat ghee, add whole spices, then sliced onion and cook until golden.",
      "Add chopped carrot, peas and potato and stir for 3 minutes.",
      "Add rice, salt and 2 cups water and bring to a boil.",
      "Cover and cook on low for 12 minutes, then rest 5 minutes and fluff."
    ]
  },
  {
    id: "curd-rice",
    title: "Curd Rice",
    description: "Cooling comfort food for hot days and tired evenings.",
    cookingTime: 10,
    difficulty: "Easy",
    cost: 30,
    servings: 2,
    categories: ["Lunch", "South Indian", "Vegetarian"],
    image: curdRice,
    ingredients: ["Rice", "Curd", "Milk"],
    steps: [
      "Mash warm cooked rice lightly with a spoon.",
      "Add a splash of milk and let it cool down.",
      "Mix in curd and salt until creamy.",
      "Temper mustard seeds, curry leaves and green chilli in oil.",
      "Pour the tempering over the rice and serve chilled."
    ]
  },
  // The five recipes below reuse existing photos from src/assets as placeholders.
  // Drop a real photo into src/assets and point the `image` field at it when you have one.
  {
    id: "aloo-gobi",
    title: "Aloo Gobi",
    description: "A dry potato and cauliflower sabzi that goes with roti or plain rice.",
    cookingTime: 25,
    difficulty: "Medium",
    cost: 70,
    servings: 3,
    categories: ["Dinner", "North Indian", "Vegetarian"],
    image: paneerBhurji,
    ingredients: ["Potato", "Cauliflower", "Onion", "Tomato"],
    steps: [
      "Cut the potato and cauliflower into small, even pieces.",
      "Heat oil, add cumin seeds, then chopped onion and a pinch of ginger-garlic.",
      "Add the potato and cauliflower and stir-fry for 5 minutes.",
      "Add turmeric, chilli powder, salt and chopped tomato and mix well.",
      "Cover and cook on low for 12 minutes, stirring twice, then finish with coriander."
    ]
  },
  {
    id: "chana-masala",
    title: "Chana Masala",
    description: "Chickpeas simmered in a tangy onion-tomato masala that tastes great with roti.",
    cookingTime: 30,
    difficulty: "Medium",
    cost: 55,
    servings: 3,
    categories: ["Dinner", "Lunch", "North Indian", "Vegetarian"],
    image: tomatoRice,
    ingredients: ["Chickpeas", "Onion", "Tomato"],
    steps: [
      "Rinse boiled or canned chickpeas and keep them aside.",
      "Heat oil, add cumin seeds and finely chopped onion and cook until golden.",
      "Add ginger-garlic, chopped tomato and cook until the masala turns glossy.",
      "Add turmeric, chilli powder, coriander powder and salt and stir for a minute.",
      "Add the chickpeas with a cup of water, simmer for 10 minutes and mash a few for thickness."
    ]
  },
  {
    id: "moong-dal-khichdi",
    title: "Moong Dal Khichdi",
    description: "Soft one-pot rice and lentil comfort food that is easy on the stomach.",
    cookingTime: 25,
    difficulty: "Easy",
    cost: 45,
    servings: 2,
    categories: ["Dinner", "Lunch", "Vegetarian"],
    image: vegUpma,
    ingredients: ["Rice", "Moong Dal", "Onion", "Peas"],
    steps: [
      "Rinse the rice and moong dal together and drain well.",
      "Heat ghee in a pressure cooker and add cumin seeds, asafoetida and curry leaves.",
      "Add chopped onion and cook until soft, then add turmeric and salt.",
      "Add the rice, dal, peas and 3 cups of water and stir once.",
      "Pressure cook for 3 whistles, rest for 5 minutes, then fluff and finish with ghee."
    ]
  },
  {
    id: "ven-pongal",
    title: "Ven Pongal",
    description: "Creamy South Indian rice and moong dal breakfast with a pepper-cumin tempering.",
    cookingTime: 25,
    difficulty: "Easy",
    cost: 45,
    servings: 2,
    categories: ["Breakfast", "South Indian", "Vegetarian"],
    image: curdRice,
    ingredients: ["Rice", "Moong Dal", "Milk"],
    steps: [
      "Dry roast the moong dal until it smells nutty.",
      "Rinse the dal with the rice and cook both with 3 cups of water until very soft.",
      "Mash the cooked rice and dal lightly and stir in warm milk and salt.",
      "Heat ghee and add peppercorns, cumin seeds, grated ginger and curry leaves.",
      "Pour the tempering over the pongal, mix well and serve hot with coconut chutney."
    ]
  },
  {
    id: "bisi-bele-bath",
    title: "Bisi Bele Bath",
    description: "Karnataka's spiced rice, lentil and vegetable one-pot meal.",
    cookingTime: 35,
    difficulty: "Medium",
    cost: 60,
    servings: 3,
    categories: ["Lunch", "Dinner", "South Indian", "Vegetarian"],
    image: vegPulao,
    ingredients: ["Rice", "Moong Dal", "Carrot", "Peas", "Tamarind"],
    steps: [
      "Rinse the rice and moong dal and cook them together until soft.",
      "Boil the carrot and peas with a little salt until just tender.",
      "Soak the tamarind in warm water for 10 minutes and squeeze out the juice.",
      "Heat ghee, add mustard seeds, curry leaves, chopped onion and bisi bele bath powder.",
      "Add the cooked rice, dal, vegetables and tamarind water, simmer 5 minutes and serve hot."
    ]
  }
];
function getRecipe(id) {
  return RECIPES.find((r) => r.id === id);
}
export {
  CATEGORIES,
  COMMON_INGREDIENTS,
  RECIPES,
  getRecipe
};
