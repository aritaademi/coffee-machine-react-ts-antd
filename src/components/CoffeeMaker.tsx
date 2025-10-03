// import {Select, Button} from 'antd';

// const {Option} = Select;  //e nda Option prej Select qe te perdoret me leht

// type CoffeeMakerProps = {
//     recipes: Record<string, any>;  //objekt ku key esht coffee name, value esht any type
//     selectedCoffee: string;   //kafja by default e selektume
//     setSelectedCoffee: (val: string) => void;   //funksion qe e ben update kafen e selektume, ska argumenta, kthen void
//     makeCoffee: () => void;  
// };

// const CoffeeMaker: React.FC<CoffeeMakerProps> = ({recipes, selectedCoffee, setSelectedCoffee, makeCoffee}) => (


//     <div className='my-6 flex items-center gap-4'>
//         <Select value={selectedCoffee} onChange={setSelectedCoffee} style={{width: 200}}>
//             {Object.keys(recipes).map(name => (
//                 <Option key={name} value={name}>{name}</Option>
//             ))}
//         </Select>
//         <Button type='primary' onClick={makeCoffee}>Make Coffee</Button>
//     </div>
     

// )

// export default CoffeeMaker;

// //per shkak se te recipes.ts kafet jane si objekt dhe jo array, duhet te perdoret Object.keys
// // jo map ose foreach, sepse nuk mund te aplikojm direkt kto funksione te objektet
// //dmth Object.keys kthen array of keys prej te recipe.ts,
// // ne ket rast i merr coffee names, e ben map secilin element te <Option> me key & value

import { Select, Button } from 'antd';
import type { Ingredients, IngredientKey,  Recipes } from '../App'; // adjust path if needed

const { Option } = Select;

type CoffeeMakerProps = {
  recipes: Recipes;                   // map of coffee names to their recipes
  selectedCoffee: string;            // currently selected coffee
  setSelectedCoffee: (val: string) => void; // setter for selected coffee
  makeCoffee: () => void;            // function to trigger brewing
  stock: Ingredients;                // current ingredient stock
};

const CoffeeMaker: React.FC<CoffeeMakerProps> = ({
  recipes,
  selectedCoffee,
  setSelectedCoffee,
  makeCoffee,
  stock,
}) => {
  const recipe = recipes[selectedCoffee];

  // Check if any required ingredient is insufficient
    const isInsufficient = recipe
  ? !!Object.entries(recipe).find(([key, amount]) =>
      key !== 'price' && stock[key as IngredientKey] < (amount as number)
    )
  : true;


  console.log('Selected Coffee:', selectedCoffee);
  console.log('Recipe:', recipe);
  console.log('Stock:', stock);
  console.log('isInsufficient:', isInsufficient);

  return (
    <div className="my-6 flex items-center gap-4">
      <Select value={selectedCoffee} onChange={setSelectedCoffee} style={{ width: 200 }}>
        {Object.keys(recipes).map(name => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={makeCoffee} disabled={isInsufficient}>
        Make Coffee
      </Button>
    </div>
  );
};

export default CoffeeMaker;
