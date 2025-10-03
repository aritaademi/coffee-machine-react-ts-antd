import { Layout, Typography, message } from 'antd';
import CoffeeMaker from './components/CoffeeMaker';
import InventoryDisplay from './components/InventoryDisplay';
import RestockForm from './components/RestockForm';
import AddCoffeeForm from './components/AddCoffeeForm';
import HeaderBar from './components/HeaderBar';
import { defaultRecipes, fullStock } from './utils/recipes';
import { useEffect, useState } from 'react';
import CoffeeAnimation from './components/CoffeeAnimation';
//import CoffeeDetails from './components/CoffeeDetails';

const {Content, Footer} = Layout;

// Type definitions - helper type used for keys in the Ingredients, which mean Ingredient key can be only of of these 3 values
export type IngredientKey = 'coffee' | 'water' | 'milk';

export interface Ingredients {
  coffee: number;
  water: number;
  milk: number;
}

export interface Recipe extends Ingredients {
  price: number;
}

export type Recipes = Record<string, Recipe>;  //each coffee name maps to its required ingredients


const App: React.FC = () => {

  // const [recipes, setRecipes] = useState<Recipes>(() => {
  //   const saved = localStorage.getItem('coffeeRecipes');  //ben fetch te dhenat e ruajtura prej localStorage
  //   return saved ? JSON.parse(saved) : defaultRecipes;  //nese saved value ekziston e konverton json stringun ne Js object, perndryshe perdoret defaultrecipes
  // });

  const [recipes, setRecipes] = useState<Recipes>(() => {
  const saved = localStorage.getItem('coffeeRecipes');
  const defaultMap: Recipes = defaultRecipes; // Explicitly cast to avoid TS error

  if (saved) {
    const parsed: Recipes = JSON.parse(saved);
    const merged: Recipes = {};

    for (const coffeeName in defaultMap) {
      merged[coffeeName] = {
        ...defaultMap[coffeeName],
        ...parsed[coffeeName],
        price: parsed[coffeeName]?.price ?? defaultMap[coffeeName].price,
      };
    }

    // Include any additional custom coffees
      for (const coffeeName in parsed) {
        if (!merged[coffeeName]) {
          merged[coffeeName] = parsed[coffeeName];
        }
      }

      return merged;
    }

    return defaultRecipes;
  });


  const [stock, setStock] = useState<Ingredients>(() => {
    const saved = localStorage.getItem('ingredientStock');
    return saved ? JSON.parse(saved) : fullStock;
  });

  const [selectedCoffee, setSelectedCoffee] = useState<string>('Espresso');

  const [earnings, setEarnings] = useState<number>(0);

  const [isBrewing, setIsBrewing] = useState(false);  //per animacionin


  //behet run cdo here kur stock ndryshon
  useEffect(() => {
    localStorage.setItem('ingredientStock', JSON.stringify(stock));  //me setItem ruhet stringu ne localStorage me emrin 'ingredientStock', json stringify e kthen stock objektin {coffee:200 etj} ne string
  }, [stock]);  //dependency eshte [stock] dmth effecti ekzekutohet vetem kur stock ndryshon

  useEffect(() => {
    localStorage.setItem('coffeeRecipes', JSON.stringify(recipes));
    console.log('Recipes:', recipes);

    if (!recipes[selectedCoffee]) {
    const fallback = Object.keys(recipes)[0];
    setSelectedCoffee(fallback);
  }
  }, [recipes]);

  useEffect(() => {
    const raw = localStorage.getItem('ingredientStock');
    if (raw) {
      const parsed = JSON.parse(raw);
      const cleaned = Object.fromEntries(
        Object.entries(parsed).filter(([k]) =>
          ['coffee', 'water', 'milk'].includes(k)
        )
      );

      const final: Ingredients = {
        coffee: Number(cleaned['coffee'] ?? 0),
        water: Number(cleaned['water'] ?? 0),
        milk: Number(cleaned['milk'] ?? 0),
      };

      localStorage.setItem('ingredientStock', JSON.stringify(final));
      setStock(final);
    }
  }, []);



  // const makeCoffee = () => {
  //   const recipe = recipes[selectedCoffee]; //by default e tregon selected coffee ne kete rast Espresso dhe nese e shtypim Make coffee i merr ingredients te definuara per espresson
  //   if (!recipe) {
  //     message.error('No recipe selected');
  //     return;
  //   }

  //   //object.entries e kthen objektin ne array, me find kerkon first ingredient qe ska mjaftueshem stock, stock[key] < amount → Not enough of that ingredient.
  //   const insufficient = Object.entries(recipe).find(
  //     ([key, amount]) => stock[key as IngredientKey] < (amount as number)
  //   );

  //   if (insufficient) {
  //     message.error(`Not enough ${insufficient[0]} to make ${selectedCoffee}`);  //e shfaq error message
  //     return;
  //   }

  //   const newStock = { ...stock };  //e ben copy current stock te newStock 
  //   //loops neper secilin ingredient edhe e zbrit required amount prej stockut
  //   Object.entries(recipe).forEach(([key, amount]) => {
  //     newStock[key as IngredientKey] -= amount as number;
  //   });

  //   setStock(newStock);  //e ben update stockun
  //   setEarnings(prev => prev + recipe.price); // e shton cmimin
  //   message.success(`Enjoy your ${selectedCoffee}!`);  //e tregon success message
  // };

  const makeCoffee = () => {
    const recipe = recipes[selectedCoffee];
    if (!recipe) {
      message.error('No recipe selected');
      return;
    }

    const insufficient = Object.entries(recipe).find(
      ([key, amount]) => stock[key as IngredientKey] < (amount as number)
    );

    if (insufficient) {
      message.error(`Not enough ${insufficient[0]} to make ${selectedCoffee}`);
      return;
    }

    // Reset isBrewing to false first to force React to re-mount animation
    setIsBrewing(false);

    // Slight delay before starting animation to allow state to reset (use setTimeout 0)
    setTimeout(() => {
      setIsBrewing(true);

      setTimeout(() => {
        const newStock = { ...stock };
        Object.entries(recipe).forEach(([key, amount]) => {
          newStock[key as IngredientKey] -= amount as number;
        });

        setStock(newStock);
        setEarnings(prev => prev + recipe.price);
        message.success(`Enjoy your ${selectedCoffee}!`);
        setIsBrewing(false);
      }, 2000);
    }, 0);
  };


  //me partial propsat i bejm optional, nese nuk e bejm update njeren prej tyre nuk shfaq error
  //dmth dinamikisht i shton vetem ingredients qe useri i zgjedh, jo patjeter te gjitha
  const restock = (values: Partial<Ingredients>) => {
    const newStock = { ...stock };  //e kopjon gjendjen e inventory te ...stock, qe mos ta modifikon direkt
    //object.entries e kthen objektin ne array, me foreach ec neper secilin entry dhe e vendos key te IngredientKey
    Object.entries(values).forEach(([key, amount]) => {  
      newStock[key as IngredientKey] += amount as number;  //e ben add amountin te newstock
    });
    setStock(newStock);  
    message.success('Ingredients restocked!');
  };

  //value esht object qe e permban emrin e kafes edhe ingredients
  const addCoffee = (values: { name: string } & Recipe) => {
    const { name, coffee, water, milk, price } = values;  //i merr secilen fush nga objekti qe te mund ti perdorim direkt
    const newRecipes = {
      ...recipes,  //i kopjon krejt existing recipes
      [name]: { coffee, water, milk, price },  //e shton new key dmth name te objekti edhe ingredients i perdor si value
    };
    setRecipes(newRecipes);
    message.success(`${name} added to the menu!`);
  };

  const resetStock = () => {
    setStock(fullStock);  //e kthen full stock prej te objekti qe kemi definu te recipes.ts
    message.success('Inventory reset to full stock.');
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <HeaderBar />
      <Content className="p-6 max-w-4xl mx-auto">
        <Typography.Title level={2} className="text-center">
          Coffee Vending Machine
        </Typography.Title>

        <CoffeeMaker
          recipes={recipes}
          selectedCoffee={selectedCoffee}
          setSelectedCoffee={setSelectedCoffee}
          makeCoffee={makeCoffee}
          stock={stock} // ← add this
        />

        {/* <InventoryDisplay stock={stock} earnings={earnings} resetStock={resetStock} /> */}

        {isBrewing && <CoffeeAnimation />}

        <InventoryDisplay 
          stock={stock} 
          resetStock={resetStock} 
          selectedCoffee={selectedCoffee} 
          recipes={recipes}
          earnings={earnings} 
        />
        {/* <CoffeeDetails selectedCoffee={selectedCoffee} recipe={recipes[selectedCoffee]} /> */}

        <RestockForm restock={restock} />

        <AddCoffeeForm addCoffee={addCoffee} selectedCoffee={selectedCoffee} recipes={recipes} />
      </Content>

      <Footer className="text-center">©2025 Coffee Machine Inc.</Footer>
    </Layout>
  );
};

export default App;